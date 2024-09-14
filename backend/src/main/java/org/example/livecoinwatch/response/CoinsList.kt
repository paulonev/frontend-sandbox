package org.example.livecoinwatch.response

import com.google.gson.annotations.SerializedName
import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class CoinsList(
    @SerializedName("name") val name: String,
    @SerializedName("code") val code: String,
    @Contextual val rate: BigDecimal,
    @SerializedName("volume") val volume: Long,
    @SerializedName("cap") val cap: Long,
    @SerializedName("delta") val delta: Delta,
    @SerializedName("webp64") val webp64: String
)

@Serializable
data class Delta(
    @SerializedName("hour") val hour: Double,
    @SerializedName("day") val day: Double,
    @SerializedName("week") val week: Double,
    @SerializedName("month") val month: Double,
    @SerializedName("quarter") val quarter: Double,
    @SerializedName("year") val year: Double
)
