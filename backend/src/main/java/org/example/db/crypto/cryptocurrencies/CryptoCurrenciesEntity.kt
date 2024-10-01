package org.example.db.crypto.cryptocurrencies

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class CryptoCurrenciesEntity(id: EntityID<Int>) : IntEntity(id) {

    var name by CryptoCurrenciesTable.name
    var ticker by CryptoCurrenciesTable.ticker
    var webp64 by CryptoCurrenciesTable.webp64

    companion object : IntEntityClass<CryptoCurrenciesEntity>(CryptoCurrenciesTable)
}