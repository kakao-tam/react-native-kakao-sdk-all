import { NativeModules, Platform } from 'react-native';
import { Cleanser, CleanserRequest } from "./cleanser";

type ReactMethod = (param: any) => Promise<string>;

interface TaskOptions<Param, Result> {
    cleanser?: (obj: Result) => void;
    cleanserRequest?: (param: Param) => void;
    isPrimitiveResult?: boolean;
    noarg?: boolean;
}

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

// Feed 템플릿 생성
export const FeedTemplate = (param: FeedTemplate): FeedTemplate => {
    (param as any)['objectType'] = 'feed'
    return param
}

// List 템플릿 생성
export const ListTemplate = (param: ListTemplate): ListTemplate => {
    (param as any)['objectType'] = 'list'
    return param
}

// Location 템플릿 생성
export const LocationTemplate = (param: LocationTemplate): LocationTemplate => {
    (param as any)['objectType'] = 'location'
    return param
}

// Commerce 템플릿 생성
export const CommerceTemplate = (param: CommerceTemplate): CommerceTemplate => {
    (param as any)['objectType'] = 'commerce'
    return param
}

// Text 템플릿 생성
export const TextTemplate = (param: TextTemplate): TextTemplate => {
    (param as any)['objectType'] = 'text'
    return param
}

// 인증 API
export class AuthApi {
    // 기존 토큰 존재 여부<br>
    // 사용자가 앞서 로그인을 통해 토큰을 발급 받은 상태인지 확인합니다<br>
    // 주의: 기존 토큰 존재 여부를 확인하는 기능으로, 사용자가 현재도 로그인 상태임을 보장하지 않습니다
    public static hasToken = Task<undefined, boolean>(AuthApiClientModule.hasToken, {noarg: true});
    // 기존 토큰 갱신
    public static refreshToken = Task<undefined, OAuthToken>(AuthApiClientModule.refreshToken, {
        cleanser: Cleanser.oauthToken,
        noarg: true
    });
}

// 친구피커 API
export class PickerApi {
    // 한 명의 친구만 선택(싱글 피커)할 수 있는 친구 피커를 화면 전체에 표시합니다
    public static selectFriend = Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriend);
    // 한 명의 친구만 선택(싱글 피커)할 수 있는 친구 피커를 팝업 형태로 표시합니다
    public static selectFriendPopup = Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriendPopup);
    // 여러 명의 친구를 선택(멀티 피커)할 수 있는 친구 피커를 화면 전체에 표시합니다
    public static selectFriends = Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriends);
    // 여러 명의 친구를 선택(멀티 피커)할 수 있는 친구 피커를 팝업 형태로 표시합니다
    public static selectFriendsPopup = Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriendsPopup);
}

// 카카오톡 공유 API
export class LinkApi {
    // 카카오 디벨로퍼스에서 생성한 메시지 템플릿을 카카오톡으로 공유
    public static customTemplate = Task<CustomTemplateParam, LinkResult>(LinkApiClientModule.customTemplate);
    // 기본 템플릿을 카카오톡으로 공유
    public static defaultTemplate = Task<DefaultTemplateParam, LinkResult>(LinkApiClientModule.defaultTemplate);
    // 카카오톡 공유 컨텐츠 이미지로 활용하기 위해 원격 이미지를 카카오 이미지 서버로 업로드
    public static scrapImage = Task<ScrapImageParam, ImageUploadResult>(LinkApiClientModule.scrapImage);
    // 지정된 URL 을 스크랩하여 만들어진 템플릿을 카카오톡으로 공유
    public static scrapTemplate = Task<ScrapTemplateParam, LinkResult>(LinkApiClientModule.scrapTemplate);
    // 카카오톡 공유 컨텐츠 이미지로 활용하기 위해 로컬 이미지를 카카오 이미지 서버로 업로드
    public static uploadImage = Task<UploadImageParam, ImageUploadResult>(LinkApiClientModule.uploadImage);
}

// 카카오내비 API
export class NaviApi {
    // 카카오내비 앱으로 목적지를 공유하는 URL 조회
    public static shareUrl = Task<NaviUrlParam, string>(NaviApiClientModule.shareUrl, {isPrimitiveResult: true});
    // 카카오내비 앱으로 길안내를 실행하는 URL 조회
    public static navigateUrl = Task<NaviUrlParam, string>(NaviApiClientModule.navigateUrl, {isPrimitiveResult: true});
}

// 카카오스토리 API
export class StoryApi {
    // 카카오스토리의 특정 내 스토리 삭제.
    public static delete = Task<DeleteStoryParam, boolean>(StoryApiClientModule.delete, {isPrimitiveResult: true});
    // 카카오스토리 사용자인지 확인하기.
    public static isStoryUser = Task<undefined, boolean>(StoryApiClientModule.isStoryUser, {
        isPrimitiveResult: true,
        noarg: true
    });
    // 포스팅하고자 하는 URL 을 스크랩하여 링크 정보 생성
    public static linkInfo = Task<LinkInfoParam, LinkInfo>(StoryApiClientModule.linkInfo);
    // 카카오스토리에 링크 스토리 쓰기
    public static postLink = Task<PostLinkParam, string>(StoryApiClientModule.postLink, {isPrimitiveResult: true});
    // 카카오스토리에 글 스토리 쓰기
    public static postNote = Task<PostNoteParam, string>(StoryApiClientModule.postNote, {isPrimitiveResult: true});
    // 카카오스토리에 사진 스토리 쓰기
    public static postPhoto = Task<PostPhotoParam, string>(StoryApiClientModule.postPhoto, {isPrimitiveResult: true});
    // 카카오스토리 프로필 가져오기
    public static profile = Task<ProfileParam, StoryProfile>(StoryApiClientModule.profile);
    // 카카오스토리의 내 스토리 여러 개 가져오기<br>
    // 단, comments, likes 등의 상세정보는 없으며 이는 내스토리 정보 요청 story 통해 획득 가능
    public static stories = Task<StoriesParam, Story[]>(StoryApiClientModule.stories);
    // 카카오스토리의 특정 내 스토리 가져오기
    public static story = Task<StoryParam, Story>(StoryApiClientModule.story);
    // 로컬 이미지 파일 여러장을 카카오스토리에 업로드
    public static upload = Task<StoryUploadParam, string[]>(StoryApiClientModule.upload);
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
