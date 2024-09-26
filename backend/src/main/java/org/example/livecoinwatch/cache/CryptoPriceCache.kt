package org.example.livecoinwatch.cache

import kotlinx.serialization.Contextual
import org.example.livecoinwatch.response.Delta
import java.math.BigDecimal
import java.time.Duration
import java.util.concurrent.ConcurrentHashMap

class CryptoPriceCache(private val expirationDuration: Duration = Duration.ofSeconds(60)) {

    private val cache = ConcurrentHashMap<String, CachedValue<CoinPricesData>>()

    fun getWithCheck(key: String): CoinPricesData? {
        val cachedValue = cache[key]
        return if (cachedValue != null && (System.currentTimeMillis() - cachedValue.timestamp) < expirationDuration.toMillis()) {
            cachedValue.value
        } else {
            null
        }
    }

    fun getPrice(key: String): BigDecimal? {
        return cache[key]?.value?.rate
    }

    fun put(key: String, value: CoinPricesData) {
        cache[key] = CachedValue(value, System.currentTimeMillis())
    }
}

data class CachedValue<T>(val value: T, val timestamp: Long)

data class CoinPricesData(
    @Contextual val rate: BigDecimal,
    val delta: Delta
)
