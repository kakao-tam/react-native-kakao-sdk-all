package com.kakaotam.rnsdk.link

import com.facebook.react.bridge.*
import com.kakao.sdk.link.LinkClient
import com.kakao.sdk.link.model.ImageUploadResult
import com.kakao.sdk.link.model.LinkResult
import com.kakaotam.rnsdk.common.PromiseTransformer
import com.kakaotam.rnsdk.common.ReactToParam
import com.kakaotam.rnsdk.common.SdkInitializer
import com.kakaotam.rnsdk.link.model.*

class LinkApiClientModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "LinkApiClientModule"
    }

    @ReactMethod
    private fun customTemplate(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, CustomTemplateParam::class.java)!!
        LinkClient.instance.customTemplate(
            reactContext.currentActivity!!,
            p.templateId,
            p.templateArgs,
            p.serverCallbackArgs
        ) f@{ linkResult: LinkResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(linkResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun defaultTemplate(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, DefaultTemplateParam::class.java)!!
        LinkClient.instance.defaultTemplate(
            reactContext.currentActivity!!,
            p.templateObject!!,
            p.serverCallbackArgs
        ) f@{ linkResult: LinkResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(linkResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun scrapImage(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ScrapImageParam::class.java)!!
        LinkClient.instance.scrapImage(
            p.imageUrl,
            p.secureResource
        ) f@{ imageUploadResult: ImageUploadResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(imageUploadResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun scrapTemplate(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ScrapTemplateParam::class.java)!!
        LinkClient.instance.scrapTemplate(
            reactContext.currentActivity!!,
            p.requestUrl,
            p.templateId,
            p.templateArgs,
            p.serverCallbackArgs
        ) f@{ linkResult: LinkResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(linkResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun uploadImage(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, UploadImageParam::class.java)!!
        LinkClient.instance.uploadImage(
            p.image,
            p.secureResource
        ) f@{ imageUploadResult: ImageUploadResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(imageUploadResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
