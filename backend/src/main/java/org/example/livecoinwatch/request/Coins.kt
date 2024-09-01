package org.example.livecoinwatch.request

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
                     limit: Int = 50,
                     meta: Boolean = true): ArrayList<CoinsList>? {
        val response = api.getCoins(CoinsListRequest(currency, sort, order, offset, limit, meta)).execute().body()
        return response
    }

    fun getCoinsSingle(
        currency: String = "USD",
        code: String = "BTC",
        meta: Boolean = false
    ): CoinsSingle? {
        return api.getCoinsSingle(CoinsSingleRequest(currency, code, meta)).execute().body()
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
}