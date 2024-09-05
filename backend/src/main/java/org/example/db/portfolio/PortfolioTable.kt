package org.example.db.portfolio

import org.example.db.users.UsersTable
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.datetime

object PortfolioTable : IntIdTable("portfolios") {
    val name = varchar("name", 100)
    val portfolioType = varchar("portfolio_type", 50)
    val color = varchar("color", 20).nullable()
    val user = reference("user", UsersTable, ReferenceOption.CASCADE)
    val createdAt = datetime("created_at")
    val isMain = bool("is_main")
}