//
//  StoryApiClientModule.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao on 2022/05/23.
//

import Foundation

import KakaoSDKStory

@objc(StoryApiClientModule)
class StoryApiClientModule: NSObject {
    
    @objc(delete:withResolve:withReject:)
    func delete(_ param:NSDictionary,
                resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(DeleteStoryParam.self)!
            StoryApi.shared.delete(p.id) {
                (error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(true)
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(isStoryUser:withReject:)
    func isStoryUser(_ resolve:@escaping RCTPromiseResolveBlock,
                     reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            StoryApi.shared.isStoryUser() {
                (bool: Bool?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(bool ?? false)
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(linkInfo:withResolve:withReject:)
    func linkInfo(_ param:NSDictionary,
                  resolve:@escaping RCTPromiseResolveBlock,
                  reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(LinkInfoParam.self)!
            StoryApi.shared.linkInfo(url: p.url) {
                (linkInfo: LinkInfo?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(linkInfo?.toJsonString())
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(postLink:withResolve:withReject:)
    func postLink(_ param:NSDictionary,
                  resolve:@escaping RCTPromiseResolveBlock,
                  reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(PostLinkParam.self)!
            StoryApi.shared.postLink(content: p.content, linkInfo: p.linkInfo, permission: p.permission, enableShare: p.enableShare, androidExecParam: p.androidExecParam, iosExecParam: p.iosExecParam, androidMarketParam: p.androidMarketParam, iosMarketParam: p.iosMarketParam
            ) {
                (string: String?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(string)
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(postNote:withResolve:withReject:)
    func postNote(_ param:NSDictionary,
                  resolve:@escaping RCTPromiseResolveBlock,
                  reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(PostNoteParam.self)!
            StoryApi.shared.postNote(content: p.content,
                                     permission: p.permission,
                                     enableShare: p.enableShare,
                                     androidExecParam: p.androidExecParam,
                                     iosExecParam: p.iosExecParam,
                                     androidMarketParam: p.androidMarketParam,
                                     iosMarketParam: p.iosMarketParam) {
                (string: String?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(string)
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(postPhoto:withResolve:withReject:)
    func postPhoto(_ param:NSDictionary,
                   resolve:@escaping RCTPromiseResolveBlock,
                   reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(PostPhotoParam.self)!
            StoryApi.shared.postPhoto(content: p.content,
                                      imagePaths: p.imagePaths,
                                      permission: p.permission,
                                      enableShare: p.enableShare,
                                      androidExecParam: p.androidExecParam,
                                      iosExecParam: p.iosExecParam,
                                      androidMarketParam: p.androidMarketParam,
                                      iosMarketParam: p.iosMarketParam){
                (string: String?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(string);
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(profile:withResolve:withReject:)
    func profile(_ param:NSDictionary,
                 resolve:@escaping RCTPromiseResolveBlock,
                 reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ProfileParam.self)!
            StoryApi.shared.profile(secureResource: p.secureResource){
                (storyProfile: StoryProfile?, error: Error? ) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(storyProfile?.toJsonString());
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(stories:withResolve:withReject:)
    func stories(_ param:NSDictionary,
                 resolve:@escaping RCTPromiseResolveBlock,
                 reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(StoriesParam.self)!
            StoryApi.shared.stories(lastId: p.lastId){
                (stories: [Story]?, error: Error? ) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(stories?.toJsonString());
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(story:withResolve:withReject:)
    func story(_ param:NSDictionary,
               resolve:@escaping RCTPromiseResolveBlock,
               reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(StoryParam.self)!
            StoryApi.shared.story(id: p.id){
                (stroy: Story?, error: Error? ) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(stroy?.toJsonString());
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(upload:withResolve:withReject:)
    func upload(_ param:NSDictionary,
                resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(StoryUploadParam.self)!
            StoryApi.shared.upload(p.images) {
                (strings: [String]?, error: Error? ) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(strings?.toJsonString());
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
