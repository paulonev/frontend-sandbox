package org.example.livecoinwatch.cache

import org.example.Utils
import org.example.livecoinwatch.request.Coins
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

    fun get(limit: Long): MutableList<CoinsListRespond>? {
        val cachedValue = cache[key]
        return cachedValue?.value?.stream()?.limit(limit)?.collect(Collectors.toList())
    }

    fun search(searchText: String, limit: Long?): MutableList<CoinsListRespond>? {
        return cache[key]?.value?.parallelStream()?.filter {
            it.coinName.toLowerCase().contains(searchText.toLowerCase()) || it.coinTicker.toLowerCase().contains(searchText.toLowerCase())
        }?.let { stream ->
            if (limit != null){
                stream.limit(limit)
            } else{
                stream
            }
        }?.collect(Collectors.toList())
    }

    fun getWebp64(ticker: String): String {
        return cache[key]?.value?.find {
            it.coinTicker == ticker
        }?.webp64 ?: ""
    }

    fun updateIfNeeded(){
        if (!isCurrentData()) {
            val coinsListRespond = Coins().getCoinsList().map {
                CoinsListRespond(
                    it.name,
                    it.code,
                    Utils.round(it.rate, 2),
                    it.webp64
                )
            }
            put(coinsListRespond)
        }
    }
}