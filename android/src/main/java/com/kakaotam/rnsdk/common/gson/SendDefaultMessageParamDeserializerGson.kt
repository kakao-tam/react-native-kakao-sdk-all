package com.kakaotam.rnsdk.common.gson

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.kakaotam.rnsdk.talk.model.SendDefaultMessageParam
import java.lang.reflect.Type

class SendDefaultMessageParamDeserializerGson : JsonDeserializer<SendDefaultMessageParam> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): SendDefaultMessageParam {
        val jsonObject = json!!.asJsonObject
        val param = SendDefaultMessageParam()
        GsonUtils.asStringList(jsonObject, "receiverUuids")?.let {
            param.receiverUuids = it
        } ?: run {
            param.receiverUuids = listOf()
        }
        param.templatable = GsonUtils.asTemplate(jsonObject, "templatable")
        return param
    }
}
