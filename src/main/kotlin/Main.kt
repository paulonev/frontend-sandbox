import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

fun main(args: Array<String>){
//    println("Hello World!")
//
//    // Try adding program arguments via Run/Debug configuration.
//    // Learn more about running applications: https://www.jetbrains.com/help/idea/running-applications.html.
//    println("Program arguments: ${args.joinToString()}")

    embeddedServer(Netty, 23567){

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
//            val user = mapOf("name" to "John Doe", "age" to 30, "email" to "john.doe@example.com")
            mapOf("1" to "2")
            val test = arrayOf("1", "2", "3")
            call.respond(test)
        }
    }
    }.start(wait = true)
}

//fun Application.module(){
//    println("Hello World!")
//
//    // Try adding program arguments via Run/Debug configuration.
//    // Learn more about running applications: https://www.jetbrains.com/help/idea/running-applications.html.
//    println("Program arguments: ${args.joinToString()}")
//
////    embeddedServer(Netty, 23567){
//
//    install(ContentNegotiation){
//        json(Json {
//            prettyPrint = true
//        })
//    }
//        routing {
//            get("") {
//                call.respond("I'm alive!")
//            }
//            get("hello") {
//                call.respond(HttpStatusCode.Accepted, "Hello Test")
//            }
//        }
////    }.start(wait = true)
//}