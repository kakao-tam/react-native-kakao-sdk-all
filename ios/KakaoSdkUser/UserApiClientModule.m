//
//  UserApiClientModule.m
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(UserApiClientModule, NSObject)

RCT_EXTERN_METHOD(accessTokenInfo:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock)reject *)
RCT_EXTERN_METHOD(certLoginWithKakaoAccount:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(certLoginWithKakaoTalk:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(isKakaoTalkLoginAvailable:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(loginWithKakaoAccount:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(loginWithKakaoTalk:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(logout:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(me:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(revokeScopes:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(scopes:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(serviceTerms:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(shippingAddresses:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(signup:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(unlink:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(updateProfile:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)

@end
