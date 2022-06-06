package com.kakaotam.rnsdk.common

import com.facebook.react.bridge.ReadableMap
import com.kakaotam.rnsdk.common.gson.GsonUtils

class ReactToParam {
    companion object {
        fun <T> toParam(param: ReadableMap, classOfT: Class<T>): T? {
            param.getString("_json_")?.let {
                return GsonUtils.gson.fromJson(it, classOfT)
            }
            return null
        }
    }
}
