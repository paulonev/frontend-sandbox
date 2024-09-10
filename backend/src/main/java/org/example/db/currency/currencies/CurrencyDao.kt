package org.example.db.currency.currencies

object CurrencyDao {

    fun create(name: String = "USD"): CurrenciesEntity {
        return CurrenciesEntity.new {
            this.name = name
        }
    }

    fun get(name: String = "USD"): CurrenciesEntity? {
        return CurrenciesEntity.find { CurrenciesTable.name eq name }.singleOrNull()
    }
}