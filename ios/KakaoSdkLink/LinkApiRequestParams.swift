//
//  RequestParams.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import KakaoSDKLink

struct CustomTemplateParam : Decodable {
    var templateId: Int64
    var templateArgs: [String:String]?
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case templateId, templateArgs, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        templateId = (try? values.decode(Int64.self, forKey: .templateId)) ?? 0
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
    }
}

struct DefaultTemplateParam : Decodable {
    var templateObject: [String:Any]
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case templateObject, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        templateObject = (try? values.decode([String:Any].self, forKey: .templateObject)) ?? [:]
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
    }
}

struct ScrapImageParam : Decodable {
    var imageUrl: URL
    var secureResource: Bool
    
    enum CodingKeys: String, CodingKey {
        case imageUrl, secureResource
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        imageUrl = URL(string: (try? values.decode(String.self, forKey: .imageUrl)) ?? "")!
        secureResource = (try? values.decode(Bool.self, forKey: .secureResource)) ?? true
    }
}

struct ScrapTemplateParam : Decodable {
    var requestUrl: String
    var templateId: Int64?
    var templateArgs: [String:String]?
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case requestUrl, templateId, templateArgs, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        requestUrl = (try? values.decode(String.self, forKey: .requestUrl)) ?? ""
        templateId = try? values.decode(Int64.self, forKey: .templateId)
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
    }
}

struct UploadImageParam : Decodable {
    var image: UIImage
    var secureResource : Bool
    
    enum CodingKeys: String, CodingKey {
        case image, secureResource
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        image = ((try? values.decode(String.self, forKey: .image))?.toUIImage())!
        secureResource = (try? values.decode(Bool.self, forKey: .secureResource)) ?? true
    }
}
