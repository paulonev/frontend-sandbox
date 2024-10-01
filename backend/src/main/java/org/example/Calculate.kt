package org.example

import org.example.respond.GainLoss

object Calculate {

    fun calculateGainLoss(currentAmount: Double, purchaseAmount: Double): GainLoss {
        val profitUSD = currentAmount - purchaseAmount
        val profitPercent = if (purchaseAmount != 0.0) (profitUSD / purchaseAmount) * 100 else 0.0
        return GainLoss(Utils.round(2, profitUSD), Utils.round(2, profitPercent))
    }
}