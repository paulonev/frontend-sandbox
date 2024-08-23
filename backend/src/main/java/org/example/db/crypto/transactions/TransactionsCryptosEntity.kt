package org.example.db.crypto.transactions

import org.example.db.crypto.portfoliocryptos.PortfolioCryptosEntity
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class TransactionsCryptosEntity(id: EntityID<Int>) : IntEntity(id) {

    var portfolioCryptos by PortfolioCryptosEntity referencedOn TransactionsCryptosTable.portfolioCryptos
    var transactionCryptosType by TransactionsCryptosTable.transactionCryptosType
    var amount by TransactionsCryptosTable.amount
    var pricePerUnit = TransactionsCryptosTable.pricePerUnit
    var transactionDate = TransactionsCryptosTable.transactionDate
    var notes = TransactionsCryptosTable.notes
    var commission = TransactionsCryptosTable.commission

    companion object : IntEntityClass<TransactionsCryptosEntity>(TransactionsCryptosTable)
}