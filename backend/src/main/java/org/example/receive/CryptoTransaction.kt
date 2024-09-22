package org.example.receive

import kotlinx.serialization.Serializable
import org.example.serializers.BigDecimalSerializer
import java.math.BigDecimal

@Serializable
data class CryptoTransaction(
    val coinName: String,
    val coinTicker: String,
    val type: String,
    @Serializable(with = BigDecimalSerializer::class) val pricePerUnit: BigDecimal,
    @Serializable(with = BigDecimalSerializer::class) val amount: BigDecimal,
    val date: String,
    val commission: Double,
    val notes: String? = null
)
