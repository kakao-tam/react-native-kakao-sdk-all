package com.kakaotam.rnsdk

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.kakaotam.rnsdk.auth.AuthApiClientModule
import com.kakaotam.rnsdk.common.KakaoSdkCommonModule
import com.kakaotam.rnsdk.friend.PickerApiClientModule
import com.kakaotam.rnsdk.link.LinkApiClientModule
import com.kakaotam.rnsdk.navi.NaviApiClientModule
import com.kakaotam.rnsdk.story.StoryApiClientModule
import com.kakaotam.rnsdk.talk.TalkApiClientModule
import com.kakaotam.rnsdk.user.UserApiClientModule

class KakaoSdkAllPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
            KakaoSdkCommonModule(reactContext),
            AuthApiClientModule(reactContext),
            LinkApiClientModule(reactContext),
            UserApiClientModule(reactContext),
            PickerApiClientModule(reactContext),
            TalkApiClientModule(reactContext),
            NaviApiClientModule(reactContext),
            StoryApiClientModule(reactContext)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
