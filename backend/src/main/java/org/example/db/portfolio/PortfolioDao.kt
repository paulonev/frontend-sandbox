package org.example.db.portfolio

import io.ktor.http.*
import org.example.ResourceAlreadyExistsException
import org.example.db.users.UserDao
import org.example.db.users.UserEntity
import org.example.receive.PortfolioReceive
import org.jetbrains.exposed.sql.and
import java.time.LocalDateTime

object PortfolioDao {

    fun create(portfolioReceive: PortfolioReceive, userId: Int): HttpStatusCode {
        val userEntity = UserDao.get(userId)
        if (isExist(portfolioReceive.name, userEntity)) throw ResourceAlreadyExistsException("Portfolio", "Portfolio with name ${portfolioReceive.name} already exists")
        PortfolioEntity.new {
            name = portfolioReceive.name
            portfolioType = PortfolioType.valueOf(portfolioReceive.portfolioType).name
            color = portfolioReceive.portfolioColor
            user = userEntity
            createdAt = LocalDateTime.now()
            isMain = true
        }
        return HttpStatusCode.Created
    }

    fun getAll(userId: Int): List<PortfolioEntity> {
        val userEntity = UserDao.get(userId)

        return PortfolioEntity.find { PortfolioTable.user eq userEntity.id }.toList()
    }

    private fun isExist(name: String, userEntity: UserEntity): Boolean {
        return PortfolioEntity.find { (PortfolioTable.user eq userEntity.id.value) and (PortfolioTable.name eq name) }.singleOrNull() != null
    }
}