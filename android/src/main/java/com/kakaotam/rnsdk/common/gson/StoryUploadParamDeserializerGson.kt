package com.kakaotam.rnsdk.common.gson

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.kakaotam.rnsdk.story.model.StoryUploadParam
import java.lang.reflect.Type

class StoryUploadParamDeserializerGson : JsonDeserializer<StoryUploadParam> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): StoryUploadParam {
        val jsonObject = json!!.asJsonObject
        val param = StoryUploadParam()
        param.images = jsonObject.getAsJsonArray("images").map(GsonUtils::asFile)
        return param
    }
}
