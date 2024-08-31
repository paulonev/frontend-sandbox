package org.example.db.users

import org.example.ResourceAlreadyExistsException
import org.example.ResourceNotFoundException
import org.example.receive.UserReceive
import java.time.LocalDateTime

object UserDao {

    fun create(userReceive: UserReceive){
        if (isExists(userReceive.telegramId)) throw ResourceAlreadyExistsException("User", "User with telegramId = ${userReceive.telegramId} is already exists")
        UserEntity.new {
            firstName = userReceive.firstName
            lastName = userReceive.lastName
            username = userReceive.username
            languageCode = userReceive.languageCode
            telegramId = userReceive.telegramId
            createdAt = LocalDateTime.now()
        }
    }

    fun get(telegramId: Long) = UserEntity.find { UsersTable.telegramId eq telegramId }.singleOrNull() ?: throw ResourceNotFoundException("User", "User with telegramId = $telegramId not found")

    fun get(userId: Int) = UserEntity.find { UsersTable.id eq userId }.singleOrNull() ?: throw ResourceNotFoundException("User", "User with userId = $userId not found")

    fun isExists(telegramId: Long) = UserEntity.find { UsersTable.telegramId eq telegramId }.singleOrNull() != null
}