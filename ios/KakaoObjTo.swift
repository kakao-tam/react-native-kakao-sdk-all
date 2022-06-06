//
//  KakaoObjTo.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKLink
import KakaoSDKFriend

private class Converter {
    static let shared = Converter()
    
    let encoder: JSONEncoder;
    
    private init() {
        encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .custom({ date, encoder in
            var container = encoder.singleValueContainer()
            let mils = (date.timeIntervalSince1970 + Double(TimeZone.current.secondsFromGMT())) * 1000.0
            try container.encode(Int64(mils.rounded()))
        })
    }
    
    func toJson(_ dic: [String:Any]) -> String {
        do {
            let jsonData = try JSONSerialization.data(withJSONObject: dic)
            return String(data: jsonData, encoding: String.Encoding.utf8) ?? "{}"
        } catch {
            return "!e{\"desc\":\"\(error.localizedDescription)\",\"msg\":\"\(error)\"}"
        }
    }
}

extension Encodable {
    func toJsonString() -> String {
        do {
            let jsonData = try Converter.shared.encoder.encode(self)
            return String(data: jsonData, encoding: String.Encoding.utf8) ?? "{}"
        } catch {
            return "!e{\"desc\":\"\(error.localizedDescription)\",\"msg\":\"\(error)\"}"
        }
    }
}

extension LinkResult {
    func toJsonString() -> String {
        return Converter.shared.toJson(
            [
                "url": self.url.absoluteString,
                "warningMsg": self.warningMsg ?? NSNull(),
                "argumentMsg": self.argumentMsg ?? NSNull()
            ]
        )
    }
}

extension SelectedUsers {
    func toJsonString() -> String {
        return Converter.shared.toJson(
            [
                "totalCount": self.totalCount,
                "users": self.users?.toDic() ?? NSNull(),
            ]
        )
    }
}

extension Array where Element == SelectedUser {
    func toDic() -> [[String:Any]] {
        return self.compactMap { $0.toDic() }
    }
}

extension SelectedUser {
    func toDic() -> [String:Any] {
        return [
            "id": self.id ?? NSNull(),
            "uuid": self.uuid,
            "profileNickname": self.profileNickname ?? NSNull(),
            "profileThumbnailImage": self.profileThumbnailImage?.absoluteString ?? NSNull(),
            "favorite": self.favorite ?? NSNull()
        ]
    }
}
