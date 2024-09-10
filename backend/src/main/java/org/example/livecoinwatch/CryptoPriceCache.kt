package org.example.livecoinwatch

import java.math.BigDecimal
import java.time.Duration
import java.util.concurrent.ConcurrentHashMap

class CryptoPriceCache(private val expirationDuration: Duration = Duration.ofSeconds(60)) {

    private val cache = ConcurrentHashMap<String, CachedValue<BigDecimal>>()

    fun get(key: String): BigDecimal? {
        val cachedValue = cache[key]
        return if (cachedValue != null && (System.currentTimeMillis() - cachedValue.timestamp) < expirationDuration.toMillis()) {
            cachedValue.value
        } else {
            null
        }
    }

    fun put(key: String, value: BigDecimal) {
        cache[key] = CachedValue(value, System.currentTimeMillis())
    }
}

data class CachedValue<T>(val value: T, val timestamp: Long)
