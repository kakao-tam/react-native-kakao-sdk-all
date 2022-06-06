package com.kakaotam.rnsdk.common.gson

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.kakaotam.rnsdk.link.model.UploadImageParam
import java.lang.reflect.Type

class UploadImageParamDeserializerGson : JsonDeserializer<UploadImageParam> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): UploadImageParam {
        val jsonObject = json!!.asJsonObject
        val param = UploadImageParam()
        param.image = GsonUtils.asFile(jsonObject, "image")
        if (jsonObject.has("secureResource")) {
            param.secureResource = jsonObject.get("secureResource").asBoolean
        }
        return param
    }
}
