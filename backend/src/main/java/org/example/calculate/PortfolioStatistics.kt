package org.example.calculate

import CoinsListCacheHolder
import CryptoPriceCacheHolder
import kotlinx.coroutines.*
import org.example.Calculate
import org.example.ResourceNotFoundException
import org.example.Utils
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosDao
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosEntity
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesDao
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesEntity
import org.example.db.portfolio.PortfolioDao
import org.example.livecoinwatch.cache.CoinPricesData
import org.example.livecoinwatch.request.Coins
import org.example.respond.*
import java.math.BigDecimal

class PortfolioStatistics(val portfolioId: Int) {

    suspend fun getPortfolioStatistics(): PortfolioStatisticsData = coroutineScope {
        val portfolioCryptos: List<PortfolioCryptosEntity> = PortfolioCryptosDao.getAll(portfolioId)
        val portfolioCurrencies: PortfolioCurrenciesEntity = PortfolioCurrenciesDao.get(portfolioId)
        val balance = portfolioCurrencies.balance

        val cryptoPriceCache = CryptoPriceCacheHolder.cryptoPriceCache
        val (needUpdateCryptos, cryptosFromCache) = portfolioCryptos.partition {
            cryptoPriceCache.getWithCheck(it.cryptoCurrencies.ticker) == null
        }
        val priceResults = mutableListOf<Data>()

        if (needUpdateCryptos.isNotEmpty()){
            val priceResultApi = async {
                val coins = Coins().getCoinsMap(needUpdateCryptos.map { it.cryptoCurrencies.ticker })
                coins.forEach {
                    cryptoPriceCache.put(it.code, CoinPricesData(it.rate, it.delta))
                }
                needUpdateCryptos.map { crypto ->
                    val currentPrice = coins.find { it.code == crypto.cryptoCurrencies.ticker }?.rate
                        ?: throw ResourceNotFoundException("Coin", "Coin with ticker = ${crypto.cryptoCurrencies.ticker} not found")
                    Data(crypto.amount, currentPrice,
                        crypto.averagePrice, crypto.commission ?: 0.0)
                }
            }
            priceResults.addAll(priceResultApi.await())
        }

        val priceResultCache = cryptosFromCache.map { crypto ->
            Data(crypto.amount, cryptoPriceCache.getPrice(crypto.cryptoCurrencies.ticker)!!,
                crypto.averagePrice, crypto.commission ?: 0.0)
        }

        priceResults.addAll(priceResultCache)

        val purchaseAmountAsync = async {
            priceResults.sumByDouble { (amount, _, averagePrice, commission) ->
                (amount * averagePrice).toDouble() + commission
            }
        }
        val currentAmountAsync = async {
            priceResults.sumByDouble { (amount, currentPrice, _, _) ->
                (amount * currentPrice).toDouble()
            }
        }

        val purchaseAmount = purchaseAmountAsync.await()
        val currentAmount = currentAmountAsync.await()

        return@coroutineScope PortfolioStatisticsData(currentAmount + balance,
            purchaseAmount + balance,
            currentAmount - purchaseAmount,
            (currentAmount - purchaseAmount) / purchaseAmount * 100)
    }

    suspend fun getAllPortfolioData() = coroutineScope {
        val portfolio = PortfolioDao.get(portfolioId)
        val portfolioCryptos: List<PortfolioCryptosEntity> = PortfolioCryptosDao.getAll(portfolioId)
        val portfolioCurrencies: PortfolioCurrenciesEntity = PortfolioCurrenciesDao.get(portfolioId)

        val cryptoPriceCache = CryptoPriceCacheHolder.cryptoPriceCache
        val coinsListCache = CoinsListCacheHolder.coinsListCache

        val (needUpdateCryptos, cryptosFromCache) = portfolioCryptos.partition {
            cryptoPriceCache.getWithCheck(it.cryptoCurrencies.ticker) == null
        }
        val priceResults = mutableListOf<AllCoinInfo>()

        if (needUpdateCryptos.isNotEmpty()){
            val priceResultApi = async {
                val coins = Coins().getCoinsMap(needUpdateCryptos.map { it.cryptoCurrencies.ticker })
                coins.forEach {
                    cryptoPriceCache.put(it.code, CoinPricesData(it.rate, it.delta))
                }
                needUpdateCryptos.map { crypto ->
                    val currentCoin = coins.find { it.code == crypto.cryptoCurrencies.ticker }
                        ?: throw ResourceNotFoundException("Coin", "Coin with ticker = ${crypto.cryptoCurrencies.ticker} not found")
                    AllCoinInfo(crypto, CoinPricesData(currentCoin.rate, currentCoin.delta), currentCoin.webp64)
                }
            }
            priceResults.addAll(priceResultApi.await())
        }

        coinsListCache.updateIfNeeded()

        val priceResultCache = cryptosFromCache.map { crypto ->
            AllCoinInfo(
                crypto, cryptoPriceCache.getWithCheck(crypto.cryptoCurrencies.ticker)!!,
                coinsListCache.getWebp64(crypto.cryptoCurrencies.ticker)
            )
        }

        priceResults.addAll(priceResultCache)

        val balanceAsync = async {
            Balance(
                portfolioCurrencies.currencies.name,
                Utils.round(2, portfolioCurrencies.balance)
            )
        }

        if (priceResults.isEmpty()){
            return@coroutineScope PortfolioRespond.empty(portfolioId, portfolio.name, balanceAsync.await())
        }

        val purchaseAmountAsync = async {
            priceResults.sumByDouble {
                ((it.cryptosEntity.amount * it.cryptosEntity.averagePrice).toDouble()) + (it.cryptosEntity.commission ?: 0.0)
            }
        }
        val currentAmountAsync = async {
            priceResults.sumByDouble {
                (it.cryptosEntity.amount * it.coinPricesData.rate).toDouble()
            }
        }

        val purchaseAmount = purchaseAmountAsync.await()
        val currentAmount = currentAmountAsync.await()

        val gainLossDayAsync = async {
            val startDaySum = priceResults.sumByDouble {
                (it.cryptosEntity.amount * it.coinPricesData.rate).toDouble() / it.coinPricesData.delta.day
            }
            Calculate.calculateGainLoss(currentAmount, startDaySum)
        }

        val gainLossAllTimeAsync = async {
            Calculate.calculateGainLoss(currentAmount, purchaseAmount)
        }

        val assetsAsync = async {
            createAssets(priceResults)
        }

        return@coroutineScope PortfolioRespond(
            portfolioId,
            portfolio.name,
            Utils.round(2, currentAmount),
            gainLossDayAsync.await(),
            gainLossAllTimeAsync.await(),
            balanceAsync.await(),
            assetsAsync.await()
        )
    }

    private fun createAssets(priceResults: MutableList<AllCoinInfo>): Assets {
        val assets = priceResults.map {
            Asset(
                it.cryptosEntity.id.value,
                it.cryptosEntity.cryptoCurrencies.name,
                it.webp64,
                Calculate.calculateGainLoss(
                    (it.cryptosEntity.amount * it.coinPricesData.rate).toDouble(),
                    (it.cryptosEntity.amount * it.cryptosEntity.averagePrice).toDouble() + (it.cryptosEntity.commission ?: 0.0)
                ),
                it.cryptosEntity.cryptoCurrencies.ticker,
                Volume(
                    it.cryptosEntity.amount.stripTrailingZeros(),
                    Utils.round(2, (it.cryptosEntity.amount * it.coinPricesData.rate).toDouble())
                )
            )
        }
        return Assets(
            assets.maxBy {
                it.gainLoss.inPercentage
            },
            assets.minBy {
                it.gainLoss.inPercentage
            },
            assets
        )
    }

    data class Data(
        val amount: BigDecimal,
        val currentPrice: BigDecimal,
        val averagePrice: BigDecimal,
        val commission: Double
    )

    data class PortfolioStatisticsData(
        val currentAmount: Double,
        val purchaseAmount: Double,
        val profitUSD: Double,
        val profitPercent: Double
    )

    data class AllCoinInfo(
        val cryptosEntity: PortfolioCryptosEntity,
        val coinPricesData: CoinPricesData,
        val webp64: String
    )
}