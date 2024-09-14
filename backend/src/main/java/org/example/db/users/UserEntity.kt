package org.example.db.users

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class UserEntity(id: EntityID<Int>) : IntEntity(id) {

    var firstName by UsersTable.firstName
    var lastName by UsersTable.lastName
    var username by UsersTable.username
    var languageCode by UsersTable.languageCode
    var telegramId by UsersTable.telegramId
    var createdAt by UsersTable.createdAt

    companion object : IntEntityClass<UserEntity>(UsersTable)
}