//
//  NaviApiClientModule.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKNavi

@objc(NaviApiClientModule)
class NaviApiClientModule: NSObject {
    
    override init() {
        SdkInitializer.shared.ensure()
    }
    
    @objc(shareUrl:withResolve:withReject:)
    func shareUrl(_ param:NSDictionary,
                  resolve:@escaping RCTPromiseResolveBlock,
                  reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            let p = param.toParam(NaviUrlParam.self)!
            if let data = NaviApi.shared.shareUrl(destination: p.destination,
                                                  option: p.option,
                                                  viaList: p.viaList) {
                resolve(data.absoluteString)
            } else {
                resolve("")
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(navigateUrl:withResolve:withReject:)
    func navigateUrl(_ param:NSDictionary,
                     resolve:@escaping RCTPromiseResolveBlock,
                     reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            let p = param.toParam(NaviUrlParam.self)!
            if let data = NaviApi.shared.navigateUrl(destination: p.destination,
                                                     option: p.option,
                                                     viaList: p.viaList) {
                resolve(data.absoluteString)
            } else {
                resolve("")
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
