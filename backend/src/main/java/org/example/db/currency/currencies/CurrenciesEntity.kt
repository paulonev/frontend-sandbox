package org.example.db.currency.currencies

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class CurrenciesEntity(id: EntityID<Int>) : IntEntity(id) {

    var name by CurrenciesTable.name

    companion object : IntEntityClass<CurrenciesEntity>(CurrenciesTable)
}