package com.kakaotam.rnsdk.talk

import com.facebook.react.bridge.*
import com.kakao.sdk.talk.TalkApiClient
import com.kakao.sdk.talk.model.*
import com.kakaotam.rnsdk.common.PromiseTransformer
import com.kakaotam.rnsdk.common.ReactToParam
import com.kakaotam.rnsdk.common.SdkInitializer
import com.kakaotam.rnsdk.talk.model.*

class TalkApiClientModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "TalkApiClientModule"
    }

    @ReactMethod
    private fun addChannelUrl(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, AddChannelParam::class.java)!!
        promise.resolve(TalkApiClient.instance.addChannelUrl(p.channelPublicId).toString())
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun channelChatUrl(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ChannelChatParam::class.java)!!
        promise.resolve(TalkApiClient.instance.channelChatUrl(p.channelPublicId).toString())
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun channels(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ChannelsParam::class.java)!!
        TalkApiClient.instance.channels(p.publicIds) f@{ relations: Channels?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(relations))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun friends(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, FriendsParam::class.java)!!
        TalkApiClient.instance.friends(
            p.offset,
            p.limit,
            p.order,
            p.friendOrder
        ) f@{ friends: Friends<Friend>?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(friends))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun profile(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        TalkApiClient.instance.profile() f@{ profile: TalkProfile?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(profile))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun sendCustomMemo(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SendCustomMemoParam::class.java)!!
        TalkApiClient.instance.sendCustomMemo(p.templateId, p.templateArgs) f@{ error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(true)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun sendDefaultMemo(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SendDefaultMemoParam::class.java)!!
        TalkApiClient.instance.sendDefaultMemo(p.templatable!!) f@{ error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(true)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun sendScrapMemo(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SendScrapMemoParam::class.java)!!
        TalkApiClient.instance.sendScrapMemo(p.requestUrl, p.templateId, p.templateArgs) f@{ error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(true)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun sendCustomMessage(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SendCustomMessageParam::class.java)!!
        TalkApiClient.instance.sendCustomMessage(
            p.receiverUuids,
            p.templateId,
            p.templateArgs
        ) f@{ messageSendResult: MessageSendResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(messageSendResult)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun sendDefaultMessage(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SendDefaultMessageParam::class.java)!!
        TalkApiClient.instance.sendDefaultMessage(
            p.receiverUuids,
            p.templatable!!,
        ) f@{ messageSendResult: MessageSendResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(messageSendResult)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun sendScrapMessage(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SendScrapMessageParam::class.java)!!
        TalkApiClient.instance.sendScrapMessage(
            p.receiverUuids,
            p.requestUrl,
            p.templateId,
            p.templateArgs
        ) f@{ messageSendResult: MessageSendResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(messageSendResult)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
