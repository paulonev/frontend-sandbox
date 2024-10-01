package org.example.db.crypto.cryptocurrencies

import org.jetbrains.exposed.dao.id.IntIdTable

object CryptoCurrenciesTable : IntIdTable("crypto_currencies") {
    val name = varchar("name", 50)
    val ticker = varchar("ticker", 10)
    val webp64 = varchar("webp64", 100)
}