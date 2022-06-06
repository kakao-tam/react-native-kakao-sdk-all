//
//  RequestParams.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao on 2022/05/23.
//

import KakaoSDKAuth
import KakaoSDKUser

struct LoginParam : Decodable {
    var prompts: [Prompt]?
    var state: String?
    var nonce: String?
    var loginHint: String?
    var channelPublicIds: [String]?
    var serviceTerms: [String]?
    var scopes: [String]?
    
    enum CodingKeys : String, CodingKey {
        case prompts, state, nonce, loginHint, channelPublicIds, serviceTerms, scopes
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        prompts = (try? values.decode([String].self, forKey: .prompts))?.compactMap { Prompt(rawValue: $0) }
        state = try? values.decode(String.self, forKey: .state)
        nonce = try? values.decode(String.self, forKey: .nonce)
        loginHint = try? values.decode(String.self, forKey: .loginHint)
        channelPublicIds = try? values.decode([String].self, forKey: .channelPublicIds)
        serviceTerms = try? values.decode([String].self, forKey: .serviceTerms)
        scopes = try? values.decode([String].self, forKey: .scopes)
    }
}

struct MeParam : Decodable {
    var propertyKeys: [String]?
    var secureResource: Bool
    
    enum CodingKeys : String, CodingKey {
        case propertyKeys, secureResource
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        propertyKeys = try? values.decode([String].self, forKey: .propertyKeys)
        secureResource = (try? values.decode(Bool.self, forKey: .secureResource)) ?? true
    }
}

struct ScopesParam: Decodable {
    var scopes: [String]?
}

struct ServiceTermsParam: Decodable {
    var extra: String?
}

struct ShippingAddressesParam : Decodable {
    var addressId: Int64?
    var fromUpdatedAt: Int?
    var pageSize: Int?
    
    enum CodingKeys : String, CodingKey {
        case addressId, fromUpdatedAt, pageSize
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        addressId = try? values.decode(Int64.self, forKey: .addressId)
        if let int = try? values.decode(Int64.self, forKey: .fromUpdatedAt) {
            fromUpdatedAt = Int(truncatingIfNeeded: (int / 1000))
        } else {
            fromUpdatedAt = nil
        }
        pageSize = try? values.decode(Int.self, forKey: .pageSize)
    }
}

struct SignupParam : Decodable {
    var properties: [String:String]?
}

struct UpdateProfileParam : Decodable {
    var properties: [String:Any]?
    
    enum CodingKeys : String, CodingKey {
        case properties
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        properties = try? values.decode([String:Any].self, forKey: .properties)
    }
}
