package org.example.db.crypto.portfoliocryptos

import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import org.example.db.crypto.cryptocurrencies.CryptoCurrenciesEntity
import org.example.db.crypto.transactions.TransactionsCryptosDao
import org.example.db.crypto.transactions.TransactionsCryptosType
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesDao
import org.example.db.portfolio.PortfolioEntity
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.and
import java.math.BigDecimal

object PortfolioCryptosDao {

    fun create(portfolioEntity: PortfolioEntity, cryptoCurrenciesEntity: CryptoCurrenciesEntity): PortfolioCryptosEntity {
        return PortfolioCryptosEntity.new {
            this.cryptoCurrencies = cryptoCurrenciesEntity
            this.portfolio = portfolioEntity
            this.amount = BigDecimal(0.0)
            this.averagePrice = BigDecimal(0.0)
        }
    }

    fun getAll(portfolioId: Int): List<PortfolioCryptosEntity> {
        return PortfolioCryptosEntity.find { PortfolioCryptosTable.portfolio eq portfolioId }.toList()
    }

    fun get(portfolioId: Int, cryptoCurrenciesId: Int) =
        PortfolioCryptosEntity.find{(PortfolioCryptosTable.portfolio eq portfolioId) and
                (PortfolioCryptosTable.cryptoCurrencies eq cryptoCurrenciesId)}.singleOrNull()

    suspend fun update(portfolioCryptosEntity: PortfolioCryptosEntity, amount: BigDecimal,
                       pricePerUnit: BigDecimal, commission: Double,
                       transactionsCryptosType: TransactionsCryptosType) = coroutineScope{
        val newCommission = (portfolioCryptosEntity.commission ?: 0.0) + commission
        val portfolioCurrenciesEntity = PortfolioCurrenciesDao.get(portfolioCryptosEntity.portfolio.id.value)
        val newData =  when(transactionsCryptosType){
            TransactionsCryptosType.Buy -> {
                val newAmount = portfolioCryptosEntity.amount + amount
                val newAveragePriceAsync = async {
                    (portfolioCryptosEntity.amount * portfolioCryptosEntity.averagePrice + amount * pricePerUnit) / newAmount
                }
                portfolioCurrenciesEntity.apply {
                    this.balance = this.balance - (amount * pricePerUnit).toDouble() - commission
                }
                NewData(newAmount, newAveragePriceAsync.await(), newCommission)
            }
            TransactionsCryptosType.Sell -> {
                val newAmount = portfolioCryptosEntity.amount - amount
                if (newAmount < BigDecimal.ZERO) throw IllegalArgumentException("You are trying to sell more than you have in your portfolio")
                val newAveragePriceAsync = async {
                    if (newAmount.stripTrailingZeros() != BigDecimal(0)) {
                        calculatingAveragePriceAfterSelling(portfolioCryptosEntity, newAmount)
                    } else BigDecimal.ZERO
                }
                portfolioCurrenciesEntity.apply {
                    this.balance = this.balance + (amount * pricePerUnit).toDouble() - commission
                }
                NewData(newAmount, newAveragePriceAsync.await(), newCommission)
            }
            else -> {NewData(portfolioCryptosEntity.amount, portfolioCryptosEntity.averagePrice, portfolioCryptosEntity.commission ?: 0.0)}
        }
        portfolioCryptosEntity.apply {
            this.amount = newData.amount.stripTrailingZeros()
            this.averagePrice = newData.averagePrice.stripTrailingZeros()
            this.commission = newData.commission
        }
    }

    private fun calculatingAveragePriceAfterSelling(portfolioCryptosEntity: PortfolioCryptosEntity, newAmount: BigDecimal): BigDecimal {
        val allBuyTransactions = TransactionsCryptosDao.getTransactions(portfolioCryptosEntity.id.value, TransactionsCryptosType.Buy, SortOrder.DESC)
        var remainingAmount = newAmount
        var totalBuySum = BigDecimal.ZERO
        allBuyTransactions.forEach { transaction ->
            if (remainingAmount > BigDecimal.ZERO){
                val amount = if (remainingAmount >= transaction.amount) transaction.amount else remainingAmount
                totalBuySum += amount * transaction.pricePerUnit
            } else return@forEach
            remainingAmount -= transaction.amount
        }
        return totalBuySum / newAmount
    }

    data class NewData(
        val amount: BigDecimal,
        val averagePrice: BigDecimal,
        val commission: Double
    )
}