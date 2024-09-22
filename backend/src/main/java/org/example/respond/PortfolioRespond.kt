package org.example.respond

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.example.serializers.BigDecimalSerializer
import java.math.BigDecimal

@Serializable
data class PortfolioRespond(
    @SerialName("id") val id: Int,
    @SerialName("name") val name: String,
    @SerialName("overallVolume") val overallVolume: Double,
    @SerialName("gainLossDay") val gainLossDay: GainLoss?,
    @SerialName("gainLossAllTime") val gainLossAllTime: GainLoss?,
    @SerialName("balance") val balance: Balance,
    @SerialName("assets") val assets: Assets
) {
    companion object {
        fun empty(portfolioId: Int, name: String, balance: Balance): PortfolioRespond {
            return PortfolioRespond(
                portfolioId,
                name,
                0.0,
                GainLoss("gain", 0.0, 0.0),
                GainLoss("gain", 0.0, 0.0),
                balance,
                Assets(null, null, listOf())
            )
        }
    }
}

@Serializable
data class Balance(
    @SerialName("currencyCode") val currencyCode: String? = "USD",
    @SerialName("volume") val volume: Double
)

@Serializable
data class Assets(
    @SerialName("best") val best: Asset?,
    @SerialName("worst") val worst: Asset?,
    @SerialName("items") val items: List<Asset>
)

@Serializable
data class Asset(
    @SerialName("id") val id: Int,
    @SerialName("fullName") val fullName: String,
    @SerialName("logoUrl") val logoUrl: String? = null,
    @SerialName("gainLoss") val gainLoss: GainLoss,
    @SerialName("shortName") val shortName: String? = null,
    @SerialName("volume") val volume: Volume? = null
)

@Serializable
data class Volume(
    @Serializable(with = BigDecimalSerializer::class) val inAmount: BigDecimal,
    @SerialName("inFiat") val inFiat: Double
)
