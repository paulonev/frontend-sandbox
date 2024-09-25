package org.example

import io.github.smiley4.ktorswaggerui.dsl.routes.OpenApiRoute
import io.ktor.http.*
import org.example.receive.CryptoTransaction
import org.example.receive.PortfolioReceive
import org.example.receive.UserReceive
import org.example.respond.CoinsListRespond
import org.example.respond.MainPageRespond
import org.example.respond.PortfolioRespond

class Swagger(val openApiRoute: OpenApiRoute) {

    private fun OpenApiRoute.successResponse(description: String = ""){
        response {
            HttpStatusCode.OK to {
                this.description = description
            }
        }
    }

    private fun OpenApiRoute.conflictResponse(description: String) {
        response {
            HttpStatusCode.Conflict to {
                this.description = description
            }
        }
    }

    private fun OpenApiRoute.notFound(description: String) {
        response {
            HttpStatusCode.NotFound to {
                this.description = description
            }
        }
    }

    private fun OpenApiRoute.throwable(description: String) {
        response {
            HttpStatusCode.InternalServerError to {
                this.description = description
            }
        }
    }

    fun usersCreate(){
        with(openApiRoute){
            description = "Create user"
            request {
                body<UserReceive>()
            }
            successResponse()
            conflictResponse("User is already exists")
        }
    }

    fun portfolioPost(){
        with(openApiRoute){
            description = "Create portfolio"
            request {
                body<PortfolioReceive>()
            }
            response {
                HttpStatusCode.OK to {
                    body<Int>{
                        description = "portfolio id"
                    }
                }
            }
            conflictResponse("Portfolio with name {name} already exists")
        }
    }

    fun allPortfoliosGet(){
        with(openApiRoute){
            description = "Get statistics from all portfolios"
            request {
            }
            response {
                HttpStatusCode.OK to {
                    body<MainPageRespond>{
                        description = "all statistics"
                    }
                }
            }
            notFound("Coins {codes} not found")
            notFound("Coin with ticker = {ticker} not found")
        }
    }

    fun coinsList(){
        with(openApiRoute){
            description = "Get coins list"
            request {
                queryParameter<String>("q") {
                    required = false
                    description = "Coin name or ticker you need to find"
                }
                queryParameter<Int>("count") {
                    required = false
                    description = "The number of items you want to return (By default equals 10)"
                }
            }
            notFound("Coins not found")
            response {
                HttpStatusCode.OK to {
                    body<MutableList<CoinsListRespond>>{
                        description = "coins"
                    }
                }
            }
        }
    }

    fun cryptoTransactionPost(){
        with(openApiRoute){
            description = "Create crypto transaction"
            request {
                pathParameter<String>("portfolio_id") {
                    description = "ID of the portfolio in which the transaction is added"
                }
                body<CryptoTransaction>()
            }
            notFound("Portfolio id not found in url")
            throwable("You are trying to sell more than you have in your portfolio")
            successResponse()
        }
    }

    fun allPortfolioDataGet(){
        with(openApiRoute){
            description = "Get all portfolio data"
            request {
                pathParameter<Int>("id") {
                    description = "ID of the portfolio"
                }
            }
            notFound("Coins {codes} not found")
            notFound("Coin with ticker = {ticker} not found")
            response {
                HttpStatusCode.OK to {
                    body<PortfolioRespond>{
                        description = "all portfolio data"
                    }
                }
            }
        }
    }
}