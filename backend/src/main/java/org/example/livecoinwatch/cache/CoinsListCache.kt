package org.example.livecoinwatch.cache

import org.example.respond.CoinsListRespond
import java.time.Duration
import java.util.concurrent.ConcurrentHashMap
import java.util.stream.Collectors

class CoinsListCache(private val expirationDuration: Duration = Duration.ofDays(1)) {

    private val key = "coins"
    private val cache = ConcurrentHashMap<String, CachedValue<List<CoinsListRespond>>>()

    fun put(value: List<CoinsListRespond>) {
        cache[key] = CachedValue(value, System.currentTimeMillis())
    }

    fun isCurrentData(): Boolean{
        val cachedValue = cache[key]
        return cachedValue != null && (System.currentTimeMillis() - cachedValue.timestamp) < expirationDuration.toMillis()
    }

    fun get(limit: Int): MutableList<CoinsListRespond>? {
        val cachedValue = cache[key]
        return cachedValue?.value?.stream()?.limit(limit.toLong())?.collect(Collectors.toList())
    }

    fun search(searchText: String): MutableList<CoinsListRespond>? {
        return cache[key]?.value?.parallelStream()?.filter {
            it.coinName.toLowerCase().startsWith(searchText.toLowerCase()) || it.coinTicker.toLowerCase().startsWith(searchText.toLowerCase())
        }?.collect(Collectors.toList())
    }
}