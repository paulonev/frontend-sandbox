package org.example.calculate

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

class PortfolioStatistics(val portfolioId: Int) {

    suspend fun getPortfolioStatistics(): PortfolioStatisticsData = coroutineScope {
        val portfolioCryptos: List<PortfolioCryptosEntity> = PortfolioCryptosDao.getAll(portfolioId)
        val portfolioCurrencies: PortfolioCurrenciesEntity = PortfolioCurrenciesDao.get(portfolioId)
        val balance = portfolioCurrencies.balance

        val cryptoPriceCache = CryptoPriceCacheHolder.cryptoPriceCache
        val needUpdateCryptos = portfolioCryptos.filter {
            cryptoPriceCache.getWithCheck(it.cryptoCurrencies.ticker) == null
        }

        if (needUpdateCryptos.isNotEmpty()) {
            val coins = Coins().getCoinsMap(needUpdateCryptos.map { it.cryptoCurrencies.ticker })
            coins.forEach {
                cryptoPriceCache.put(it.code, CoinPricesData(it.rate, it.delta))
            }
        }

        val allTimeProfitAsync = portfolioCryptos.map {
            async {
                Calculate.calculateAllTimeProfitCoin(it)
            }
        }

        val currentAmountAsync = async {
            portfolioCryptos.sumByDouble {
                (it.amount * (cryptoPriceCache.getPrice(it.cryptoCurrencies.ticker) ?:
                throw ResourceNotFoundException("Coin", "Coin with ticker = ${it.cryptoCurrencies.ticker} not found"))).toDouble()
            }
        }

        val allTimeProfit = allTimeProfitAsync.awaitAll()
        val allCostBasis = allTimeProfit.sumByDouble {
            it.second
        }

        val allProfit = allTimeProfit.sumByDouble {
            it.first
        }

        val currentAmount = currentAmountAsync.await()

        return@coroutineScope PortfolioStatisticsData(
            currentAmount + balance,
            allCostBasis,
            allProfit,
            Utils.round(2, allProfit / allCostBasis * 100))
    }

    suspend fun getAllPortfolioData() = coroutineScope {
        val portfolio = PortfolioDao.get(portfolioId)
        val portfolioCryptos: List<PortfolioCryptosEntity> = PortfolioCryptosDao.getAll(portfolioId)
        val portfolioCurrencies: PortfolioCurrenciesEntity = PortfolioCurrenciesDao.get(portfolioId)

        val cryptoPriceCache = CryptoPriceCacheHolder.cryptoPriceCache

        val needUpdateCryptos = portfolioCryptos.filter {
            cryptoPriceCache.getWithCheck(it.cryptoCurrencies.ticker) == null
        }

        if (needUpdateCryptos.isNotEmpty()){
            val coins = Coins().getCoinsMap(needUpdateCryptos.map { it.cryptoCurrencies.ticker })
            coins.forEach {
                cryptoPriceCache.put(it.code, CoinPricesData(it.rate, it.delta))
            }
        }

        val priceResults = portfolioCryptos.map { crypto ->
            AllCoinInfo(
                crypto, cryptoPriceCache.getWithCheck(crypto.cryptoCurrencies.ticker) ?: throw ResourceNotFoundException("Coin", "Coin with ticker = ${crypto.cryptoCurrencies.ticker} not found"),
                crypto.cryptoCurrencies.webp64
            )
        }

        val balance = Balance(
            portfolioCurrencies.currencies.name,
            Utils.round(2, portfolioCurrencies.balance)
        )

        if (priceResults.isEmpty()){
            return@coroutineScope PortfolioRespond.empty(portfolioId, portfolio.name, balance)
        }

        val currentAmountAsync = async {
            priceResults.sumByDouble {
                (it.cryptosEntity.amount * it.coinPricesData.rate).toDouble()
            }
        }

        val allTimeProfitAsync = priceResults.map {
            async {
                Calculate.calculateAllTimeProfitCoin(it.cryptosEntity)
            }
        }

        val currentAmount = currentAmountAsync.await()

        val gainLossDayAsync = async {
            val startDaySum = priceResults.sumByDouble {
                (it.cryptosEntity.amount * it.coinPricesData.rate).toDouble() / it.coinPricesData.delta.day
            }
            Calculate.calculateGainLoss(currentAmount, startDaySum)
        }

        val gainLossAllTimeAsync = async {
            val allTimeProfit = allTimeProfitAsync.awaitAll()
            Calculate.getGainLoss(allTimeProfit.sumByDouble { it.first },
                allTimeProfit.sumByDouble { it.second })
        }

        val assetsAsync = async {
            createAssets(priceResults)
        }

        return@coroutineScope PortfolioRespond(
            portfolioId,
            portfolio.name,
            Utils.round(2, currentAmount + balance.volume),
            gainLossDayAsync.await(),
            gainLossAllTimeAsync.await(),
            balance,
            assetsAsync.await()
        )
    }

    private fun createAssets(priceResults: List<AllCoinInfo>): Assets {
        val assets = priceResults.map {
            Asset(
                it.cryptosEntity.id.value,
                it.cryptosEntity.cryptoCurrencies.name,
                it.webp64,
                Calculate.calculateGainLoss(
                    (it.cryptosEntity.amount * it.coinPricesData.rate).toDouble(),
                    (it.cryptosEntity.amount * it.cryptosEntity.averagePrice).toDouble()
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

    data class PortfolioStatisticsData(
        val overallVolume: Double,
        val allCostBasis: Double,
        val profitUSD: Double,
        val profitPercent: Double
    )

    data class AllCoinInfo(
        val cryptosEntity: PortfolioCryptosEntity,
        val coinPricesData: CoinPricesData,
        val webp64: String
    )
}