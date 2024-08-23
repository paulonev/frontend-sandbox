package org.example.db.currency.transactions

import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesEntity
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class TransactionsCurrenciesEntity(id: EntityID<Int>) : IntEntity(id) {

    var portfolioCurrencies by PortfolioCurrenciesEntity referencedOn TransactionsCurrenciesTable.portfolioCurrencies
    var transactionsCurrenciesType by TransactionsCurrenciesTable.transactionsCurrenciesType
    var amount by TransactionsCurrenciesTable.amount
    var transactionDate by TransactionsCurrenciesTable.transactionDate
    var notes by TransactionsCurrenciesTable.notes

    companion object : IntEntityClass<TransactionsCurrenciesEntity>(TransactionsCurrenciesTable)
}