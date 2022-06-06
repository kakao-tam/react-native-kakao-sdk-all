//
//  ReactParamTo.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser
import KakaoSDKTalk
import KakaoSDKTemplate
import KakaoSDKNavi
import KakaoSDKStory
import KakaoSDKFriend
import UIKit

extension Error {
    func rnCode() -> String {
        if let e = self as? SdkError {
            if e.isAuthFailed {
                return "\(e.getAuthError().reason.rawValue)"
            }
            if e.isClientFailed {
                return "\(e.getClientError().reason)"
            }
            if e.isApiFailed {
                return "\(e.getApiError().reason.rawValue)"
            }
        }
        return "UnknownError"
    }
    
    func rnMessage() -> String {
        if let e = self as? SdkError {
            if e.isAuthFailed {
                if let msg = e.getAuthError().info?.errorDescription {
                    return msg
                }
            }
            if e.isClientFailed {
                if let msg = e.getClientError().message {
                    return msg
                }
            }
            if e.isApiFailed {
                if let msg = e.getApiError().info?.msg {
                    return msg
                }
            }
        }
        return self.localizedDescription
    }
}

extension NSDictionary {
    private func string(_ key: String,_ defaultValue: String? = nil) -> String? {
        if let data = self[key] {
            return data as? String
        }
        return defaultValue
    }
    
    private func boolean(_ key: String,_ defaultValue: Bool? = nil) -> Bool? {
        if let data = self[key] {
            return data as? Bool
        }
        return defaultValue
    }
    
    private func date(_ key: String, _ defaultValue: Date? = nil) -> Date? {
        if let data = self[key] as? NSNumber {
            return Date(timeIntervalSince1970: TimeInterval(truncating: data) / 1000)
        }
        return defaultValue
    }
    
    private func int(_ key: String, _ defaultValue: Int? = nil) -> Int? {
        if let data = self[key] as? Int {
            return data
        }
        return defaultValue
    }
    
    private func int64(_ key: String, _ defaultValue: Int64? = nil) -> Int64? {
        if let data = self[key] as? Int64 {
            return data
        }
        return defaultValue
    }
    
    private func dic(_ key: String) -> NSDictionary? {
        if let data =  self[key] {
            return data as? NSDictionary
        }
        return nil
    }
    
    private func array(_ key: String) -> NSArray? {
        if let data = self[key] {
            return data as? NSArray
        }
        return nil
    }
    
    private func stringArray(_ key: String) -> [String]? {
        if let data = self.array("propertyKeys") {
            return data.compactMap{( $0 as? String ?? "" )}
        }
        return nil
    }
    
    func toParam<T: Decodable>(_ t: T.Type, key: String = "_json_") -> T? {
        if let data = self.string(key)?.data(using: .utf8) {
            return try? SdkJSONDecoder.default.decode(T.self, from: data)
        }
        return nil
    }
}

internal extension String {
    func toUIImage() -> UIImage? {
        if self.hasPrefix("file://") {
            if let url = URL(string: self) {
                if let imageData = try? Data(contentsOf: url) {
                    return UIImage(data:imageData)
                }
            }
        }
        if self.hasPrefix("data:image/") {
            if let url = URL(string: self) {
                if let imageData = try? Data(contentsOf: url) {
                    return UIImage(data: imageData)
                }
            }
        } else {
            if let imageData = Data(base64Encoded: self) {
                return UIImage(data: imageData)
            }
        }
        return nil
    }
}

class TemplatableUtil {
    enum CodingKeys: String, CodingKey {
        case templatable, objectType
    }
    
    static func toTemplatable(decoder: Decoder) -> Templatable? {
        if let values = try? decoder.container(keyedBy: CodingKeys.self) {
            if let templatableValues = try? values.nestedContainer(keyedBy: CodingKeys.self, forKey: .templatable) {
                let objectType = try? templatableValues.decode(String.self, forKey: .objectType)
                switch objectType {
                case "feed":
                    return try? values.decode(FeedTemplate.self, forKey: .templatable)
                case "list":
                    return try? values.decode(ListTemplate.self, forKey: .templatable)
                case "location":
                    return try? values.decode(LocationTemplate.self, forKey: .templatable)
                case "commerce":
                    return try? values.decode(CommerceTemplate.self, forKey: .templatable)
                case "text":
                    return try? values.decode(TextTemplate.self, forKey: .templatable)
                default:
                    return nil
                }
            }
        }
        return nil
    }
}
