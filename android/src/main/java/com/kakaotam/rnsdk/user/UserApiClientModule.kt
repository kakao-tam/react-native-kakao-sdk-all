package com.kakaotam.rnsdk.user

import com.facebook.react.bridge.*
import com.kakao.sdk.auth.AuthCodeClient
import com.kakao.sdk.auth.model.CertTokenInfo
import com.kakao.sdk.auth.model.OAuthToken
import com.kakao.sdk.user.UserApiClient
import com.kakao.sdk.user.model.*
import com.kakaotam.rnsdk.common.PromiseTransformer
import com.kakaotam.rnsdk.common.ReactToParam
import com.kakaotam.rnsdk.common.SdkInitializer
import com.kakaotam.rnsdk.user.model.*

class UserApiClientModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "UserApiClientModule"
    }

    @ReactMethod
    private fun accessTokenInfo(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        UserApiClient.instance.accessTokenInfo f@{ accessTokenInfo: AccessTokenInfo?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(accessTokenInfo))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun certLoginWithKakaoAccount(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, LoginParam::class.java)!!
        UserApiClient.instance.certLoginWithKakaoAccount(
            reactContext.currentActivity!!,
            p.prompts,
            p.state,
            p.nonce,
            p.channelPublicIds,
            p.serviceTerms,
            p.loginHint
        ) f@{ certTokenInfo: CertTokenInfo?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(certTokenInfo))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun certLoginWithKakaoTalk(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, LoginParam::class.java)!!
        UserApiClient.instance.certLoginWithKakaoTalk(
            reactContext.currentActivity!!,
            p.prompts,
            p.state,
            AuthCodeClient.DEFAULT_REQUEST_CODE,
            p.nonce,
            p.channelPublicIds,
            p.serviceTerms
        ) f@{ certTokenInfo: CertTokenInfo?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(certTokenInfo))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun isKakaoTalkLoginAvailable(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        promise.resolve(UserApiClient.instance.isKakaoTalkLoginAvailable(reactContext.currentActivity!!))
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun loginWithKakaoAccount(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, LoginParam::class.java)!!
        p.scopes?.let { scopes ->
            UserApiClient.instance.loginWithNewScopes(
                reactContext.currentActivity!!,
                scopes,
                p.nonce
            ) f@{ oAuthToken: OAuthToken?, error: Throwable? ->
                error?.let {
                    promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                    return@f
                }
                promise.resolve(PromiseTransformer.toJsonString(oAuthToken))
            }
        } ?: run {
            UserApiClient.instance.loginWithKakaoAccount(
                reactContext.currentActivity!!,
                p.prompts,
                p.loginHint,
                p.nonce,
                p.channelPublicIds,
                p.serviceTerms
            ) f@{ oAuthToken: OAuthToken?, error: Throwable? ->
                error?.let {
                    promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                    return@f
                }
                promise.resolve(PromiseTransformer.toJsonString(oAuthToken))
            }
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun loginWithKakaoTalk(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, LoginParam::class.java)!!
        UserApiClient.instance.loginWithKakaoTalk(
            reactContext.currentActivity!!,
            AuthCodeClient.DEFAULT_REQUEST_CODE,
            p.nonce,
            p.channelPublicIds,
            p.serviceTerms
        ) f@{ oAuthToken: OAuthToken?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(oAuthToken))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

//    @ReactMethod
//    private fun loginWithNewScopes(param: ReadableMap, promise: Promise) = try {
//        SdkInitializer.ensure(reactContext)
//        val p = ReactToParam.toParam(param, LoginWithNewScopesParam::class.java)!!
//        UserApiClient.instance.loginWithNewScopes(
//            reactContext.currentActivity!!,
//            p.scopes,
//            p.nonce
//        ) f@{ oAuthToken: OAuthToken?, error: Throwable? ->
//            error?.let {
//                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
//                return@f
//            }
//            promise.resolve(PromiseTransformer.toJsonString(oAuthToken))
//        }
//    } catch (e: Exception) {
//        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
//    }

    @ReactMethod
    private fun logout(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        UserApiClient.instance.logout f@{ error: Throwable? ->
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
    private fun me(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, MeParam::class.java)!!
        UserApiClient.instance.me(p.secureReSource) f@{ user: User?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(user))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun revokeScopes(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ScopesParam::class.java)!!
        UserApiClient.instance.revokeScopes(p.scopes) f@{ scopeInfo: ScopeInfo?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(scopeInfo))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun scopes(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ScopesParam::class.java)!!
        UserApiClient.instance.scopes(p.scopes) f@{ scopeInfo: ScopeInfo?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(scopeInfo))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun serviceTerms(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ServiceTermsParam::class.java)!!
        UserApiClient.instance.serviceTerms(p.extra) f@{ userServiceTerms: UserServiceTerms?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(userServiceTerms))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun shippingAddresses(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ShippingAddressesParam::class.java)!!
        p.addressId?.let {
            UserApiClient.instance.shippingAddresses(it) f@{ userShippingAddresses: UserShippingAddresses?, error: Throwable? ->
                error?.let {
                    promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                    return@f
                }
                promise.resolve(PromiseTransformer.toJsonString(userShippingAddresses))
                return@f
            }
        } ?: run {
            UserApiClient.instance.shippingAddresses(
                p.fromUpdateAt,
                p.pageSize
            ) f@{ userShippingAddresses: UserShippingAddresses?, error: Throwable? ->
                error?.let {
                    promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                    return@f
                }
                promise.resolve(PromiseTransformer.toJsonString(userShippingAddresses))
                return@f
            }
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun signup(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, SignupParam::class.java)!!
        UserApiClient.instance.signup(p.properties) f@{ error: Throwable? ->
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
    private fun unlink(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        UserApiClient.instance.unlink() f@{ error: Throwable? ->
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
    private fun updateProfile(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, UpdateProfileParam::class.java)!!
        UserApiClient.instance.updateProfile(p.properties) f@{ error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(true)
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
