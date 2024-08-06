import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val kotlinVersion = "1.8.0"
val ktorVersion = "2.3.12"

plugins {
    kotlin("jvm") version "2.0.0"
//    kotlin("plugin.serialization") version "2.0.0"
//    id("io.ktor.plugin") version "2.3.12"
    application
    java
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    testImplementation(kotlin("test"))

    implementation("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlinVersion")
    implementation("io.ktor:ktor-server-netty:$ktorVersion")
//    implementation("io.ktor:ktor-jackson:$ktorVersion")
    implementation("io.ktor:ktor-server-content-negotiation:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktorVersion")
    testImplementation("junit:junit:4.13.2")
//    implementation("io.ktor:ktor-gson:$ktorVersion")
}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

//kotlin {
//    jvmToolchain(11)
//}

application {
    mainClass.set("MainKt")
}