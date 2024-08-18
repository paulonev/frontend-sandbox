package org.example.db.users

import io.ktor.http.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

object UserDao {

    fun create(): HttpStatusCode{
        return transaction {
            UserEntity.new {
                firstName = "John"
                lastName = "Doe"
                username = "johndoe"
                languageCode = "en"
                telegramId = 123456789L
                createdAt = LocalDateTime.now()
            }
            return@transaction HttpStatusCode.OK //success
        }
    }
}