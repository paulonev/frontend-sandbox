package org.example.db.crypto.transactions

import CoinsListCacheHolder
import org.example.db.crypto.cryptocurrencies.CryptoCurrenciesDao
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosDao
import org.example.db.portfolio.PortfolioDao
import org.example.receive.CryptoTransaction
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.and
import java.time.LocalDate

object TransactionsCryptosDao {

    suspend fun create(cryptoTransaction: CryptoTransaction){
        CoinsListCacheHolder.coinsListCache.updateIfNeeded()
        val cryptoCurrenciesEntity = CryptoCurrenciesDao.get(cryptoTransaction.coinTicker)
            ?: CryptoCurrenciesDao.create(
                cryptoTransaction.coinName,
                cryptoTransaction.coinTicker,
                CoinsListCacheHolder.coinsListCache.getWebp64(cryptoTransaction.coinTicker))
        val portfolioCryptosEntity = PortfolioCryptosDao.get(cryptoTransaction.portfolioId, cryptoCurrenciesEntity.id.value)
            ?: PortfolioCryptosDao.create(PortfolioDao.get(cryptoTransaction.portfolioId), cryptoCurrenciesEntity)

        PortfolioCryptosDao.update(
            portfolioCryptosEntity, cryptoTransaction.amount,
            cryptoTransaction.pricePerUnit, cryptoTransaction.commission, TransactionsCryptosType.valueOf(cryptoTransaction.type))

        TransactionsCryptosEntity.new {
            this.portfolioCryptos = portfolioCryptosEntity
            this.transactionCryptosType = cryptoTransaction.type
            this.amount = cryptoTransaction.amount.stripTrailingZeros()
            this.pricePerUnit = cryptoTransaction.pricePerUnit.stripTrailingZeros()
            this.transactionDate = LocalDate.parse(cryptoTransaction.date)
            this.notes = cryptoTransaction.notes
            this.commission = cryptoTransaction.commission
        }
    }

    fun getTransactions(portfolioCryptosId: Int, transactionsCryptosType: TransactionsCryptosType, sortOrder: SortOrder): List<TransactionsCryptosEntity> {
        return TransactionsCryptosEntity.find { (TransactionsCryptosTable.portfolioCryptos eq portfolioCryptosId) and
                (TransactionsCryptosTable.transactionCryptosType eq transactionsCryptosType.name)}
            .orderBy(TransactionsCryptosTable.transactionDate to sortOrder).toList()
    }
}