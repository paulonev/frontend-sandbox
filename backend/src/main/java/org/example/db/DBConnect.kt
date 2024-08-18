package org.example.db

import org.jetbrains.exposed.sql.Database

object DBConnect {

    fun connect(){
        Database.connect(
            "jdbc:postgresql://capitalview-db:5432/capitalview",
            driver = "org.postgresql.Driver",
            user = "capitalview",
            password = "capitalview"
        )
    }
}