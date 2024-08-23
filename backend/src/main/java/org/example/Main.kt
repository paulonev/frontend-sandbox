import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json
import org.example.db.DBConnect
import org.example.db.crypto.cryptocurrencies.CryptoCurrenciesTable
import org.example.db.crypto.portfoliocryptos.PortfolioCryptosTable
import org.example.db.crypto.transactions.TransactionsCryptosTable
import org.example.db.currency.currencies.CurrenciesTable
import org.example.db.currency.portfoliocurrencies.PortfolioCurrenciesTable
import org.example.db.currency.transactions.TransactionsCurrenciesTable
import org.example.db.portfolio.PortfolioTable
import org.example.db.users.UserDao
import org.example.db.users.UsersTable
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.kotlin.com.google.gson.Gson

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
    }

    embeddedServer(Netty, 4444){

        install(ContentNegotiation){
            json(Json {
                prettyPrint = true
            })
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
                call.respond(UserDao.create())
            }
        }
    }.start(wait = true)
}