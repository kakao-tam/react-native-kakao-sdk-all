import type { SectionListData } from "react-native";
import KakaoSdk, {
    AuthApi,
    FeedTemplate,
    LinkApi,
    NaviApi,
    PickerApi, StoryApi,
    TalkApi,
    UserApi
} from "react-native-kakao-sdk-all";
import * as ImagePicker from "react-native-image-picker";

const sampleFeedTemplate = FeedTemplate({
        content: {
            title: '딸기 치즈 케익',
            description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
            imageUrl: 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            link: {
                mobileWebUrl: 'https://developers.kakao.com',
                webUrl: 'https://developers.kakao.com'
            }
        },
        social: {
            likeCount: 286,
            commentCount: 45,
            sharedCount: 845
        },
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com',
                },
            },
            {
                title: '앱으로 보기',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com',
                },
            },
        ]
    }
)

export interface ICallApi {
    name: string;
    desc?: string;
    exec: (log: (log: string | object, type?: string) => void) => Promise<any>;
    case?: ICallApi[];
}

const ApiSample: SectionListData<ICallApi>[] = [
    {
        key: 'KakaoSDK',
        data: [
            {
                name: 'init',
                exec: () => KakaoSdk.init()
            },
            {
                name: 'isInitialized',
                exec: () => KakaoSdk.isInitialized()
            }
        ]
    },
    {
        key: 'AuthApi',
        data: [
            {
                name: 'hasToken',
                exec: () => AuthApi.hasToken()
            },
            {
                name: 'refreshToken',
                exec: () => AuthApi.refreshToken()
            }
        ]
    },
    {
        key: "UserApiClient",
        data: [
            {
                name: 'accessTokenInfo',
                exec: () => UserApi.accessTokenInfo()
            },
            {
                name: 'isKakaoTalkLoginAvailable',
                exec: () => UserApi.isKakaoTalkLoginAvailable()

            },
            {
                name: 'loginWithKakaoAccount',
                exec: () => UserApi.loginWithKakaoAccount()

            },
            {
                name: 'loginWithKakaoTalk',
                exec: () => UserApi.loginWithKakaoTalk()
            },
            {
                name: 'logout',
                exec: () => UserApi.logout()

            },
            {
                name: 'me',
                exec: () => UserApi.me()

            },
            {
                name: 'revokeScopes',
                exec: (log) => {
                    let param: RevokeScopesParam = {
                        scopes: ["age_range"]
                    }
                    log(param, 'REQ');
                    return UserApi.revokeScopes(param)
                }
            },
            {
                name: 'scopes',
                exec: () => UserApi.scopes()

            },
            {
                name: 'serviceTerms',
                exec: () => UserApi.serviceTerms()

            },
            {
                name: 'shippingAddresses',
                exec: () => UserApi.shippingAddresses({ fromUpdateAt: new Date() })

            },
            {
                name: 'signup',
                exec: () => UserApi.signup()

            },
            {
                name: 'unlink',
                exec: () => UserApi.unlink()
            },
            {
                name: 'updateProfile',
                exec: (log) => {
                    let param: UpdateProfileParam = {
                        properties: {
                            test: 'test value'
                        }
                    }
                    log(param, 'REQ')
                    return UserApi.updateProfile(param)
                }
            }
        ]
    },
    {
        key: 'PickerApi',
        data: [
            {
                name: 'selectFriend',
                exec: () => PickerApi.selectFriend()
            },
            {
                name: 'selectedFriendPopup',
                exec: () => PickerApi.selectFriendPopup()
            },
            {
                name: 'selectFriends',
                exec: () => PickerApi.selectFriends()
            },
            {
                name: 'selectedFriendsPopup',
                exec: () => PickerApi.selectFriendsPopup()
            }
        ]
    },
    {
        key: 'TalkApi',
        data: [
            {
                name: 'addChannelUrl',
                exec: (log) => {
                    let param: AddChannelParam = {
                        channelPublicId: '_xgTNZs'
                    }
                    log(param, 'REQ');
                    return TalkApi.addChannelUrl(param)
                }
            },
            {
                name: 'channelChatUrl',
                exec: (log) => {
                    let param: ChannelChatParam = {
                        channelPublicId: '_xgTNZs'
                    }
                    log(param, 'REQ')
                    return TalkApi.channelChatUrl(param)
                }
            },
            {
                name: 'channels',
                exec: () => TalkApi.channels()
            },
            {
                name: 'friends',
                exec: (log) => {
                    let param: FriendsParam = {
                        friendOrder: "nickname",
                        order: "asc",
                        limit: 100,
                        offset: 0
                    }
                    log(param, 'REQ')
                    return TalkApi.friends(param)
                }
            },
            {
                name: 'profile',
                exec: () => TalkApi.profile()
            },
            {
                name: 'sendCustomMemo',
                exec: (log) => {
                    let param: SendCustomMemoParam = {
                        templateId: 76406,
                        templateArgs: {
                            profile: '- sendCustomMemo'
                        }
                    }
                    log(param, 'REQ')
                    return TalkApi.sendCustomMemo(param)
                }
            },
            {
                name: 'sendDefaultMemo',
                exec: (log) => {
                    let param: SendDefaultMemoParam = {
                        templatable: sampleFeedTemplate
                    }
                    log(param, 'REQ')
                    return TalkApi.sendDefaultMemo(param)
                }
            },
            {
                name: 'sendScrapMemo',
                exec: (log) => {
                    let param: SendScrapMemoParam = {
                        requestUrl: 'https://developers.kakao.com'
                    }
                    log(param, 'REQ')
                    return TalkApi.sendScrapMemo(param)
                }
            },
            {
                name: 'sendCustomMessage',
                exec: async (log) => {
                    let friends = await PickerApi.selectFriends()
                    if (friends && friends.totalCount > 0 && friends.users) {
                        let param: SendCustomMessageParam = {
                            receiverUuids: friends.users.map(v => v.uuid),
                            templateId: 76406,
                            templateArgs: {
                                profile: '- sendCustomMessage'
                            }
                        }
                        log(param, 'REQ')
                        return TalkApi.sendCustomMessage(param);
                    }
                    return Promise.reject("friends empty")
                }
            },
            {
                name: 'sendDefaultMessage',
                exec: async (log) => {
                    let friends = await PickerApi.selectFriends()
                    if (friends && friends.totalCount > 0 && friends.users) {
                        let param: SendDefaultMessageParam = {
                            receiverUuids: friends.users.map(v => v.uuid),
                            templatable: sampleFeedTemplate
                        }
                        log(param, 'REQ')
                        return TalkApi.sendDefaultMessage(param)
                    }
                    return Promise.reject("friends empty")
                }
            },
            {
                name: 'sendScrapMessage',
                exec: async (log) => {
                    let friends = await PickerApi.selectFriends()
                    if (friends && friends.totalCount > 0 && friends.users) {
                        let param: SendScrapMessageParam = {
                            receiverUuids: friends.users.map(v => v.uuid),
                            requestUrl: 'https://developers.kakao.com'
                        }
                        log(param, 'REQ')
                        return TalkApi.sendScrapMessage(param);
                    }
                    return Promise.reject("friends empty")
                }
            }
        ]
    },
    {
        key: "LinkApi",
        data: [
            {
                name: 'customTemplate',
                exec: (log) => {
                    let param: CustomTemplateParam = {
                        templateId: 76406,
                        templateArgs: {
                            profile: '- customTemplate'
                        }
                    }
                    log(param, 'REQ')
                    return LinkApi.customTemplate(param)
                }
            },
            {
                name: 'defaultTemplate',
                exec: (log) => {
                    let param: DefaultTemplateParam = {
                        templateObject: FeedTemplate({
                            content: {
                                title: '베리베리 치즈 케익',
                                description: '#케익 #딸기 #블루베리 #카페 #디저트 #달달함 #분위기 #삼평동',
                                imageUrl:
                                    'http://k.kakaocdn.net/dn/bDgfik/btqwQWk4CRU/P6wNJJiQ3Ko21KNE1TiLw1/kakaolink40_original.png',
                                link: {
                                    mobileWebUrl: 'https://developers.kakao.com',
                                    webUrl: 'https://developers.kakao.com',
                                }
                            }
                        })
                    }
                    log(param, 'REQ')
                    return LinkApi.defaultTemplate(param)
                }
            },
            {
                name: 'scrapImage',
                exec: (log) => {
                    let param: ScrapImageParam = {
                        imageUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
                    }
                    log(param, 'REQ')
                    return LinkApi.scrapImage(param)
                }
            },
            {
                name: 'scrapTemplate',
                exec: (log) => {
                    let param: ScrapTemplateParam = {
                        requestUrl: 'https://developers.kakao.com'
                    }
                    log(param, 'REQ')
                    return LinkApi.scrapTemplate(param)
                }
            },
            {
                name: 'uploadImage',
                exec: async (log) => {
                    let imgObj = await ImagePicker.launchImageLibrary({
                        mediaType: 'photo'
                    })
                    let param: UploadImageParam = {
                        image: imgObj.assets?.[0].uri || ''
                    }
                    log(param, 'REQ')
                    return LinkApi.uploadImage(param)
                }
            }
        ]
    },
    {
        key: 'NaviApi',
        data: [
            {
                name: 'shareUrl',
                exec: (log) => {
                    let param: NaviUrlParam = {
                        destination: {
                            name: "카카오판교오피스",
                            x: "321286",
                            y: "533707"
                        },
                        option: {
                            rpOption: "1",
                            coordType: "katec",
                            vehicleType: "1"
                        }
                    }
                    log(param, 'REQ')
                    return NaviApi.shareUrl(param)
                }
            },
            {
                name: 'navigateUrl',
                exec: (log) => {
                    let param: NaviUrlParam = {
                        destination: {
                            name: "카카오판교오피스",
                            x: "321286",
                            y: "533707"
                        }
                    }
                    log(param, 'REQ')
                    return NaviApi.navigateUrl(param)
                }
            }
        ]
    },
    {
        key: 'StoryApi',
        data: [
            {
                name: 'isStoryUser',
                exec: () => StoryApi.isStoryUser()
            },
            {
                name: 'linkInfo',
                exec: (log) => {
                    let param: LinkInfoParam = {
                        url: 'https://developers.kakao.com'
                    }
                    log(param, 'REQ')
                    return StoryApi.linkInfo(param)
                }
            },
            {
                name: 'postLink',
                exec: async (log) => {
                    let linkInfoParam: LinkInfoParam = {
                        url: 'https://developers.kakao.com'
                    }
                    let linkInfo = await StoryApi.linkInfo(linkInfoParam)
                    let param: PostLinkParam = {
                        content: "컨",
                        permission: "M",
                        linkInfo: linkInfo
                    }
                    log(param, 'REQ')
                    return StoryApi.postLink(param)
                }
            },
            {
                name: 'postNote',
                exec: (log) => {
                    let param: PostNoteParam = {
                        content: "PostNote Test",
                        permission: 'M'
                    }
                    log(param, 'REQ')
                    return StoryApi.postNote(param)
                }
            },
            {
                name: 'postPhoto',
                exec: (log) => {
                    let param: PostPhotoParam = {
                        content: '',
                        permission: 'M',
                        imagePaths: ['/8KgWu/hyOCCCDole/kUbrIgTwnbzhxtIk3go0q0/img.jpg?width=1365&height=2048']
                    }
                    log(param, 'REQ')
                    return StoryApi.postPhoto(param)
                }
            },
            {
                name: 'profile',
                exec: () => StoryApi.profile()
            },
            {
                name: 'stories',
                exec: () => StoryApi.stories()
            },
            {
                name: 'story',
                exec: (log) => {
                    let param: StoryParam = {
                        id: '_KW0Ez0.iXTLMc9xM4a'
                    }
                    log(param, 'REQ')
                    return StoryApi.story(param)
                }
            },
            {
                name: 'upload',
                exec: async (log) => {
                    let imgObj = await ImagePicker.launchImageLibrary({
                        mediaType: 'photo'
                    })
                    let param: StoryUploadParam = {
                        images: [imgObj.assets?.[0].uri || '']
                    }
                    log(param, 'REQ')
                    return StoryApi.upload(param)
                }
            },
            {
                name: 'delete',
                exec: (log) => {
                    let param: DeleteStoryParam = {
                        id: "_KW0Ez0.2PPdzc5vk19"
                    }
                    log(param, 'REQ')
                    return StoryApi.delete(param)
                }
            }
        ]
    }
]

export default ApiSample
