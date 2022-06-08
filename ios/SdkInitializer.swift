//
//  SdkInitializer.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKCommon

final class SdkInitializer {
    static let shared = SdkInitializer()
    
    var initialized: Bool = false
    
    private init() {}
    
    func ensure() {
        if !initialized {
            let appKey = Bundle.main.object(forInfoDictionaryKey: "KAKAO_NATIVE_APP_KEY") as? String
            if let appKey = appKey {
                KakaoSDK.initSDK(appKey: appKey)
                initialized = true
            }
        }
    }
}
