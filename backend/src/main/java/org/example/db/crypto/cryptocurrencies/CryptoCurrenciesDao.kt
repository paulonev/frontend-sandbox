package org.example.db.crypto.cryptocurrencies

object CryptoCurrenciesDao {

    fun create(name: String, ticker: String, webp64: String) = CryptoCurrenciesEntity.new {
        this.name = name
        this.ticker = ticker
        this.webp64 = webp64
    }

    fun get(ticker: String) = CryptoCurrenciesEntity.find { CryptoCurrenciesTable.ticker eq ticker }.singleOrNull()
}