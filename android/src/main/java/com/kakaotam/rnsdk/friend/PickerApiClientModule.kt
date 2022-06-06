package com.kakaotam.rnsdk.friend

import com.facebook.react.bridge.*
import com.kakao.sdk.friend.client.PickerClient
import com.kakao.sdk.friend.model.SelectedUsers
import com.kakaotam.rnsdk.common.PromiseTransformer
import com.kakaotam.rnsdk.common.ReactToParam
import com.kakaotam.rnsdk.common.SdkInitializer
import com.kakaotam.rnsdk.friend.model.SelectFriendParam

class PickerApiClientModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "PickerApiClientModule"
    }

    @ReactMethod
    private fun selectFriend(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SelectFriendParam::class.java)!!
        PickerClient.instance.selectFriend(
            reactContext.currentActivity!!,
            p.params
        ) f@{ selectedUsers: SelectedUsers?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(selectedUsers))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun selectFriendPopup(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SelectFriendParam::class.java)!!
        PickerClient.instance.selectFriendPopup(
            reactContext.currentActivity!!,
            p.params
        ) f@{ selectedUsers: SelectedUsers?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(selectedUsers))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun selectFriends(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SelectFriendParam::class.java)!!
        PickerClient.instance.selectFriends(
            reactContext.currentActivity!!,
            p.params
        ) f@{ selectedUsers: SelectedUsers?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(selectedUsers))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun selectFriendsPopup(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SelectFriendParam::class.java)!!
        PickerClient.instance.selectFriendsPopup(
            reactContext.currentActivity!!,
            p.params
        ) f@{ selectedUsers: SelectedUsers?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(selectedUsers))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
