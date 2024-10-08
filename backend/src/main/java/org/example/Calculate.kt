package org.example

import CryptoPriceCacheHolder
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosEntity
import org.example.db.crypto.transactions.TransactionsCryptosDao
import org.example.db.crypto.transactions.TransactionsCryptosType
import org.example.respond.GainLoss
import org.jetbrains.exposed.sql.SortOrder
import java.math.BigDecimal

object Calculate {

    fun calculateGainLoss(currentAmount: Double, purchaseAmount: Double): GainLoss {
        val profitUSD = currentAmount - purchaseAmount
        val profitPercent = if (purchaseAmount != 0.0) (profitUSD / purchaseAmount) * 100 else 0.0
        return GainLoss(Utils.round(2, profitUSD), Utils.round(2, profitPercent))
    }

    fun getGainLoss(profit: Double, costBasis: Double): GainLoss {
        val profitPercent = if (costBasis != 0.0) (profit / costBasis) * 100 else 0.0
        return GainLoss(Utils.round(2, profit), Utils.round(2, profitPercent))
    }

    fun calculateAllTimeProfitCoin(portfolioCryptosEntity: PortfolioCryptosEntity): Pair<Double, Double> {
        val allBuyTransactions = TransactionsCryptosDao.getTransactions(portfolioCryptosEntity.id.value, TransactionsCryptosType.Buy, SortOrder.DESC)
        val allSellTransactions = TransactionsCryptosDao.getTransactions(portfolioCryptosEntity.id.value, TransactionsCryptosType.Sell, SortOrder.DESC)

        var allBuyAmount = BigDecimal(0)
        var allSellAmount = BigDecimal(0)

        val costBasis = allBuyTransactions.sumByDouble {
            allBuyAmount += it.amount
            (it.amount * it.pricePerUnit).toDouble() + (it.commission ?: 0.0)
        }
        val avgBuyPrice = costBasis.toBigDecimal() / allBuyAmount
        val realizedProfit = allSellTransactions.sumByDouble {
            allSellAmount += it.amount
            (it.amount * (it.pricePerUnit - avgBuyPrice)).toDouble() - (it.commission ?: 0.0)
        }
        val unRealizedProfit = ((allBuyAmount - allSellAmount) *
                (CryptoPriceCacheHolder.cryptoPriceCache.getPrice(portfolioCryptosEntity.cryptoCurrencies.ticker)!! - avgBuyPrice)).toDouble()
        val allTimeProfit = realizedProfit + unRealizedProfit
        return Utils.round(2, allTimeProfit) to Utils.round(2, costBasis)
    }
}