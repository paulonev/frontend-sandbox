package org.example

import java.math.BigDecimal
import java.math.RoundingMode

object Utils {

    fun round(number: Int, expr: Double) = BigDecimal(expr).setScale(number, RoundingMode.HALF_EVEN).toDouble()

    fun round(expr: BigDecimal, number: Int) = expr.setScale(number, RoundingMode.HALF_EVEN)

    fun roundPricePerCoin(expr: BigDecimal): BigDecimal {
        val string = expr.toString()
        if (!string.contains(".")) return expr

        var count = if(string.split(".")[0] == "0"){
            4
        } else {
            return round(expr, 2)
        }
        for (char in string.split(".")[1]){
            if(char == '0'){
                count++
            } else break
        }
        return round(expr, count).stripTrailingZeros()
    }
}