package com.kakaotam.rnsdk.navi

import android.content.Intent
import com.facebook.react.bridge.*
import com.kakao.sdk.navi.NaviClient
import com.kakaotam.rnsdk.common.PromiseTransformer
import com.kakaotam.rnsdk.common.ReactToParam
import com.kakaotam.rnsdk.common.SdkInitializer
import com.kakaotam.rnsdk.navi.model.NaviUrlParam

class NaviApiClientModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "NaviApiClientModule"
    }

    @ReactMethod
    private fun shareUrl(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, NaviUrlParam::class.java)!!
        val intent = NaviClient.instance.shareDestinationIntent(p.destination, p.option, p.viaList)
        promise.resolve(intent.toUri(Intent.URI_INTENT_SCHEME))
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun navigateUrl(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, NaviUrlParam::class.java)!!
        val intent = NaviClient.instance.shareDestinationIntent(p.destination, p.option, p.viaList)
        promise.resolve(intent.toUri(Intent.URI_INTENT_SCHEME))
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
