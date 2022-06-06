//
//  AuthApiClientModule.m
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AuthApiClientModule, NSObject)

RCT_EXTERN_METHOD(hasToken:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock)reject *)
RCT_EXTERN_METHOD(refreshToken:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock)reject *)

@end
