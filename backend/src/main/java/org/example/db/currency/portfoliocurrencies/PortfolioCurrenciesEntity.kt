package org.example.db.currency.portfoliocurrencies

import org.example.db.currency.currencies.CurrenciesEntity
import org.example.db.portfolio.PortfolioEntity
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class PortfolioCurrenciesEntity(id: EntityID<Int>) : IntEntity(id) {

    var currencies by CurrenciesEntity referencedOn PortfolioCurrenciesTable.currencies
    var balance by PortfolioCurrenciesTable.balance
    var portfolio by PortfolioEntity referencedOn PortfolioCurrenciesTable.portfolio

    companion object : IntEntityClass<PortfolioCurrenciesEntity>(PortfolioCurrenciesTable)
}