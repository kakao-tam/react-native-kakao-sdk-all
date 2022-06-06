package com.kakaotam.rnsdk.common.gson

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.kakaotam.rnsdk.user.model.ShippingAddressesParam
import java.lang.reflect.Type
import java.util.*

class ShippingAddressesParamDeserializerGson : JsonDeserializer<ShippingAddressesParam> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): ShippingAddressesParam {
        val jsonObject = json!!.asJsonObject
        val param = ShippingAddressesParam()
        if (jsonObject.has("addressId")) {
            param.addressId = jsonObject.get("addressId").asLong
        }
        if (jsonObject.has("pageSize")) {
            param.pageSize = jsonObject.get("pageSize").asInt
        }
        if (jsonObject.has("fromUpdateAt")) {
            param.fromUpdateAt = Date(jsonObject.get("fromUpdateAt").asLong)
        }
        return param
    }
}
