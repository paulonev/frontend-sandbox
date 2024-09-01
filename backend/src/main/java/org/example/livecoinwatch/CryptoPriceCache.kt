package org.example.livecoinwatch

import java.time.Duration
import java.util.concurrent.ConcurrentHashMap

class CryptoPriceCache(private val expirationDuration: Duration = Duration.ofSeconds(50)) {

    private val cache = ConcurrentHashMap<String, CachedValue<Double>>()

    fun get(key: String): Double? {
        val cachedValue = cache[key]
        return if (cachedValue != null && (System.currentTimeMillis() - cachedValue.timestamp) < expirationDuration.toMillis()) {
            cachedValue.value
        } else {
            null
        }
    }

    fun put(key: String, value: Double) {
        cache[key] = CachedValue(value, System.currentTimeMillis())
    }
}

data class CachedValue<T>(val value: T, val timestamp: Long)
