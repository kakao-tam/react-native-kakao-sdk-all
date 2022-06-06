package com.kakaotam.rnsdk.common

import com.kakao.sdk.common.model.ApiError
import com.kakao.sdk.common.model.AuthError
import com.kakao.sdk.common.model.ClientError
import com.kakaotam.rnsdk.common.gson.GsonUtils

class PromiseTransformer {
    companion object {
        fun rnCode(e: Throwable): String {
            (e as? ApiError)?.let {
                return "${it.reason.errorCode}"
            }
            (e as? AuthError)?.let {
                return "${it.reason.name}"
            }
            (e as? ClientError)?.let {
                return "${it.reason}"
            }
            return "UnknownError"
        }

        fun rnMessage(e: Throwable): String {
            e.localizedMessage?.let {
                return@rnMessage it
            }
            return "";
        }

        fun toJsonString(any: Any?): Any? {
            any?.let {
                return GsonUtils.gson.toJson(it)
            }
            return null;
        }
    }
}
