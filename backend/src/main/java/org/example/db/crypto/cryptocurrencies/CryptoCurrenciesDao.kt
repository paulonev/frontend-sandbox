package org.example.db.crypto.cryptocurrencies

import io.ktor.http.*
import org.jetbrains.exposed.sql.transactions.transaction

object CryptoCurrenciesDao {

    fun create(): HttpStatusCode{
        return transaction {
            CryptoCurrenciesEntity.new {
                name = "Bitcoin"
                ticker = "BTC"
            }
            return@transaction HttpStatusCode.OK //success
        }
    }
}