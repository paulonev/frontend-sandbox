package org.example.respond

import java.math.BigDecimal

data class CoinsListRespond(
    val coinName: String,
    val coinTicker: String,
    val pricePerUnit: BigDecimal,
    val webp64: String
)
