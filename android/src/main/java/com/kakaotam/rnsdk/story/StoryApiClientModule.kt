package com.kakaotam.rnsdk.story

import com.facebook.react.bridge.*
import com.kakao.sdk.story.StoryApiClient
import com.kakao.sdk.story.model.LinkInfo
import com.kakao.sdk.story.model.Story
import com.kakao.sdk.story.model.StoryPostResult
import com.kakao.sdk.story.model.StoryProfile
import com.kakaotam.rnsdk.common.PromiseTransformer
import com.kakaotam.rnsdk.common.ReactToParam
import com.kakaotam.rnsdk.common.SdkInitializer
import com.kakaotam.rnsdk.story.model.*

class StoryApiClientModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "StoryApiClientModule"
    }

    @ReactMethod
    private fun delete(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, DeleteStroyParam::class.java)!!
        StoryApiClient.instance.delete(p.id) f@{ error: Throwable? ->
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
    private fun isStoryUser(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        StoryApiClient.instance.isStoryUser() f@{ isStoryUser: Boolean?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(isStoryUser!!)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun linkInfo(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, LinkInfoParam::class.java)!!
        StoryApiClient.instance.linkInfo(p.url) f@{ linkInfo: LinkInfo?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(linkInfo))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun postLink(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, PostLinkParam::class.java)!!
        StoryApiClient.instance.postLink(
            p.linkInfo,
            p.content,
            p.permission,
            p.enableShare,
            p.androidExecParam,
            p.iosExecParam,
            p.androidMarketParam,
            p.iosMarketParam
        ) f@{ storyPostResult: StoryPostResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(storyPostResult!!.id)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun postNote(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, PostNoteParam::class.java)!!
        StoryApiClient.instance.postNote(
            p.content,
            p.permission,
            p.enableShare,
            p.androidExecParam,
            p.iosExecParam,
            p.androidMarketParam,
            p.iosMarketParam
        ) f@{ storyPostResult: StoryPostResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(storyPostResult!!.id)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun postPhoto(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, PostPhotoParam::class.java)!!
        StoryApiClient.instance.postPhoto(
            p.imagePaths,
            p.content,
            p.permission,
            p.enableShare,
            p.androidExecParam,
            p.iosExecParam,
            p.androidMarketParam,
            p.iosMarketParam
        ) f@{ storyPostResult: StoryPostResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(storyPostResult!!.id)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun profile(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ProfileParam::class.java)!!
        StoryApiClient.instance.profile(
            p.secureResource
        ) f@{ profile: StoryProfile?, error: Throwable? ->
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
    private fun stories(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, StoriesParam::class.java)!!
        StoryApiClient.instance.stories(
            p.lastId
        ) f@{ stories: List<Story>?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(stories))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun story(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, StoryParam::class.java)!!
        StoryApiClient.instance.story(
            p.id
        ) f@{ story: Story?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(story))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun upload(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, StoryUploadParam::class.java)!!
        StoryApiClient.instance.upload(
            p.images
        ) f@{ uploadedPaths: List<String>?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(uploadedPaths))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
