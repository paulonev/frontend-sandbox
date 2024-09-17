package org.example.calculate

import CryptoPriceCacheHolder
import kotlinx.coroutines.*
import org.example.ResourceNotFoundException
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosDao
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosEntity
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesDao
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesEntity
import org.example.livecoinwatch.request.Coins
import java.math.BigDecimal

class PortfolioStatistics {

    suspend fun getPortfolioStatistics(portfolioId: Int): PortfolioStatisticsData = coroutineScope {
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
                    cryptoPriceCache.put(it.code, it.rate)
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
            Data(crypto.amount, cryptoPriceCache.get(crypto.cryptoCurrencies.ticker)!!,
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
}