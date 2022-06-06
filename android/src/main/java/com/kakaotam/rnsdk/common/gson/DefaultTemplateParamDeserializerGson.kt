package com.kakaotam.rnsdk.common.gson

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.kakaotam.rnsdk.link.model.DefaultTemplateParam
import java.lang.reflect.Type

class DefaultTemplateParamDeserializerGson : JsonDeserializer<DefaultTemplateParam> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): DefaultTemplateParam {
        val jsonObject = json!!.asJsonObject

        val param = DefaultTemplateParam()
        param.templateObject = GsonUtils.asTemplate(jsonObject, "templateObject")
        param.serverCallbackArgs = GsonUtils.asMap(jsonObject, "serverCallbackArgs")
        return param
    }
}
