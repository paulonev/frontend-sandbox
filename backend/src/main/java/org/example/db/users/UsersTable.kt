package org.example.db.users

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.javatime.datetime

object UsersTable : IntIdTable() {
    val firstName = varchar("first_name", 50).nullable()
    val lastName = varchar("last_name", 50).nullable()
    val username = varchar("username", 50).nullable()
    val languageCode = varchar("language_code", 10).nullable()
    val telegramId = long("telegram_id")
    val createdAt = datetime("created_at")
}