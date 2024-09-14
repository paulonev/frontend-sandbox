package org.example.db.crypto.transactions

import org.example.db.crypto.portfoliocryptos.PortfolioCryptosTable
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.date

object TransactionsCryptosTable : IntIdTable("transactions_cryptos") {

    val portfolioCryptos = reference("portfolio_cryptos", PortfolioCryptosTable, ReferenceOption.CASCADE)
    val transactionCryptosType = varchar("transactions_crypto_type", 10)
    val amount = decimal("amount", 30, 15)
    val pricePerUnit = decimal("price_per_unit", 25, 15)
    val transactionDate = date("transaction_date")
    val notes = text("notes").nullable()
    val commission = double("commission").nullable()
}