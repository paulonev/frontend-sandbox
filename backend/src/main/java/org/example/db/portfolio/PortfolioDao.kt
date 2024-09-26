package org.example.db.portfolio

import io.ktor.http.*
import org.example.ResourceAlreadyExistsException
import org.example.ResourceNotFoundException
import org.example.db.currency.currencies.CurrencyDao
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesDao
import org.example.db.users.UserDao
import org.example.db.users.UserEntity
import org.example.receive.PortfolioReceive
import org.jetbrains.exposed.sql.and
import java.time.LocalDate

object PortfolioDao {

    fun create(portfolioReceive: PortfolioReceive, userId: Int): Int {
        val userEntity = UserDao.get(userId)
        if (isExist(portfolioReceive.name, userEntity)) throw ResourceAlreadyExistsException("Portfolio", "Portfolio with name ${portfolioReceive.name} already exists")
        if (portfolioReceive.isMainPortfolio) {
            getMainPortfolio(userEntity.id.value)?.apply {
                this.isMain = false
            }
        }
        val portfolioEntity = PortfolioEntity.new {
            name = portfolioReceive.name
            portfolioType = PortfolioType.valueOf(portfolioReceive.portfolioType).name
            color = portfolioReceive.portfolioColor
            user = userEntity
            createdAt = LocalDate.now()
            isMain = portfolioReceive.isMainPortfolio
        }
        PortfolioCurrenciesDao.create(CurrencyDao.get() ?: CurrencyDao.create(), 0.0, portfolioEntity)
        return portfolioEntity.id.value
    }

    fun getAll(userId: Int): List<PortfolioEntity> {
        val userEntity = UserDao.get(userId)

        return PortfolioEntity.find { PortfolioTable.user eq userEntity.id }.toList()
    }

    private fun isExist(name: String, userEntity: UserEntity): Boolean {
        return PortfolioEntity.find { (PortfolioTable.user eq userEntity.id.value) and (PortfolioTable.name eq name) }.singleOrNull() != null
    }

    private fun getMainPortfolio(userId: Int): PortfolioEntity? {
        return PortfolioEntity.find { (PortfolioTable.user eq userId) and (PortfolioTable.isMain eq true) }.singleOrNull()
    }

    fun get(id: Int) = PortfolioEntity.find{PortfolioTable.id eq id}.singleOrNull()
        ?: throw ResourceNotFoundException("Portfolio", "Portfolio with id = $id not found")
}