package org.example.db.crypto.portfoliocryptos

import org.example.db.crypto.cryptocurrencies.CryptoCurrenciesEntity
import org.example.db.portfolio.PortfolioEntity
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class PortfolioCryptosEntity(id: EntityID<Int>) : IntEntity(id) {

    var cryptoCurrencies by CryptoCurrenciesEntity referencedOn PortfolioCryptosTable.cryptoCurrencies
    var amount by PortfolioCryptosTable.amount
    var averagePrice by PortfolioCryptosTable.averagePrice
    var commission by PortfolioCryptosTable.commission
    var portfolio by PortfolioEntity referencedOn PortfolioCryptosTable.portfolio

    companion object : IntEntityClass<PortfolioCryptosEntity>(PortfolioCryptosTable)
}