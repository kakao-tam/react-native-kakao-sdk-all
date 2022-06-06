package com.kakaotam.rnsdk.common.gson

import android.content.Intent
import com.google.gson.*
import com.kakao.sdk.link.model.LinkResult
import java.lang.reflect.Type

class LinkResultSerializerGson : JsonSerializer<LinkResult?> {
    override fun serialize(src: LinkResult?, typeOfSrc: Type?, context: JsonSerializationContext?): JsonElement {
        src?.let {
            val jsonObject = JsonObject()
            jsonObject.add("argumentMsg", GsonUtils.gson.toJsonTree(it.argumentMsg))
            jsonObject.add("warningMsg", GsonUtils.gson.toJsonTree(it.warningMsg))
            jsonObject.addProperty("url", it.intent.toUri(Intent.URI_INTENT_SCHEME).toString())
            return jsonObject
        }
        return JsonNull.INSTANCE
    }

}
