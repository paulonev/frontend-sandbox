package org.example.respond

import kotlinx.serialization.Serializable

data class MainPageRespond(
    var meta: Meta,
    val items: ArrayList<Item>
)

data class Meta(
    var overallVolume: Double,
    var gainLoss: GainLoss
)

@Serializable
data class GainLoss(
    var type: String,
    var inVolume: Double,
    var inPercentage: Double
)

data class Item(
    val id: Int,
    val meta: ItemMeta,
    val isMain: Boolean,
    val name: String,
    val tags: List<String>?,
    val colorScheme: String
)

data class ItemMeta(
    val volume: Double,
    val gainLoss: GainLoss
)
