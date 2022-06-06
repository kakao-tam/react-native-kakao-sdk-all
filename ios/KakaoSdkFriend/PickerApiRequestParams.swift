//
//  RequestParams.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import KakaoSDKFriend

struct SelectFriendParam : Decodable {
    var params: OpenPickerFriendRequestParams
    
    enum CodingKeys: String, CodingKey {
        case params
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        if let dic = try? values.decode([String: Any].self, forKey: .params) {
            let serviceTypeFilter: KakaoSDKFriend.PickerServiceTypeFilter?
            let viewAppearance: KakaoSDKFriend.ViewAppearance?
            let orientation: KakaoSDKFriend.PickerOrientation?
            if let serviceTypeFilterStr = dic["serviceTypeFilter"] as? String {
                serviceTypeFilter = KakaoSDKFriend.PickerServiceTypeFilter(rawValue: serviceTypeFilterStr)
            } else {
                serviceTypeFilter = nil
            }
            if let viewAppearanceStr = dic["viewAppearance"] as? String {
                viewAppearance = KakaoSDKFriend.ViewAppearance(rawValue: viewAppearanceStr)
            } else {
                viewAppearance = nil
            }
            if let orientationStr = dic["orientation"] as? String {
                switch (orientationStr) {
                case "portrait":
                    orientation = KakaoSDKFriend.PickerOrientation.portrait
                    break
                case "landscape":
                    orientation = KakaoSDKFriend.PickerOrientation.landscape
                    break
                default:
                    orientation = KakaoSDKFriend.PickerOrientation.auto
                }
            } else {
                orientation = nil
            }
            params = OpenPickerFriendRequestParams(
                title: dic["title"] as? String,
                serviceTypeFilter: serviceTypeFilter,
                viewAppearance: viewAppearance,
                orientation: orientation,
                enableSearch: dic["enableSearch"] as? Bool,
                enableIndex: dic["enableIndex"] as? Bool,
                showMyProfile: dic["showMyProfile"] as? Bool,
                showFavorite: dic["showFavorite"] as? Bool,
                showPickedFriend: dic["showPickedFriend"] as? Bool,
                maxPickableCount: dic["maxPickableCount"] as? Int,
                minPickableCount: dic["minPickableCount"] as? Int
            )
        } else {
            params = OpenPickerFriendRequestParams()
        }
    }
}
