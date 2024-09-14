package org.example.db.crypto.cryptocurrencies

object CryptoCurrenciesDao {

    fun create(name: String, ticker: String) = CryptoCurrenciesEntity.new {
        this.name = name
        this.ticker = ticker
    }

    fun get(ticker: String) = CryptoCurrenciesEntity.find { CryptoCurrenciesTable.ticker eq ticker }.singleOrNull()
}