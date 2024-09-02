package org.example.livecoinwatch.response

import com.google.gson.annotations.SerializedName
import kotlinx.serialization.Serializable

@Serializable
data class CoinsList(
    @SerializedName("code") val code: String,
    @SerializedName("rate") val rate: Double,
    @SerializedName("volume") val volume: Long,
    @SerializedName("cap") val cap: Long,
    @SerializedName("delta") val delta: Delta
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
