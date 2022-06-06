package com.kakaotam.rnsdk.common.gson

import com.google.gson.*
import java.lang.reflect.Type
import java.util.*

class DateSerializerGson : JsonSerializer<Date?> {
    override fun serialize(src: Date?, typeOfSrc: Type?, context: JsonSerializationContext?): JsonElement {
        src?.let {
            return JsonPrimitive(it.time + TimeZone.getDefault().rawOffset.toLong())
        }
        return JsonNull.INSTANCE
    }
}
