package org.example.livecoinwatch.response

data class CoinsSingle(
val rate: Double,
val volume: Long,
val cap: Long,
val liquidity: Long,
val delta: Delta
)
