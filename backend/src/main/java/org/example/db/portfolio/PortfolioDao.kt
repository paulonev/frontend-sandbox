package org.example.db.portfolio

import io.ktor.http.*
import org.example.db.users.UserEntity
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

object PortfolioDao {

    fun create() {
//        return transaction {
//            PortfolioEntity.new {
//                name = "John"
//                portfolioType = PortfolioType.Crypto.name
//                color = "johndoe"
//                user = Use
//                createdAt = LocalDateTime.now()
//                isMain = true
//            }
//            return@transaction HttpStatusCode.OK //success
//        }
    }
}