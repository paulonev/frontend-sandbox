package org.example.livecoinwatch.request

import org.example.ResourceNotFoundException
import org.example.livecoinwatch.Api
import org.example.livecoinwatch.RetrofitClient
import org.example.livecoinwatch.response.CoinsList
import org.example.livecoinwatch.response.CoinsSingle

class Coins {

    private val api = RetrofitClient.retrofitInstance.create(Api::class.java)

    fun getCoinsList(currency: String = "USD",
                     sort: String = "rank",
                     order: String = "ascending",
                     offset: Int = 0,
                     limit: Int = 500,
                     meta: Boolean = true): ArrayList<CoinsList> {
        return api.getCoins(CoinsListRequest(currency, sort, order, offset, limit, meta)).execute().body()
            ?: throw ResourceNotFoundException("Coins", "Coins not found")
    }

    fun getCoinsSingle(
        code: String = "BTC",
        currency: String = "USD",
        meta: Boolean = false
    ): CoinsSingle {
        return api.getCoinsSingle(CoinsSingleRequest(currency, code, meta)).execute().body()
            ?: throw ResourceNotFoundException("Coin", "Coin with ticker = $code not found")
    }

    fun getCoinsMap(codes: ArrayList<String>,
                    currency: String = "USD",
                     sort: String = "rank",
                     order: String = "ascending",
                     offset: Int = 0,
                     limit: Int = 0,
                     meta: Boolean = true): ArrayList<CoinsList> {
        return api.getCoinsMap(CoinsMapRequest(currency, codes, sort, order, offset, limit, meta)).execute().body()
            ?: throw ResourceNotFoundException("Coins", "Coins $codes not found")
    }

    data class CoinsListRequest(
        val currency: String,
        val sort: String,
        val order: String,
        val offset: Int,
        val limit: Int,
        val meta: Boolean
    )

    data class CoinsSingleRequest(
        val currency: String,
        val code: String,
        val meta: Boolean
    )

    data class CoinsMapRequest(
        val currency: String,
        val codes: ArrayList<String>,
        val sort: String,
        val order: String,
        val offset: Int,
        val limit: Int,
        val meta: Boolean
    )
}