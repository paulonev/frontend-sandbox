package org.example.db.currency.portfoliocurrencies

import org.example.db.currency.currencies.CurrenciesTable
import org.example.db.portfolio.PortfolioTable
import org.jetbrains.exposed.dao.id.IntIdTable

object PortfolioCurrenciesTable : IntIdTable("portfolio_currencies") {

    val currencies = reference("currencies", CurrenciesTable)
    val balance = double("balance")
    val portfolio = reference("portfolio", PortfolioTable)
}