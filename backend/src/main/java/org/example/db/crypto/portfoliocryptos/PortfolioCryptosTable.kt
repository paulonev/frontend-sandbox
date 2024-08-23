package org.example.db.crypto.portfoliocryptos

import org.example.db.crypto.cryptocurrencies.CryptoCurrenciesTable
import org.example.db.portfolio.PortfolioTable
import org.jetbrains.exposed.dao.id.IntIdTable

object PortfolioCryptosTable : IntIdTable("portfolio_cryptos") {

    val cryptoCurrencies = reference("crypto_currencies", CryptoCurrenciesTable)
    val amount = double("amount")
    val averagePrice = double("average_price")
    val commission = double("commission").nullable()
    val portfolio = reference("portfolio", PortfolioTable)
}