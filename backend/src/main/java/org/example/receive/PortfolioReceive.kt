
package org.example.receive

import kotlinx.serialization.Serializable
import org.jetbrains.kotlin.com.google.gson.annotations.SerializedName


@Suppress("PLUGIN_IS_NOT_ENABLED")
@Serializable
data class PortfolioReceive(
    @SerializedName("name") val name: String,
    @SerializedName("portfolioType") val portfolioType: String,
    @SerializedName("isMainPortfolio") val isMainPortfolio: Boolean,
    @SerializedName("portfolioColor") val portfolioColor: String
)
