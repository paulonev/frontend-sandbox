package org.example.db.users

import io.ktor.http.*
import org.example.ResourceNotFoundException
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

    fun get(telegramId: Long) = UserEntity.find { UsersTable.telegramId eq telegramId }.singleOrNull()

    fun get(userId: Int) = UserEntity.find { UsersTable.id eq userId }.singleOrNull() ?: throw ResourceNotFoundException("User", "User with userId = $userId not found")
}