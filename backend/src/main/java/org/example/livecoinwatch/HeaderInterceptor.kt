package org.example.livecoinwatch

import okhttp3.Interceptor
import okhttp3.Response

class HeaderInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val original = chain.request()
        val requestBuilder = original.newBuilder()
            .header("x-api-key", "0c334b13-479c-4a88-ba1d-f2bc2a4a0415")
            .header("Content-Type", "application/json")
            .method(original.method(), original.body())

        val request = requestBuilder.build()
        return chain.proceed(request)
    }
}