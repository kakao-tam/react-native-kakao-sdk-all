package com.kakaotam.rnsdk.common

import com.facebook.react.bridge.ReactApplicationContext
import com.kakao.sdk.common.KakaoSdk

class SdkInitializer private constructor() {
    companion object {
        @JvmStatic
        var initialized = false;

        fun ensure(reactContext: ReactApplicationContext) {
            if (!initialized) {
                val appKey =
                    reactContext.resources.getString(
                        reactContext.resources.getIdentifier(
                            "KAKAO_NATIVE_APP_KEY",
                            "string",
                            reactContext.packageName
                        )
                    )
                if (appKey.isNotBlank()) {
                    KakaoSdk.init(
                        reactContext.currentActivity!!,
                        appKey,
                        null,
                        null,
                        null,
                        null
                    )
                    initialized = true;
                }
            }
        }
    }
}
