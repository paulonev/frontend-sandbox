package org.example.db.currency.transactions

import io.ktor.server.plugins.*
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesDao
import org.example.receive.CurrencyTransaction
import java.time.LocalDate

object TransactionsCurrenciesDao {

    fun create(currencyTransaction: CurrencyTransaction){
        val portfolioCurrenciesEntity = PortfolioCurrenciesDao.get(currencyTransaction.portfolioId)

        val transactionType = TransactionsCurrenciesType.valueOf(currencyTransaction.type)

        when(transactionType){
            TransactionsCurrenciesType.Replenish -> {
                portfolioCurrenciesEntity.balance += currencyTransaction.amount
            }
            TransactionsCurrenciesType.Withdraw -> {
                if (portfolioCurrenciesEntity.balance < currencyTransaction.amount){
                    val remainder = maxOf(0.0, portfolioCurrenciesEntity.balance)
                    throw BadRequestException("You can't withdraw more than $remainder")
                }
                portfolioCurrenciesEntity.balance -= currencyTransaction.amount
            }
        }

        TransactionsCurrenciesEntity.new {
            this.portfolioCurrencies = portfolioCurrenciesEntity
            this.transactionsCurrenciesType = transactionType.name
            this.amount = currencyTransaction.amount
            this.transactionDate = LocalDate.parse(currencyTransaction.date)
            this.notes = currencyTransaction.notes
        }
    }
}