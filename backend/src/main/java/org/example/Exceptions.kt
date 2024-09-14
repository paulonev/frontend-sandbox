package org.example

class ResourceNotFoundException(val resourceType: String,
                                override val message: String?) : RuntimeException(message)

class ResourceAlreadyExistsException(
    val resourceType: String,
    override val message: String?
) : RuntimeException(message)