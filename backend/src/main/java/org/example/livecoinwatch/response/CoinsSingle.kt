package org.example.livecoinwatch.response

import kotlinx.serialization.Serializable
import org.example.serializers.BigDecimalSerializer
import java.math.BigDecimal

@Serializable
data class CoinsSingle(
    @Serializable(with = BigDecimalSerializer::class) val rate: BigDecimal,
    val volume: Long,
    val cap: Long,
    val liquidity: Long,
    val delta: Delta
)
