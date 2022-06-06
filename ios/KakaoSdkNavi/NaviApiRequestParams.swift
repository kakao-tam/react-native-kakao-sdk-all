//
//  RequestParams.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import KakaoSDKNavi

struct NaviUrlParam : Decodable {
    var destination: NaviLocation
    var option: NaviOption?
    var viaList: [NaviLocation]?
}
