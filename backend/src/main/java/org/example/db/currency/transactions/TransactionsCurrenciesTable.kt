package org.example.db.currency.transactions

import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesTable
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.datetime

object TransactionsCurrenciesTable : IntIdTable("transactions_currencies") {

    val portfolioCurrencies = reference("portfolio_currencies", PortfolioCurrenciesTable, ReferenceOption.CASCADE)
    val transactionsCurrenciesType = varchar("transactions_currencies_type", 20)
    val amount = double("amount")
    val transactionDate = datetime("transaction_date")
    val notes = text("notes").nullable()
}