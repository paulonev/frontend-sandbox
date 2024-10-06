package org.example.receive

import kotlinx.serialization.Serializable

@Serializable
data class CurrencyTransaction(
    val portfolioId: Int,
    val type: String,
    val amount: Double,
    val currency: String,
    val date: String,
    val notes: String? = null
)
