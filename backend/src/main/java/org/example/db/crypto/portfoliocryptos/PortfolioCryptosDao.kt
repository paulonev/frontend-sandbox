package org.example.db.crypto.portfoliocryptos

import io.ktor.http.*
import org.jetbrains.exposed.sql.transactions.transaction

object PortfolioCryptosDao {

    fun create(): HttpStatusCode{
        return transaction{
            PortfolioCryptosEntity.new {

            }
            return@transaction HttpStatusCode.OK
        }
    }

    fun getAll(portfolioId: Int): List<PortfolioCryptosEntity> {
        return PortfolioCryptosEntity.find { PortfolioCryptosTable.portfolio eq portfolioId }.toList()
    }
}