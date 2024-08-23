package org.example.db.portfolio

import org.example.db.users.UserEntity
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class PortfolioEntity(id: EntityID<Int>) : IntEntity(id) {

    var name by PortfolioTable.name
    var portfolioType by PortfolioTable.portfolioType
    var color by PortfolioTable.color
    var user by UserEntity referencedOn PortfolioTable.user
    var createdAt by PortfolioTable.createdAt
    var isMain by PortfolioTable.isMain

    companion object : IntEntityClass<PortfolioEntity>(PortfolioTable)
}