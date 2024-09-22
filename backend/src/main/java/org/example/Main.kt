import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.request.*
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.example.*
import org.example.calculate.PortfolioStatistics
import org.example.db.DBConnect
import org.example.db.crypto.cryptocurrencies.CryptoCurrenciesTable
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosTable
import org.example.db.crypto.transactions.TransactionsCryptosDao
import org.example.db.crypto.transactions.TransactionsCryptosTable
import org.example.db.currency.currencies.CurrenciesTable
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesTable
import org.example.db.currency.transactions.TransactionsCurrenciesTable
import org.example.db.portfolio.PortfolioDao
import org.example.db.portfolio.PortfolioTable
import org.example.db.users.UserDao
import org.example.db.users.UsersTable
import org.example.livecoinwatch.cache.CoinsListCache
import org.example.receive.PortfolioReceive
import org.example.receive.UserReceive
import org.example.respond.*
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import org.example.livecoinwatch.cache.CryptoPriceCache
import org.example.livecoinwatch.request.Coins
import org.example.receive.CryptoTransaction
import org.jetbrains.kotlin.com.google.gson.Gson
import org.jetbrains.kotlin.com.google.gson.reflect.TypeToken

object CryptoPriceCacheHolder{
    val cryptoPriceCache: CryptoPriceCache = CryptoPriceCache()
}

object CoinsListCacheHolder{
    val coinsListCache: CoinsListCache = CoinsListCache()
}

fun main(args: Array<String>){

    DBConnect.connect()

    transaction {
        SchemaUtils.createMissingTablesAndColumns(UsersTable)
        SchemaUtils.createMissingTablesAndColumns(PortfolioTable)
        SchemaUtils.createMissingTablesAndColumns(CryptoCurrenciesTable)
        SchemaUtils.createMissingTablesAndColumns(PortfolioCryptosTable)
        SchemaUtils.createMissingTablesAndColumns(TransactionsCryptosTable)
        SchemaUtils.createMissingTablesAndColumns(CurrenciesTable)
        SchemaUtils.createMissingTablesAndColumns(PortfolioCurrenciesTable)
        SchemaUtils.createMissingTablesAndColumns(TransactionsCurrenciesTable)

        exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_users_telegram_id ON users (telegram_id)")
        exec("CREATE INDEX IF NOT EXISTS idx_portfolio_cryptos_portfolio_id ON portfolio_cryptos (portfolio)")
        exec("CREATE INDEX IF NOT EXISTS idx_portfolio_currencies_portfolio_id ON portfolio_currencies (portfolio)")
    }

    embeddedServer(Netty, 4444){

        install(ContentNegotiation){
            json(Json {
                prettyPrint = true
                isLenient = true
                ignoreUnknownKeys = true
            })
        }

        install(StatusPages){
            exception<ResourceNotFoundException>{ call, cause ->
                val title = "${cause.resourceType} Not Found"
                call.respond(
                    HttpStatusCode.NotFound,
                    Gson().toJson(
                        ErrorResponse(
                            title = title,
                            status = HttpStatusCode.NotFound.value,
                            detail = cause.message ?: title,
                            instance = call.request.uri
                        )
                    )
                )
            }
            exception<Throwable> { call, cause ->
                call.respond(
                    HttpStatusCode.InternalServerError,
                    ErrorResponse(
                        title = "Internal Server Error",
                        status = HttpStatusCode.InternalServerError.value,
                        detail = cause.message ?: "Something went wrong",
                        instance = call.request.uri
                    )
                )
            }
            exception<ResourceAlreadyExistsException>{ call, cause ->
                val title = "${cause.resourceType} Already Exists"
                call.respond(
                    HttpStatusCode.Conflict,
                    Gson().toJson(
                        ErrorResponse(
                            title = title,
                            status = HttpStatusCode.Conflict.value,
                            detail = cause.message ?: title,
                            instance = call.request.uri
                        )
                    )
                )
            }
        }

        routing {
            get("") {
                call.respond("I'm alive!")
            }
            get("hello") {
                call.respond(HttpStatusCode.Accepted, "Hello Test")
            }
            get("gson"){
                val user = mapOf("name" to "John Doe", "age" to 50, "email" to "john.doe@example.com")
                call.respond(Gson().toJson(user))
            }
            post("api/users/create") {
                dbQuery {
                    val userReceive = call.receive<UserReceive>()
                    call.respond(UserDao.create(userReceive))
                }
            }
            post("api/portfolio"){
                dbQuery {
                    val portfolioReceive = call.receive<PortfolioReceive>()
                    val userId = 1
                    call.respond(PortfolioDao.create(portfolioReceive, userId))
                }
            }
            get("api/portfolio") {
                dbQuery {
                    val userId = 1
                    val mainPageRespond = MainPageRespond(Meta(0.0, GainLoss("gain", 0.0, 0.0)), ArrayList())

                    val portfolios = PortfolioDao.getAll(userId)
                    val portfolioStatisticsDataList = portfolios.map {
                        val portfolioStatistics = PortfolioStatistics(it.id.value).getPortfolioStatistics()
                        mainPageRespond.items.add(
                            Item(
                                it.id.value,
                                ItemMeta(
                                    Utils.round(2, portfolioStatistics.currentAmountWithBalance),
                                    Calculate.calculateGainLoss(portfolioStatistics.currentAmount, portfolioStatistics.purchaseAmount)
                                ),
                                it.isMain,
                                it.name,
                                listOf(it.portfolioType),
                                it.color ?: "main"
                            )
                        )
                        portfolioStatistics
                    }

                    var purchaseAmount = 0.0
                    var currentAmount = 0.0
                    var currentAmountWithBalance = 0.0

                    coroutineScope {
                        val purchaseAmountAsync = async {
                                portfolioStatisticsDataList.sumByDouble { it.purchaseAmount }
                        }
                        val currentAmountAsync = async {
                            portfolioStatisticsDataList.sumByDouble { it.currentAmount }
                        }
                        val currentAmountWithBalanceAsync = async {
                            portfolioStatisticsDataList.sumByDouble { it.currentAmountWithBalance }
                        }

                        purchaseAmount = purchaseAmountAsync.await()
                        currentAmount = currentAmountAsync.await()
                        currentAmountWithBalance = currentAmountWithBalanceAsync.await()
                    }

                    mainPageRespond.meta = Meta(
                        Utils.round(2, currentAmountWithBalance),
                        Calculate.calculateGainLoss(currentAmount, purchaseAmount)
                    )
                    call.respond(mainPageRespond)
                }
            }
            get("api/coins/list"){
                val search = call.request.queryParameters["q"]
                val limit = call.request.queryParameters["count"]?.toInt() ?: 10
                val coinsListCache = CoinsListCacheHolder.coinsListCache
                coinsListCache.updateIfNeeded()
                val results = if (search != null){
                    coinsListCache.search(search)
                } else{
                    coinsListCache.get(limit)
                }
                call.respond(results!!)
            }
            get("api/coins/single") {
                val coinsSingle = Coins().getCoinsSingle()
                call.respond(coinsSingle)
            }
            post("api/portfolio/{portfolio_id}/transactions") {
                dbQuery {
                    val portfolioId = call.parameters["portfolio_id"]?.toInt() ?: throw ResourceNotFoundException("Portfolio", "Portfolio id not found in url")
                    val cryptoTransaction = call.receive<CryptoTransaction>()
                    call.respond(TransactionsCryptosDao.create(cryptoTransaction, portfolioId))
                }
            }
            get("api/portfolio/{id}") {
                dbQuery {
                    val portfolioId = call.parameters["id"]?.toInt() ?: throw ResourceNotFoundException("Portfolio", "Portfolio id not found in url")
                    call.respond(PortfolioStatistics(portfolioId).getAllPortfolioData())
                }
            }
        }
    }.start(wait = true)
}

suspend fun <T> dbQuery(block: suspend () -> T): T {
    return newSuspendedTransaction {
        block()
    }
}

@Serializable
data class ErrorResponse(
    val title: String,
    val status: Int,
    val detail: String,
    val instance: String? = null
)