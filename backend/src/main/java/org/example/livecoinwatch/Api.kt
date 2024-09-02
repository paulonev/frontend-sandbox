package org.example.livecoinwatch

import org.example.livecoinwatch.request.Coins
import org.example.livecoinwatch.response.CoinsList
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface Api {
    @POST("coins/list")
    fun getCoins(
        @Body coinsRequest: Coins.CoinsRequest
    ) : Call<ArrayList<CoinsList>>
}