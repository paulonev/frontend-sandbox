package org.example

import java.math.BigDecimal
import java.math.RoundingMode

object Utils {

    fun round(number: Int, expr: Double) = BigDecimal(expr).setScale(number, RoundingMode.HALF_EVEN).toDouble()
}