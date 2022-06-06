//
//  UserApiClientModule.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKAuth
import KakaoSDKUser

@objc(UserApiClientModule)
class UserApiClientModule: NSObject {
    
    @objc(accessTokenInfo:withReject:)
    func accessTokenInfo(_ resolve:@escaping RCTPromiseResolveBlock,
                         reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            UserApi.shared.accessTokenInfo {
                (accessTokenInfo : AccessTokenInfo?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(accessTokenInfo?.toJsonString());
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(certLoginWithKakaoAccount:withResolve:withReject:)
    func certLoginWithKakaoAccount(_ param:NSDictionary,
                                   resolve:@escaping RCTPromiseResolveBlock,
                                   reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(LoginParam.self)!
            UserApi.shared.certLoginWithKakaoAccount(prompts: p.prompts,
                                                     state: p.state,
                                                     loginHint: p.loginHint,
                                                     nonce: p.nonce) {
                (certTokenInfo : CertTokenInfo?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(certTokenInfo?.toJsonString());
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(certLoginWithKakaoTalk:withResolve:withReject:)
    func certLoginWithKakaoTalk(_ param:NSDictionary,
                                resolve:@escaping RCTPromiseResolveBlock,
                                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(LoginParam.self)!
            UserApi.shared.certLoginWithKakaoTalk(prompts: p.prompts,
                                                  state: p.state,
                                                  channelPublicIds: p.channelPublicIds,
                                                  serviceTerms: p.serviceTerms,
                                                  nonce: p.nonce) {
                (certTokenInfo : CertTokenInfo?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(certTokenInfo?.toJsonString());
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(isKakaoTalkLoginAvailable:withReject:)
    func isKakaoTalkLoginAvailable(_ resolve:@escaping RCTPromiseResolveBlock,
                                   reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            resolve(UserApi.isKakaoTalkLoginAvailable())
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(loginWithKakaoAccount:withResolve:withReject:)
    func loginWithKakaoAccount(_ param:NSDictionary,
                               resolve:@escaping RCTPromiseResolveBlock,
                               reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(LoginParam.self)!
            if let scopes = p.scopes {
                UserApi.shared.loginWithKakaoAccount(scopes: scopes,
                                                     nonce: p.nonce) {
                    (oauthToken: OAuthToken?, error: Error?) in
                    if let error = error {
                        reject(error.rnCode(), error.rnMessage(), error)
                    } else {
                        resolve(oauthToken?.toJsonString())
                    }
                }
            } else {
                if p.channelPublicIds != nil || p.serviceTerms != nil {
                    UserApi.shared.loginWithKakaoAccount(prompts: p.prompts,
                                                         channelPublicIds: p.channelPublicIds,
                                                         serviceTerms: p.serviceTerms,
                                                         nonce: p.nonce) {
                        (oauthToken: OAuthToken?, error: Error?) in
                        if let error = error {
                            reject(error.rnCode(), error.rnMessage(), error)
                        } else {
                            resolve(oauthToken?.toJsonString())
                        }
                    }
                } else {
                    UserApi.shared.loginWithKakaoAccount(prompts: p.prompts,
                                                         loginHint: p.loginHint,
                                                         nonce: p.nonce) {
                        (oauthToken: OAuthToken?, error: Error?) in
                        if let error = error {
                            reject(error.rnCode(), error.rnMessage(), error)
                        } else {
                            resolve(oauthToken?.toJsonString())
                        }
                    }
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(loginWithKakaoTalk:withResolve:withReject:)
    func loginWithKakaoTalk(_ param:NSDictionary,
                            resolve:@escaping RCTPromiseResolveBlock,
                            reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(LoginParam.self)!
            UserApi.shared.loginWithKakaoTalk(channelPublicIds: p.channelPublicIds,
                                              serviceTerms: p.serviceTerms,
                                              nonce: p.nonce) {
                (oauthToken: OAuthToken?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(oauthToken?.toJsonString())
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(logout:withReject:)
    func logout(_ resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            UserApi.shared.logout() {
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
    
    @objc(me:withResolve:withReject:)
    func me(_ param:NSDictionary,
            resolve:@escaping RCTPromiseResolveBlock,
            reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(MeParam.self)!
            UserApi.shared.me(propertyKeys: p.propertyKeys,
                              secureResource: p.secureResource) {
                (user: User?, error:Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(user?.toJsonString())
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(revokeScopes:withResolve:withReject:)
    func revokeScopes(_ param:NSDictionary,
                      resolve:@escaping RCTPromiseResolveBlock,
                      reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ScopesParam.self)!
            UserApi.shared.revokeScopes(scopes: p.scopes ?? []){
                (scopeInfo: ScopeInfo?, error:Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(scopeInfo?.toJsonString())
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(scopes:withResolve:withReject:)
    func scopes(_ param:NSDictionary,
                resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ScopesParam.self)!
            UserApi.shared.scopes(scopes: p.scopes ?? []) {
                (scopeInfo: ScopeInfo?, error:Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(scopeInfo?.toJsonString())
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(serviceTerms:withResolve:withReject:)
    func serviceTerms(_ param:NSDictionary,
                      resolve:@escaping RCTPromiseResolveBlock,
                      reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ServiceTermsParam.self)!
            UserApi.shared.serviceTerms(extra: p.extra) {
                (userServiceTerms: UserServiceTerms?, error:Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(userServiceTerms?.toJsonString())
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(shippingAddresses:withResolve:withReject:)
    func shippingAddresses(_ param:NSDictionary,
                           resolve:@escaping RCTPromiseResolveBlock,
                           reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(ShippingAddressesParam.self)!
            if p.addressId != nil {
                UserApi.shared.shippingAddresses(addressId: p.addressId!) {
                    (userShippingAddresses: UserShippingAddresses?, error:Error?) in
                    if let error = error {
                        reject(error.rnCode(), error.rnMessage(), error)
                    } else {
                        resolve(userShippingAddresses?.toJsonString())
                    }
                }
            } else {
                UserApi.shared.shippingAddresses(fromUpdatedAt: p.fromUpdatedAt,
                                                 pageSize: p.pageSize) {
                    (userShippingAddresses: UserShippingAddresses?, error:Error?) in
                    if let error = error {
                        reject(error.rnCode(), error.rnMessage(), error)
                    } else {
                        resolve(userShippingAddresses?.toJsonString())
                    }
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(signup:withResolve:withReject:)
    func signup(_ param:NSDictionary,
                resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(SignupParam.self)!
            UserApi.shared.signup(properties: p.properties) {
                (id: Int64?, error:Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(id)
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(unlink:withReject:)
    func unlink(_ resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            UserApi.shared.unlink() {
                (error:Error?) in
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
    
    @objc(updateProfile:withResolve:withReject:)
    func updateProfile(_ param:NSDictionary,
                       resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = ObjC.tryCatch {
            SdkInitializer.shared.ensure()
            let p = param.toParam(UpdateProfileParam.self)!
            UserApi.shared.updateProfile(properties: p.properties ?? [:]) {
                (error:Error?) in
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
}
