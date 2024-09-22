package org.example.receive

import kotlinx.serialization.Serializable

@Serializable
data class UserReceive(
    val firstName: String,
    val lastName: String,
    val username: String,
    val languageCode: String,
    val telegramId: Long
)
