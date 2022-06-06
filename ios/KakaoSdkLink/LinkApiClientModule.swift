//
//  LinkApiClientModule.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKLink

@objc(LinkApiClientModule)
class LinkApiClientModule: NSObject {
 
    @objc(customTemplate:withResolve:withReject:)
    func customTemplate(_ param:NSDictionary,
                        resolve:@escaping RCTPromiseResolveBlock,
                        reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(CustomTemplateParam.self)!
            LinkApi.shared.customLink(templateId: p.templateId,
                                      templateArgs: p.templateArgs,
                                      serverCallbackArgs: p.serverCallbackArgs) {
                (linkResult: LinkResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(linkResult?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(defaultTemplate:withResolve:withReject:)
    func defaultTemplate(_ param:NSDictionary,
                         resolve:@escaping RCTPromiseResolveBlock,
                         reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(DefaultTemplateParam.self)!
            LinkApi.shared.defaultLink(templateObject: p.templateObject,
                                       serverCallbackArgs: p.serverCallbackArgs) {
                (linkResult: LinkResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(linkResult?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(scrapImage:withResolve:withReject:)
    func scrapImage(_ param:NSDictionary,
                    resolve:@escaping RCTPromiseResolveBlock,
                    reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ScrapImageParam.self)!
            LinkApi.shared.imageScrap(imageUrl: p.imageUrl,
                                      secureResource: p.secureResource) {
                (imageUploadResult: ImageUploadResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(imageUploadResult?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(scrapTemplate:withResolve:withReject:)
    func scrapTemplate(_ param:NSDictionary,
                       resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ScrapTemplateParam.self)!
            LinkApi.shared.scrapLink(requestUrl: p.requestUrl,
                                     templateId: p.templateId,
                                     templateArgs: p.templateArgs,
                                     serverCallbackArgs: p.serverCallbackArgs) {
                (linkResult: LinkResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(linkResult?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(uploadImage:withResolve:withReject:)
    func uploadImage(_ param:NSDictionary,
                     resolve:@escaping RCTPromiseResolveBlock,
                     reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(UploadImageParam.self)!
            LinkApi.shared.imageUpload(image: p.image,
                                       secureResource: p.secureResource) {
                (imageUploadResult: ImageUploadResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(imageUploadResult?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
