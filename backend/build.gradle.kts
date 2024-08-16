import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val kotlinVersion = "1.8.0"
val ktorVersion = "2.3.12"

plugins {
    kotlin("jvm") version "2.0.0"
//    kotlin("plugin.serialization") version "2.0.0"
    id("io.ktor.plugin") version "2.3.12"
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
    kotlinOptions.jvmTarget = "19"
}

//kotlin {
//    jvmToolchain(11)
//}

application {
    mainClass.set("MainKt")
}

ktor {
//    docker{
//        jreVersion.set(JavaVersion.VERSION_19)
//
//        localImageName.set("capitalview-backend")
//        imageTag.set("capitalview-backend-0.0.1")
//
//        portMappings.set(listOf(
//            io.ktor.plugin.features.DockerPortMapping(
//                4444,
//                4444,
//                io.ktor.plugin.features.DockerPortMappingProtocol.TCP
//            )
//        ))
//
//        externalRegistry.set(
//            io.ktor.plugin.features.DockerImageRegistry.dockerHub(
//                appName = provider { "capitalview_backend" },
//                username = providers.environmentVariable("DOCKER_HUB_USERNAME"),
//                password = providers.environmentVariable("DOCKER_HUB_PASSWORD")
//            )
//        )
//    }
    fatJar {
        archiveFileName.set("fat.jar")
    }
}