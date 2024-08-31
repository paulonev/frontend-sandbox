package org.example.db.currency.portfoliocurrencies

object PortfolioCurrenciesDao {

    fun get(portfolioId: Int): PortfolioCurrenciesEntity? {
        return PortfolioCurrenciesEntity.find { PortfolioCurrenciesTable.portfolio eq portfolioId }.singleOrNull()
    }
}