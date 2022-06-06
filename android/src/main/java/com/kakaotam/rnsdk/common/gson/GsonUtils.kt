package com.kakaotam.rnsdk.common.gson

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.reflect.TypeToken
import com.kakao.sdk.link.model.LinkResult
import com.kakao.sdk.template.model.*
import com.kakaotam.rnsdk.link.model.DefaultTemplateParam
import com.kakaotam.rnsdk.link.model.UploadImageParam
import com.kakaotam.rnsdk.story.model.StoryUploadParam
import com.kakaotam.rnsdk.talk.model.SendDefaultMemoParam
import com.kakaotam.rnsdk.talk.model.SendDefaultMessageParam
import com.kakaotam.rnsdk.user.model.ShippingAddressesParam
import java.io.File
import java.lang.reflect.Type
import java.util.*

class GsonUtils {
    companion object {
        private val mapType: Type = object : TypeToken<HashMap<String, String>>() {}.type
        private val stringListType: Type = object : TypeToken<ArrayList<String>>() {}.type

        val gson: Gson = GsonBuilder()
            .registerTypeAdapter(DefaultTemplateParam::class.java, DefaultTemplateParamDeserializerGson())
            .registerTypeAdapter(SendDefaultMemoParam::class.java, SendDefaultMemoParamDeserializerGson())
            .registerTypeAdapter(SendDefaultMessageParam::class.java, SendDefaultMessageParamDeserializerGson())
            .registerTypeAdapter(ShippingAddressesParam::class.java, ShippingAddressesParamDeserializerGson())
            .registerTypeAdapter(UploadImageParam::class.java, UploadImageParamDeserializerGson())
            .registerTypeAdapter(StoryUploadParam::class.java, StoryUploadParamDeserializerGson())
            .registerTypeAdapter(Date::class.java, DateSerializerGson())
            .registerTypeAdapter(LinkResult::class.java, LinkResultSerializerGson())
            .create()

        fun asFile(jsonObject: JsonObject, memberName: String): File {
            if (jsonObject.has(memberName)) {
                val image = jsonObject.get(memberName).asString
                if (image.startsWith("file://", true)) {
                    return File(image.substring(7))
                }
                return File(image)
            }
            return File("")
        }

        fun asFile(jsonElement: JsonElement): File {
            val image = jsonElement.asString
            if (image.startsWith("file://", true)) {
                return File(image.substring(7))
            }
            return File(image)
        }

        fun asTemplate(jsonObject: JsonObject, memberName: String): DefaultTemplate? {
            if (jsonObject.has(memberName)) {
                val jsonObjectTemplate = jsonObject.getAsJsonObject(memberName)
                if (jsonObjectTemplate.has("objectType")) {
                    when (jsonObjectTemplate.get("objectType").asString) {
                        "feed" -> return gson.fromJson(jsonObjectTemplate.toString(), FeedTemplate::class.java)
                        "list" -> return gson.fromJson(jsonObjectTemplate.toString(), ListTemplate::class.java)
                        "location" -> return gson.fromJson(jsonObjectTemplate.toString(), LocationTemplate::class.java)
                        "commerce" -> return gson.fromJson(jsonObjectTemplate.toString(), CommerceTemplate::class.java)
                        "text" -> return gson.fromJson(jsonObjectTemplate.toString(), TextTemplate::class.java)
                    }
                }
            }
            return null
        }

        fun asMap(jsonObject: JsonObject, memberName: String): Map<String, String>? {
            if (jsonObject.has(memberName)) {
                return gson.fromJson<HashMap<String, String>>(
                    jsonObject.getAsJsonObject(memberName).toString(),
                    mapType
                )
            }
            return null
        }

        fun asStringList(jsonObject: JsonObject, memberName: String): List<String>? {
            if (jsonObject.has(memberName)) {
                return gson.fromJson<ArrayList<String>>(
                    jsonObject.getAsJsonArray(memberName).toString(),
                    stringListType
                )
            }
            return null
        }
    }
}
