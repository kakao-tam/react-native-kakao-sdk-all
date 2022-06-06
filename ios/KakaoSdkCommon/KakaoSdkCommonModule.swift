//
//  KakaoSdkCommonModule.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKCommon

@objc(KakaoSdkCommonModule)
class KakaoSdkCommonModule: NSObject {
    
    @objc(`init`:withResolve:withReject:)
    func initSdk(_ param: NSDictionary,
                 resolve:@escaping RCTPromiseResolveBlock,
                 reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            let p = param.toParam(InitSdkParam.self)!
            KakaoSDK.initSDK(appKey: p.appKey,
                             customScheme: p.customScheme,
                             loggingEnable: p.loggingEnable,
                             hosts: p.hosts,
                             approvalType: p.approvalType)
            SdkInitializer.shared.initialized = true
            resolve(true);
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(isInitialized:withReject:)
    func isInitialized(_ resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        SdkInitializer.shared.ensure()
        resolve(SdkInitializer.shared.initialized)
    }
    
    @objc(appKey:withReject:)
    func appKey(_ resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            do {
                resolve(try KakaoSDK.shared.appKey())
            } catch {
                reject(error.rnCode(), error.rnMessage(), error)
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
