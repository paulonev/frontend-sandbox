package org.example.calculate

import CryptoPriceCacheHolder
import kotlinx.coroutines.*
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

        val priceRequest = portfolioCryptos.map { crypto ->
            async {
                val currentPrice = getCurrentCoinPrice(crypto.cryptoCurrencies.ticker)
                Data(crypto.amount, currentPrice, crypto.averagePrice, crypto.commission ?: 0.0)
            }
        }

        val priceResults = priceRequest.awaitAll()

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

    private suspend fun getCurrentCoinPrice(ticker: String): BigDecimal = withContext(Dispatchers.IO) {
        val cache = CryptoPriceCacheHolder.cryptoPriceCache.get(ticker)
        return@withContext if (cache == null){
            val currentPrice = Coins().getCoinsSingle(ticker).rate
            CryptoPriceCacheHolder.cryptoPriceCache.put(ticker, currentPrice)
            currentPrice
        } else{
            cache
        }
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