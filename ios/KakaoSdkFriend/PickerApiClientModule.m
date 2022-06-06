//
//  PickerApiClientModule.m
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PickerApiClientModule, NSObject)

RCT_EXTERN_METHOD(selectFriend:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(selectFriendPopup:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(selectFriends:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(selectFriendsPopup:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)

@end
