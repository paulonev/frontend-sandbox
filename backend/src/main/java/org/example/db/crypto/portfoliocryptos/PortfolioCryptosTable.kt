package org.example.db.crypto.portfoliocryptos

import org.example.db.crypto.cryptocurrencies.CryptoCurrenciesTable
import org.example.db.portfolio.PortfolioTable
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption

object PortfolioCryptosTable : IntIdTable("portfolio_cryptos") {

    val cryptoCurrencies = reference("crypto_currencies", CryptoCurrenciesTable)
    val amount = decimal("amount", 30, 15)
    val averagePrice = decimal("average_price", 25, 15)
    val commission = double("commission").nullable()
    val portfolio = reference("portfolio", PortfolioTable, ReferenceOption.CASCADE)
}