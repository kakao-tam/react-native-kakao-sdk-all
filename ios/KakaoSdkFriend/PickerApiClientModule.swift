//
//  PickerApiClientModule.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKAuth
import KakaoSDKUser
import KakaoSDKTalk
import KakaoSDKFriend

@objc(PickerApiClientModule)
class PickerApiClientModule: NSObject {
    
    @objc(selectFriend:withResolve:withReject:)
    func selectFriend(_ param:NSDictionary,
                      resolve:@escaping RCTPromiseResolveBlock,
                      reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SelectFriendParam.self)!
            PickerApi.shared.selectFriend(params:p.params) {
                (selectedUsers: SelectedUsers?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(selectedUsers?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(selectFriendPopup:withResolve:withReject:)
    func selectFriendPopup(_ param:NSDictionary,
                           resolve:@escaping RCTPromiseResolveBlock,
                           reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SelectFriendParam.self)!
            PickerApi.shared.selectFriendPopup(params:p.params) {
                (selectedUsers: SelectedUsers?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(selectedUsers?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(selectFriends:withResolve:withReject:)
    func selectFriends(_ param:NSDictionary,
                       resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SelectFriendParam.self)!
            PickerApi.shared.selectFriends(params:p.params) {
                (selectedUsers: SelectedUsers?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(selectedUsers?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(selectFriendsPopup:withResolve:withReject:)
    func selectFriendsPopup(_ param:NSDictionary,
                            resolve:@escaping RCTPromiseResolveBlock,
                            reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SelectFriendParam.self)!
            PickerApi.shared.selectFriendsPopup(params:p.params) {
                (selectedUsers: SelectedUsers?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(selectedUsers?.toJsonString());
                }
            }
            
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
