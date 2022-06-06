//
//  TalkApiClientModule.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKTalk

@objc(TalkApiClientModule)
class TalkApiClientModule: NSObject {

    @objc(addChannelUrl:withResolve:withReject:)
    func addChannelUrl(_ param:NSDictionary,
                       resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(AddChannelParam.self)!
            if let data = TalkApi.shared.makeUrlForAddChannel(channelPublicId: p.channelPublicId) {
                resolve(data.absoluteString)
            } else {
                resolve("")
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(channelChatUrl:withResolve:withReject:)
    func channelChatUrl(_ param:NSDictionary,
                        resolve:@escaping RCTPromiseResolveBlock,
                        reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ChannelChatParam.self)!
            if let data = TalkApi.shared.makeUrlForChannelChat(channelPublicId: p.channelPublicId) {
                resolve(data.absoluteString)
            } else {
                resolve("")
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(channels:withResolve:withReject:)
    func channels(_ param:NSDictionary,
                  resolve:@escaping RCTPromiseResolveBlock,
                  reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ChannelsParam.self)!
            TalkApi.shared.channels(publicIds: p.publicIds) {
                (channels: Channels?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(channels?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(friends:withResolve:withReject:)
    func friends(_ param:NSDictionary,
                 resolve:@escaping RCTPromiseResolveBlock,
                 reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(FriendsParam.self)!
            TalkApi.shared.friends(offset: p.offset,
                                   limit: p.limit,
                                   order: p.order,
                                   friendOrder: p.friendOrder) {
                (friends: Friends<Friend>?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(friends?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(profile:withReject:)
    func profile(_ resolve:@escaping RCTPromiseResolveBlock,
                 reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            TalkApi.shared.profile() {
                (talkProfile: TalkProfile?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(talkProfile?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(sendCustomMemo:withResolve:withReject:)
    func sendCustomMemo(_ param:NSDictionary,
                        resolve:@escaping RCTPromiseResolveBlock,
                        reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SendCustomMemoParam.self)!
            TalkApi.shared.sendCustomMemo(templateId: p.templateId,
                                          templateArgs: p.templateArgs) {
                (error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(true);
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(sendDefaultMemo:withResolve:withReject:)
    func sendDefaultMemo(_ param:NSDictionary,
                         resolve:@escaping RCTPromiseResolveBlock,
                         reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SendDefaultMemoParam.self)!
            TalkApi.shared.sendDefaultMemo(templatable: p.templatable) {
                (error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(true);
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(sendScrapMemo:withResolve:withReject:)
    func sendScrapMemo(_ param:NSDictionary,
                       resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SendScrapMemoParam.self)!
            TalkApi.shared.sendScrapMemo(requestUrl: p.requestUrl,
                                         templateId: p.templateId,
                                         templateArgs: p.templateArgs) {
                (error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(true);
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(sendCustomMessage:withResolve:withReject:)
    func sendCustomMessage(_ param:NSDictionary,
                           resolve:@escaping RCTPromiseResolveBlock,
                           reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SendCustomMessageParam.self)!
            TalkApi.shared.sendCustomMessage(templateId: p.templateId,
                                             templateArgs: p.templateArgs,
                                             receiverUuids: p.receiverUuids) {
                (messageSendResult: MessageSendResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(messageSendResult?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(sendDefaultMessage:withResolve:withReject:)
    func sendDefaultMessage(_ param:NSDictionary,
                            resolve:@escaping RCTPromiseResolveBlock,
                            reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SendDefaultMessageParam.self)!
            TalkApi.shared.sendDefaultMessage(templatable: p.templatable,
                                              receiverUuids: p.receiverUuids) {
                (messageSendResult: MessageSendResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(messageSendResult?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(sendScrapMessage:withResolve:withReject:)
    func sendScrapMessage(_ param:NSDictionary,
                          resolve:@escaping RCTPromiseResolveBlock,
                          reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SendScrapMessageParam.self)!
            TalkApi.shared.sendScrapMessage(requestUrl: p.requestUrl,
                                            templateId: p.templateId,
                                            templateArgs: p.templateArgs,
                                            receiverUuids: p.receiverUuids) {
                (messageSendResult: MessageSendResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(messageSendResult?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
