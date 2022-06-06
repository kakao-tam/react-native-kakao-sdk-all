//
//  ObjC.m
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

#import "ObjC.h"

@implementation ObjC

+ (nullable NSError *)tryCatch:(void(^)(void))tryBlock {
    @try {
        tryBlock();
    }
    @catch (NSException *exception) {
        return [[NSError alloc] initWithDomain:exception.name code:0 userInfo:exception.userInfo];
    }
    @catch (NSError *error) {
        return error;
    }
    return nil;
}

@end
