package org.example.db

import org.jetbrains.exposed.sql.Database

object DBConnect {

    fun connect(){
        Database.connect(
            "jdbc:postgresql://localhost:5432/capitalview", //capitalview-db для докера и localhost для дебага
            driver = "org.postgresql.Driver",
            user = "capitalview",
            password = "capitalview"
        )
    }
}