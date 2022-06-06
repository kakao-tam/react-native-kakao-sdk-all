import { NativeModules, Platform } from 'react-native';
import { Cleanser, CleanserRequest } from "./cleanser";

const LINKING_ERROR =
    `The package 'react-native-kakao-sdk-all' doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo managed workflow\n';

const LINKING_ERROR_PROXY = (name: String) => {
    return new Proxy({}, {
        get() {
            console.error(name + " Linking Error")
            throw new Error(LINKING_ERROR)
        }
    })
}

const KakaoSdkCommonModule = NativeModules.KakaoSdkCommonModule
    ? NativeModules.KakaoSdkCommonModule
    : LINKING_ERROR_PROXY('KakaoSdkCommonModule');

const AuthApiClientModule = NativeModules.AuthApiClientModule
    ? NativeModules.AuthApiClientModule
    : LINKING_ERROR_PROXY('AuthApiClientModule');

const UserApiClientModule = NativeModules.UserApiClientModule
    ? NativeModules.UserApiClientModule
    : LINKING_ERROR_PROXY('UserApiClientModule');

const PickerApiClientModule = NativeModules.PickerApiClientModule
    ? NativeModules.PickerApiClientModule
    : LINKING_ERROR_PROXY('PickerApiClientModule');

const TalkApiClientModule = NativeModules.TalkApiClientModule
    ? NativeModules.TalkApiClientModule
    : LINKING_ERROR_PROXY('TalkApiClientModule');

const LinkApiClientModule = NativeModules.LinkApiClientModule
    ? NativeModules.LinkApiClientModule
    : LINKING_ERROR_PROXY('LinkApiClientModule');

const NaviApiClientModule = NativeModules.NaviApiClientModule
    ? NativeModules.NaviApiClientModule
    : LINKING_ERROR_PROXY('NaviApiClientModule');

const StoryApiClientModule = NativeModules.StoryApiClientModule
    ? NativeModules.StoryApiClientModule
    : LINKING_ERROR_PROXY('StoryApiClientModule');

const getParam = <T, >(param?: T, defaultParam?: T, noargs?: boolean): any => {
    if (!noargs) {
        return [{"_json_": JSON.stringify({...defaultParam, ...param})}]
    }
    return []
}

type ReactMethod = (param: any) => Promise<string>;

interface TaskOptions<Param, Result> {
    cleanser?: (obj: Result) => void;
    cleanserRequest?: (param: Param) => void;
    isPrimitiveResult?: boolean;
    noarg?: boolean;
}

const Task = <Param, Result>(promise: ReactMethod, taskOptions?: TaskOptions<Param, Result>): (param?: Param) => Promise<Result> => {
    return async (param?: Param): Promise<Result> => {
        if (taskOptions?.cleanserRequest && param) {
            taskOptions.cleanserRequest(param)
        }
        const p = getParam(param, {}, taskOptions?.noarg)
        console.debug("req: ", p)
        return promise.apply(this, p).then((rawValue) => {
            console.debug("res-origin: ", rawValue)
            const result = (taskOptions?.isPrimitiveResult ? rawValue : JSON.parse(rawValue)) as Result;
            if (taskOptions?.cleanser) {
                taskOptions.cleanser(result)
            }
            console.debug("res: ", result);
            return result
        }).catch((error) => {
            console.debug(JSON.stringify(error))
            throw error
        });
    }
}

export const FeedTemplate = (param: FeedTemplate): FeedTemplate => {
    (param as any)['objectType'] = 'feed'
    return param
}

export const ListTemplate = (param: ListTemplate): ListTemplate => {
    (param as any)['objectType'] = 'list'
    return param
}

export const LocationTemplate = (param: LocationTemplate): LocationTemplate => {
    (param as any)['objectType'] = 'location'
    return param
}

export const CommerceTemplate = (param: CommerceTemplate): CommerceTemplate => {
    (param as any)['objectType'] = 'commerce'
    return param
}

export const TextTemplate = (param: TextTemplate): TextTemplate => {
    (param as any)['objectType'] = 'text'
    return param
}

const KakaoSDK: IKakaoSdk = {
    init: Task<InitParam, boolean>(KakaoSdkCommonModule.init),
    isInitialized: Task<undefined, boolean>(KakaoSdkCommonModule.isInitialized, {isPrimitiveResult: true, noarg: true})
}

export const UserApi: IUserApi = {
    accessTokenInfo: Task<undefined, AccessTokenInfo>(UserApiClientModule.accessTokenInfo, {noarg: true}),
    certLoginWithKakaoAccount: Task<CertLoginWithKakaoAccountParam, CertTokenInfo>(UserApiClientModule.certLoginWithKakaoAccount, {
        cleanser: Cleanser.certTokenInfo
    }),
    certLoginWithKakaoTalk: Task<CertLoginWithKakaoTalkParam, CertTokenInfo>(UserApiClientModule.certLoginWithKakaoTalk, {
        cleanser: Cleanser.certTokenInfo
    }),
    isKakaoTalkLoginAvailable: Task<undefined, boolean>(UserApiClientModule.isKakaoTalkLoginAvailable, {
        isPrimitiveResult: true,
        noarg: true
    }),
    loginWithKakaoAccount: Task<LoginWithKakaoAccountParam, OAuthToken>(UserApiClientModule.loginWithKakaoAccount, {
        cleanser: Cleanser.oauthToken
    }),
    loginWithKakaoTalk: Task<LoginWithKakaoTalkParam, OAuthToken>(UserApiClientModule.loginWithKakaoTalk, {
        cleanser: Cleanser.oauthToken
    }),
    logout: Task<undefined, boolean>(UserApiClientModule.logout, {isPrimitiveResult: true, noarg: true}),
    me: Task<MeParam, User>(UserApiClientModule.me, {
        cleanser: Cleanser.user
    }),
    revokeScopes: Task<RevokeScopesParam, ScopeInfo>(UserApiClientModule.revokeScopes),
    scopes: Task<ScopesParam, ScopeInfo>(UserApiClientModule.scopes),
    serviceTerms: Task<ServiceTermsParam, UserServiceTerms>(UserApiClientModule.serviceTerms, {cleanser: Cleanser.serviceTerms}),
    shippingAddresses: Task<ShippingAddressesParam, UserShippingAddresses>(UserApiClientModule.shippingAddresses, {
        cleanser: Cleanser.shippingAddresses,
        cleanserRequest: CleanserRequest.shippingAddresses
    }),
    signup: Task<SignupParam, boolean>(UserApiClientModule.signup, {isPrimitiveResult: true}),
    unlink: Task<undefined, boolean>(UserApiClientModule.unlink, {isPrimitiveResult: true, noarg: true}),
    updateProfile: Task<UpdateProfileParam, boolean>(UserApiClientModule.updateProfile)
}

export const AuthApi: IAuthApi = {
    hasToken: Task<undefined, boolean>(AuthApiClientModule.hasToken, {noarg: true}),
    refreshToken: Task<undefined, OAuthToken>(AuthApiClientModule.refreshToken, {
        cleanser: Cleanser.oauthToken,
        noarg: true
    })
}

export const PickerApi: IPickerApi = {
    selectFriend: Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriend),
    selectFriendPopup: Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriendPopup),
    selectFriends: Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriends),
    selectFriendsPopup: Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriendsPopup),
}

export const TalkApi: ITalkApi = {
    addChannelUrl: Task<AddChannelParam, string>(TalkApiClientModule.addChannelUrl, {isPrimitiveResult: true}),
    channelChatUrl: Task<ChannelChatParam, string>(TalkApiClientModule.channelChatUrl, {isPrimitiveResult: true}),
    channels: Task<ChannelParam, Channels>(TalkApiClientModule.channels, {cleanser: Cleanser.channels}),
    friends: Task<FriendsParam, Friends>(TalkApiClientModule.friends),
    profile: Task<undefined, TalkProfile>(TalkApiClientModule.profile, {noarg: true}),
    sendCustomMemo: Task<SendCustomMemoParam, boolean>(TalkApiClientModule.sendCustomMemo, {isPrimitiveResult: true}),
    sendDefaultMemo: Task<SendDefaultMemoParam, boolean>(TalkApiClientModule.sendDefaultMemo, {isPrimitiveResult: true}),
    sendScrapMemo: Task<SendScrapMemoParam, boolean>(TalkApiClientModule.sendScrapMemo, {isPrimitiveResult: true}),
    sendCustomMessage: Task<SendCustomMessageParam, MessageSendResult>(TalkApiClientModule.sendCustomMessage),
    sendDefaultMessage: Task<SendDefaultMessageParam, MessageSendResult>(TalkApiClientModule.sendDefaultMessage),
    sendScrapMessage: Task<SendScrapMessageParam, MessageSendResult>(TalkApiClientModule.sendScrapMessage)
}

export const LinkApi: ILinkApi = {
    customTemplate: Task<CustomTemplateParam, LinkResult>(LinkApiClientModule.customTemplate),
    defaultTemplate: Task<DefaultTemplateParam, LinkResult>(LinkApiClientModule.defaultTemplate),
    scrapImage: Task<ScrapImageParam, ImageUploadResult>(LinkApiClientModule.scrapImage),
    scrapTemplate: Task<ScrapTemplateParam, LinkResult>(LinkApiClientModule.scrapTemplate),
    uploadImage: Task<UploadImageParam, ImageUploadResult>(LinkApiClientModule.uploadImage)
}

export const NaviApi: INaviApi = {
    shareUrl: Task<NaviUrlParam, string>(NaviApiClientModule.shareUrl, {isPrimitiveResult: true}),
    navigateUrl: Task<NaviUrlParam, string>(NaviApiClientModule.navigateUrl, {isPrimitiveResult: true})
}

export const StoryApi: IStoryApi = {
    delete: Task<DeleteStoryParam, boolean>(StoryApiClientModule.delete, {isPrimitiveResult: true}),
    isStoryUser: Task<undefined, boolean>(StoryApiClientModule.isStoryUser, {isPrimitiveResult: true, noarg: true}),
    linkInfo: Task<LinkInfoParam, LinkInfo>(StoryApiClientModule.linkInfo),
    postLink: Task<PostLinkParam, string>(StoryApiClientModule.postLink, {isPrimitiveResult: true}),
    postNote: Task<PostNoteParam, string>(StoryApiClientModule.postNote, {isPrimitiveResult: true}),
    postPhoto: Task<PostPhotoParam, string>(StoryApiClientModule.postPhoto, {isPrimitiveResult: true}),
    profile: Task<ProfileParam, StoryProfile>(StoryApiClientModule.profile),
    stories: Task<StoriesParam, Story[]>(StoryApiClientModule.stories),
    story: Task<StoryParam, Story>(StoryApiClientModule.story),
    upload: Task<StoryUploadParam, string[]>(StoryApiClientModule.upload)
}
export default KakaoSDK;
