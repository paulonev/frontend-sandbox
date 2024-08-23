package org.example.db.crypto.transactions

import org.example.db.crypto.portfoliocryptos.PortfolioCryptosTable
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

object TransactionsCryptosTable : IntIdTable("transactions_cryptos") {

    val portfolioCryptos = reference("portfolio_cryptos", PortfolioCryptosTable)
    val transactionCryptosType = varchar("transactions_crypto_type", 10)
    val amount = decimal("amount", 25, 10)
    val pricePerUnit = decimal("price_per_unit", 17, 10)
    val transactionDate = datetime("transaction_date")
    val notes = text("notes").nullable()
    val commission = double("commission").nullable()
}