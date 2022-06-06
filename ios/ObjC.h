//
//  ObjC.h
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

#import <Foundation/Foundation.h>

@interface ObjC : NSObject

+ (nullable NSError *)tryCatch:(void(^_Nonnull)(void))tryBlock;
@end
