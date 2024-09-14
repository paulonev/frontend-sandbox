package org.example.db.currency.currencies

import org.jetbrains.exposed.dao.id.IntIdTable

object CurrenciesTable : IntIdTable("currencies") {

    val name = varchar("name", 20)
}