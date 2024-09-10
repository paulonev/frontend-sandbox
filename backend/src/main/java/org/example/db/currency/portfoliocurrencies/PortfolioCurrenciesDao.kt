package org.example.db.currency.portfoliocurrencies

import org.example.db.currency.currencies.CurrenciesEntity
import org.example.db.portfolio.PortfolioEntity

object PortfolioCurrenciesDao {

    fun create(currenciesEntity: CurrenciesEntity, balance: Double, portfolioEntity: PortfolioEntity){
        PortfolioCurrenciesEntity.new {
            this.currencies = currenciesEntity
            this.balance = balance
            this.portfolio = portfolioEntity
        }
    }

    fun get(portfolioId: Int): PortfolioCurrenciesEntity {
        return PortfolioCurrenciesEntity.find { PortfolioCurrenciesTable.portfolio eq portfolioId }.single()
    }
}