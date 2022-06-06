//
//  RequestParams.swift
//  react-native-kakao-sdk-all
//
//  Created by kakao-tam on 2022/05/06.
//

import KakaoSDKCommon

struct InitSdkParam : Decodable {
    var appKey: String
    var customScheme: String?
    var loggingEnable: Bool
    var hosts: Hosts?
    var approvalType: ApprovalType?
    
    enum CodingKeys : String, CodingKey {
        case appKey, customScheme, loggingEnable, hosts, approvalType
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        appKey = (try? values.decode(String.self, forKey: .appKey)) ?? (Bundle.main.object(forInfoDictionaryKey: "KAKAO_NATIVE_APP_KEY") as? String ?? "nil")
        customScheme = try? values.decode(String.self, forKey: .customScheme)
        loggingEnable = (try? values.decode(Bool.self, forKey: .loggingEnable)) ?? false
        if let dic = try? values.decode([String: String].self, forKey: .hosts) {
            hosts = Hosts(kapi: dic["kapi"] ?? Hosts.shared.kapi,
                          dapi: dic["dapi"] ?? Hosts.shared.dapi,
                          auth: dic["auth"] ?? Hosts.shared.auth,
                          kauth: dic["kauth"] ?? Hosts.shared.kauth,
                          talkAuth: dic["talkAuth"] ?? Hosts.shared.talkAuth,
                          channel: dic["channel"] ?? Hosts.shared.channel,
                          talkLink: dic["talkLink"] ?? Hosts.shared.talkLink,
                          talkLinkVersion: dic["talkLinkVersion"] ?? Hosts.shared.talkLinkVersion,
                          sharerLink: dic["sharerLink"] ?? Hosts.shared.sharerLink)
        } else {
            hosts = nil
        }
        if let str = try? values.decode(String.self, forKey: .approvalType) {
            approvalType = ApprovalType()
            approvalType?.type = str
        } else {
            approvalType = nil
        }
    }
}
