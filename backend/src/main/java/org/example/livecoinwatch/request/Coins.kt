package org.example.livecoinwatch.request

import org.example.livecoinwatch.Api
import org.example.livecoinwatch.RetrofitClient
import org.example.livecoinwatch.response.CoinsList

class Coins {

    private val api = RetrofitClient.retrofitInstance.create(Api::class.java)

    fun getCoinsList(currency: String = "USD",
                     sort: String = "rank",
                     order: String = "ascending",
                     offset: Int = 0,
                     limit: Int = 50,
                     meta: Boolean = true): ArrayList<CoinsList>? {
        val response = api.getCoins(CoinsRequest(currency, sort, order, offset, limit, meta)).execute().body()
        return response
    }

    data class CoinsRequest(
        val currency: String,
        val sort: String,
        val order: String,
        val offset: Int,
        val limit: Int,
        val meta: Boolean
    )
}