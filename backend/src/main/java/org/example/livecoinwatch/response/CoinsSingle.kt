package org.example.livecoinwatch.response

import java.math.BigDecimal

data class CoinsSingle(
val rate: BigDecimal,
val volume: Long,
val cap: Long,
val liquidity: Long,
val delta: Delta
)
