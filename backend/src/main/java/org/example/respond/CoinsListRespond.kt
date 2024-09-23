package org.example.respond

import kotlinx.serialization.Serializable
import org.example.serializers.BigDecimalSerializer
import java.math.BigDecimal

@Serializable
data class CoinsListRespond(
    val coinName: String,
    val coinTicker: String,
    @Serializable(with = BigDecimalSerializer::class) val pricePerUnit: BigDecimal,
    val webp64: String
)
