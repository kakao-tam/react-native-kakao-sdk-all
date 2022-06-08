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

// 카카오톡 API
export class TalkApi {
    // 채널 추가 URL
    public static addChannelUrl = Task<AddChannelParam, string>(TalkApiClientModule.addChannelUrl, {isPrimitiveResult: true});
    // 채널 대화방 URL
    public static channelChatUrl = Task<ChannelChatParam, string>(TalkApiClientModule.channelChatUrl, {isPrimitiveResult: true});
    // 채널 관계 조회
    public static channels = Task<ChannelParam, Channels>(TalkApiClientModule.channels, {cleanser: Cleanser.channels});
    // 친구 목록 조회
    public static friends = Task<FriendsParam, Friends>(TalkApiClientModule.friends);
    // 카카오톡 프로필 조회
    public static profile = Task<undefined, TalkProfile>(TalkApiClientModule.profile, {noarg: true});
    // 나에게 커스텀 메시지 보내기
    public static sendCustomMemo = Task<SendCustomMemoParam, boolean>(TalkApiClientModule.sendCustomMemo, {isPrimitiveResult: true});
    // 나에게 기본 메시지 보내기
    public static sendDefaultMemo = Task<SendDefaultMemoParam, boolean>(TalkApiClientModule.sendDefaultMemo, {isPrimitiveResult: true});
    // 나에게 스크랩 메시지 보내기
    public static sendScrapMemo = Task<SendScrapMemoParam, boolean>(TalkApiClientModule.sendScrapMemo, {isPrimitiveResult: true});
    // 커스텀 메시지 보내기
    public static sendCustomMessage = Task<SendCustomMessageParam, MessageSendResult>(TalkApiClientModule.sendCustomMessage);
    // 기본 메시지 보내기
    public static sendDefaultMessage = Task<SendDefaultMessageParam, MessageSendResult>(TalkApiClientModule.sendDefaultMessage);
    // 스크랩 메시지 보내기
    public static sendScrapMessage = Task<SendScrapMessageParam, MessageSendResult>(TalkApiClientModule.sendScrapMessage)
}

// 사용자관리 API
export class UserApi {
    // 현재 로그인한 사용자의 엑세스 토큰 정보 보기
    public static accessTokenInfo = Task<undefined, AccessTokenInfo>(UserApiClientModule.accessTokenInfo, {noarg: true});
    // 채널 메시지 방식 카카오톡 인증 로그인
    public static certLoginWithKakaoAccount = Task<CertLoginWithKakaoAccountParam, CertTokenInfo>(UserApiClientModule.certLoginWithKakaoAccount, {
        cleanser: Cleanser.certTokenInfo
    });
    // 앱투앱 방식 카카오톡 인증 로그인
    public static certLoginWithKakaoTalk = Task<CertLoginWithKakaoTalkParam, CertTokenInfo>(UserApiClientModule.certLoginWithKakaoTalk, {
        cleanser: Cleanser.certTokenInfo
    });
    // 카카오톡 로그인 가능(철치)여부 검사
    public static isKakaoTalkLoginAvailable = Task<undefined, boolean>(UserApiClientModule.isKakaoTalkLoginAvailable, {
        isPrimitiveResult: true,
        noarg: true
    });
    // 카카오계정 로그인 (브라우저 이용)
    public static loginWithKakaoAccount = Task<LoginWithKakaoAccountParam, OAuthToken>(UserApiClientModule.loginWithKakaoAccount, {
        cleanser: Cleanser.oauthToken
    });
    // 카카오톡 로그인 (카카오톡 이용)
    public static loginWithKakaoTalk = Task<LoginWithKakaoTalkParam, OAuthToken>(UserApiClientModule.loginWithKakaoTalk, {
        cleanser: Cleanser.oauthToken
    });
    // 현재 토큰을 만료시키고 로그아웃
    public static logout = Task<undefined, boolean>(UserApiClientModule.logout, {isPrimitiveResult: true, noarg: true});
    // 사용자 정보 요청
    public static me = Task<MeParam, User>(UserApiClientModule.me, {
        cleanser: Cleanser.user
    });
    // 특정 동의항목 철회
    public static revokeScopes = Task<RevokeScopesParam, ScopeInfo>(UserApiClientModule.revokeScopes);
    // 사용자 동의 항목 목록 상세
    public static scopes = Task<ScopesParam, ScopeInfo>(UserApiClientModule.scopes);
    // 서비스약관 동의 내역 목록 상세
    public static serviceTerms = Task<ServiceTermsParam, UserServiceTerms>(UserApiClientModule.serviceTerms, {cleanser: Cleanser.serviceTerms});
    // 사용자 배송지 목록
    public static shippingAddresses = Task<ShippingAddressesParam, UserShippingAddresses>(UserApiClientModule.shippingAddresses, {
        cleanser: Cleanser.shippingAddresses,
        cleanserRequest: CleanserRequest.shippingAddresses
    });
    // 앱 연결요청(자동연결이 아닌경우)
    public static signup = Task<SignupParam, boolean>(UserApiClientModule.signup, {isPrimitiveResult: true});
    // 연결 끊기
    public static unlink = Task<undefined, boolean>(UserApiClientModule.unlink, {isPrimitiveResult: true, noarg: true});
    // 사용자 부가정보 추가 및 수정
    public static updateProfile = Task<UpdateProfileParam, boolean>(UserApiClientModule.updateProfile);
}

// KakaoSDK
export default class KakaoSDK {
    // 초기화<br>
    // 직접 초기화 하기 보단, KAKAO_NATIVE_APP_KEY 리소스를 설정하여 자동으로 초기화 되도록 하시는 것을 권장드립니다.
    public static init = Task<InitParam, boolean>(KakaoSdkCommonModule.init);
    // 초기화 여부
    public static isInitialized = Task<undefined, boolean>(KakaoSdkCommonModule.isInitialized, {
        isPrimitiveResult: true,
        noarg: true
    });
}
