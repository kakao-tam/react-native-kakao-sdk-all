//
//  RequestParams.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import KakaoSDKTalk
import KakaoSDKTemplate

struct AddChannelParam: Decodable {
    var channelPublicId: String
    
    enum CodingKeys: String, CodingKey {
        case channelPublicId
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        channelPublicId = (try? values.decode(String.self, forKey: .channelPublicId)) ?? "nil"
    }
}

struct ChannelChatParam : Decodable {
    var channelPublicId: String
    
    enum CodingKeys: String, CodingKey {
        case channelPublicId
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        channelPublicId = (try? values.decode(String.self, forKey: .channelPublicId)) ?? "nil"
    }
}

struct ChannelsParam : Decodable {
    var publicIds: [String]?
}

struct FriendsParam : Decodable {
    var offset: Int?
    var limit: Int?
    var order: Order?
    var friendOrder: FriendOrder?
    
    enum CodingKeys: String, CodingKey {
        case offset, limit, order, friendOrder
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        offset = try? values.decode(Int.self, forKey: .offset)
        limit = try? values.decode(Int.self, forKey: .limit)
        if let orderStr = try? values.decode(String.self, forKey: .order) {
            order = Order(rawValue: orderStr)
        } else {
            order = nil
        }
        if let friendOrderStr = try? values.decode(String.self, forKey: .friendOrder) {
            friendOrder = FriendOrder(rawValue: friendOrderStr)
        } else {
            friendOrder = nil
        }
    }
}

struct SendCustomMemoParam : Decodable {
    var templateId: Int64
    var templateArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case templateId, templateArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        templateId = (try? values.decode(Int64.self, forKey: .templateId)) ?? 0
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
    }
}

struct SendDefaultMemoParam : Decodable {
    var templatable: Templatable
    
    init(from decoder: Decoder) throws {
        templatable = TemplatableUtil.toTemplatable(decoder: decoder)!
    }
}

struct SendScrapMemoParam : Decodable {
    var requestUrl: String
    var templateId: Int64?
    var templateArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case requestUrl, templateId, templateArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        requestUrl = (try? values.decode(String.self, forKey: .requestUrl)) ?? "nil"
        templateId = try? values.decode(Int64.self, forKey: .templateId)
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
    }
}

struct SendCustomMessageParam : Decodable {
    var templateId: Int64
    var templateArgs: [String:String]?
    var receiverUuids: [String]
    
    enum CodingKeys: String, CodingKey {
        case templateId, templateArgs, receiverUuids
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        templateId = (try? values.decode(Int64.self, forKey: .templateId)) ?? 0
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
        receiverUuids = (try? values.decode([String].self, forKey: .receiverUuids)) ?? []
    }
}

struct SendDefaultMessageParam : Decodable {
    var templatable: Templatable
    var receiverUuids: [String]
    
    enum CodingKeys: String, CodingKey {
        case templatable, receiverUuids, objectType
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        receiverUuids = (try? values.decode([String].self, forKey: .receiverUuids)) ?? []
        templatable = TemplatableUtil.toTemplatable(decoder: decoder)!
    }
}

struct SendScrapMessageParam : Decodable {
    var requestUrl: String
    var templateId: Int64?
    var templateArgs: [String:String]?
    var receiverUuids: [String]
    
    enum CodingKeys: String, CodingKey {
        case requestUrl, templateId, templateArgs, receiverUuids
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        requestUrl = (try? values.decode(String.self, forKey: .requestUrl)) ?? ""
        templateId = try? values.decode(Int64.self, forKey: .templateId)
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
        receiverUuids = (try? values.decode([String].self, forKey: .receiverUuids)) ?? []
    }
}
