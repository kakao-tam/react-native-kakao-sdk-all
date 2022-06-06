package com.kakaotam.rnsdk.common.gson

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.kakaotam.rnsdk.talk.model.SendDefaultMemoParam
import java.lang.reflect.Type

class SendDefaultMemoParamDeserializerGson : JsonDeserializer<SendDefaultMemoParam> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): SendDefaultMemoParam {
        val jsonObject = json!!.asJsonObject
        val param = SendDefaultMemoParam()
        param.templatable = GsonUtils.asTemplate(jsonObject, "templatable")
        return param
    }
}
