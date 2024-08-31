package org.example.calculate

import org.example.db.crypto.portfoliocryptos.PortfolioCryptosDao
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosEntity
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesDao
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesEntity

class PortfolioStatistics {

    fun getPortfolioStatistics(portfolioId: Int): PortfolioStatisticsData {
        val portfolioCryptos: List<PortfolioCryptosEntity> = PortfolioCryptosDao.getAll(portfolioId)
        val portfolioCurrencies: PortfolioCurrenciesEntity? = PortfolioCurrenciesDao.get(portfolioId)
        val balance = portfolioCurrencies?.balance ?: 0.0
        var purchaseAmount = 0.0
        var currentAmount = 0.0

        portfolioCryptos.forEach { crypto ->
            purchaseAmount += crypto.amount * crypto.averagePrice + (crypto.commission ?: 0.0)
            currentAmount += crypto.amount * 62989.35 // потом здесь будет получение данных из апишки
        }

        return PortfolioStatisticsData(currentAmount + balance,
            purchaseAmount + balance,
            currentAmount - purchaseAmount,
            (currentAmount - purchaseAmount) / purchaseAmount * 100)
    }

    data class PortfolioStatisticsData(
        val currentAmount: Double,
        val purchaseAmount: Double,
        val profitUSD: Double,
        val profitPercent: Double
    )
}