package org.example.receive

import java.math.BigDecimal

data class CryptoTransaction(
    val coinName: String,
    val coinTicker: String,
    val type: String,
    val pricePerUnit: BigDecimal,
    val amount: BigDecimal,
    val date: String,
    val commission: Double,
    val notes: String? = null
)
