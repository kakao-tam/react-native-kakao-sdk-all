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

// Feed ????????? ??????
export const FeedTemplate = (param: FeedTemplate): FeedTemplate => {
    (param as any)['objectType'] = 'feed'
    return param
}

// List ????????? ??????
export const ListTemplate = (param: ListTemplate): ListTemplate => {
    (param as any)['objectType'] = 'list'
    return param
}

// Location ????????? ??????
export const LocationTemplate = (param: LocationTemplate): LocationTemplate => {
    (param as any)['objectType'] = 'location'
    return param
}

// Commerce ????????? ??????
export const CommerceTemplate = (param: CommerceTemplate): CommerceTemplate => {
    (param as any)['objectType'] = 'commerce'
    return param
}

// Text ????????? ??????
export const TextTemplate = (param: TextTemplate): TextTemplate => {
    (param as any)['objectType'] = 'text'
    return param
}

// ?????? API
export class AuthApi {
    // ?????? ?????? ?????? ??????<br>
    // ???????????? ?????? ???????????? ?????? ????????? ?????? ?????? ???????????? ???????????????<br>
    // ??????: ?????? ?????? ?????? ????????? ???????????? ????????????, ???????????? ????????? ????????? ???????????? ???????????? ????????????
    public static hasToken = Task<undefined, boolean>(AuthApiClientModule.hasToken, {noarg: true});
    // ?????? ?????? ??????
    public static refreshToken = Task<undefined, OAuthToken>(AuthApiClientModule.refreshToken, {
        cleanser: Cleanser.oauthToken,
        noarg: true
    });
}

// ???????????? API
export class PickerApi {
    // ??? ?????? ????????? ??????(?????? ??????)??? ??? ?????? ?????? ????????? ?????? ????????? ???????????????
    public static selectFriend = Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriend);
    // ??? ?????? ????????? ??????(?????? ??????)??? ??? ?????? ?????? ????????? ?????? ????????? ???????????????
    public static selectFriendPopup = Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriendPopup);
    // ?????? ?????? ????????? ??????(?????? ??????)??? ??? ?????? ?????? ????????? ?????? ????????? ???????????????
    public static selectFriends = Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriends);
    // ?????? ?????? ????????? ??????(?????? ??????)??? ??? ?????? ?????? ????????? ?????? ????????? ???????????????
    public static selectFriendsPopup = Task<OpenPickerFriendRequestParams, SelectedUsers>(PickerApiClientModule.selectFriendsPopup);
}

// ???????????? ?????? API
export class LinkApi {
    // ????????? ????????????????????? ????????? ????????? ???????????? ?????????????????? ??????
    public static customTemplate = Task<CustomTemplateParam, LinkResult>(LinkApiClientModule.customTemplate);
    // ?????? ???????????? ?????????????????? ??????
    public static defaultTemplate = Task<DefaultTemplateParam, LinkResult>(LinkApiClientModule.defaultTemplate);
    // ???????????? ?????? ????????? ???????????? ???????????? ?????? ?????? ???????????? ????????? ????????? ????????? ?????????
    public static scrapImage = Task<ScrapImageParam, ImageUploadResult>(LinkApiClientModule.scrapImage);
    // ????????? URL ??? ??????????????? ???????????? ???????????? ?????????????????? ??????
    public static scrapTemplate = Task<ScrapTemplateParam, LinkResult>(LinkApiClientModule.scrapTemplate);
    // ???????????? ?????? ????????? ???????????? ???????????? ?????? ?????? ???????????? ????????? ????????? ????????? ?????????
    public static uploadImage = Task<UploadImageParam, ImageUploadResult>(LinkApiClientModule.uploadImage);
}

// ??????????????? API
export class NaviApi {
    // ??????????????? ????????? ???????????? ???????????? URL ??????
    public static shareUrl = Task<NaviUrlParam, string>(NaviApiClientModule.shareUrl, {isPrimitiveResult: true});
    // ??????????????? ????????? ???????????? ???????????? URL ??????
    public static navigateUrl = Task<NaviUrlParam, string>(NaviApiClientModule.navigateUrl, {isPrimitiveResult: true});
}

// ?????????????????? API
export class StoryApi {
    // ????????????????????? ?????? ??? ????????? ??????.
    public static delete = Task<DeleteStoryParam, boolean>(StoryApiClientModule.delete, {isPrimitiveResult: true});
    // ?????????????????? ??????????????? ????????????.
    public static isStoryUser = Task<undefined, boolean>(StoryApiClientModule.isStoryUser, {
        isPrimitiveResult: true,
        noarg: true
    });
    // ?????????????????? ?????? URL ??? ??????????????? ?????? ?????? ??????
    public static linkInfo = Task<LinkInfoParam, LinkInfo>(StoryApiClientModule.linkInfo);
    // ????????????????????? ?????? ????????? ??????
    public static postLink = Task<PostLinkParam, string>(StoryApiClientModule.postLink, {isPrimitiveResult: true});
    // ????????????????????? ??? ????????? ??????
    public static postNote = Task<PostNoteParam, string>(StoryApiClientModule.postNote, {isPrimitiveResult: true});
    // ????????????????????? ?????? ????????? ??????
    public static postPhoto = Task<PostPhotoParam, string>(StoryApiClientModule.postPhoto, {isPrimitiveResult: true});
    // ?????????????????? ????????? ????????????
    public static profile = Task<ProfileParam, StoryProfile>(StoryApiClientModule.profile);
    // ????????????????????? ??? ????????? ?????? ??? ????????????<br>
    // ???, comments, likes ?????? ??????????????? ????????? ?????? ???????????? ?????? ?????? story ?????? ?????? ??????
    public static stories = Task<StoriesParam, Story[]>(StoryApiClientModule.stories);
    // ????????????????????? ?????? ??? ????????? ????????????
    public static story = Task<StoryParam, Story>(StoryApiClientModule.story);
    // ?????? ????????? ?????? ???????????? ????????????????????? ?????????
    public static upload = Task<StoryUploadParam, string[]>(StoryApiClientModule.upload);
}

// ???????????? API
export class TalkApi {
    // ?????? ?????? URL
    public static addChannelUrl = Task<AddChannelParam, string>(TalkApiClientModule.addChannelUrl, {isPrimitiveResult: true});
    // ?????? ????????? URL
    public static channelChatUrl = Task<ChannelChatParam, string>(TalkApiClientModule.channelChatUrl, {isPrimitiveResult: true});
    // ?????? ?????? ??????
    public static channels = Task<ChannelParam, Channels>(TalkApiClientModule.channels, {cleanser: Cleanser.channels});
    // ?????? ?????? ??????
    public static friends = Task<FriendsParam, Friends>(TalkApiClientModule.friends);
    // ???????????? ????????? ??????
    public static profile = Task<undefined, TalkProfile>(TalkApiClientModule.profile, {noarg: true});
    // ????????? ????????? ????????? ?????????
    public static sendCustomMemo = Task<SendCustomMemoParam, boolean>(TalkApiClientModule.sendCustomMemo, {isPrimitiveResult: true});
    // ????????? ?????? ????????? ?????????
    public static sendDefaultMemo = Task<SendDefaultMemoParam, boolean>(TalkApiClientModule.sendDefaultMemo, {isPrimitiveResult: true});
    // ????????? ????????? ????????? ?????????
    public static sendScrapMemo = Task<SendScrapMemoParam, boolean>(TalkApiClientModule.sendScrapMemo, {isPrimitiveResult: true});
    // ????????? ????????? ?????????
    public static sendCustomMessage = Task<SendCustomMessageParam, MessageSendResult>(TalkApiClientModule.sendCustomMessage);
    // ?????? ????????? ?????????
    public static sendDefaultMessage = Task<SendDefaultMessageParam, MessageSendResult>(TalkApiClientModule.sendDefaultMessage);
    // ????????? ????????? ?????????
    public static sendScrapMessage = Task<SendScrapMessageParam, MessageSendResult>(TalkApiClientModule.sendScrapMessage)
}

// ??????????????? API
export class UserApi {
    // ?????? ???????????? ???????????? ????????? ?????? ?????? ??????
    public static accessTokenInfo = Task<undefined, AccessTokenInfo>(UserApiClientModule.accessTokenInfo, {noarg: true});
    // ?????? ????????? ?????? ???????????? ?????? ?????????
    public static certLoginWithKakaoAccount = Task<CertLoginWithKakaoAccountParam, CertTokenInfo>(UserApiClientModule.certLoginWithKakaoAccount, {
        cleanser: Cleanser.certTokenInfo
    });
    // ????????? ?????? ???????????? ?????? ?????????
    public static certLoginWithKakaoTalk = Task<CertLoginWithKakaoTalkParam, CertTokenInfo>(UserApiClientModule.certLoginWithKakaoTalk, {
        cleanser: Cleanser.certTokenInfo
    });
    // ???????????? ????????? ??????(??????)?????? ??????
    public static isKakaoTalkLoginAvailable = Task<undefined, boolean>(UserApiClientModule.isKakaoTalkLoginAvailable, {
        isPrimitiveResult: true,
        noarg: true
    });
    // ??????????????? ????????? (???????????? ??????)
    public static loginWithKakaoAccount = Task<LoginWithKakaoAccountParam, OAuthToken>(UserApiClientModule.loginWithKakaoAccount, {
        cleanser: Cleanser.oauthToken
    });
    // ???????????? ????????? (???????????? ??????)
    public static loginWithKakaoTalk = Task<LoginWithKakaoTalkParam, OAuthToken>(UserApiClientModule.loginWithKakaoTalk, {
        cleanser: Cleanser.oauthToken
    });
    // ?????? ????????? ??????????????? ????????????
    public static logout = Task<undefined, boolean>(UserApiClientModule.logout, {isPrimitiveResult: true, noarg: true});
    // ????????? ?????? ??????
    public static me = Task<MeParam, User>(UserApiClientModule.me, {
        cleanser: Cleanser.user
    });
    // ?????? ???????????? ??????
    public static revokeScopes = Task<RevokeScopesParam, ScopeInfo>(UserApiClientModule.revokeScopes);
    // ????????? ?????? ?????? ?????? ??????
    public static scopes = Task<ScopesParam, ScopeInfo>(UserApiClientModule.scopes);
    // ??????????????? ?????? ?????? ?????? ??????
    public static serviceTerms = Task<ServiceTermsParam, UserServiceTerms>(UserApiClientModule.serviceTerms, {cleanser: Cleanser.serviceTerms});
    // ????????? ????????? ??????
    public static shippingAddresses = Task<ShippingAddressesParam, UserShippingAddresses>(UserApiClientModule.shippingAddresses, {
        cleanser: Cleanser.shippingAddresses,
        cleanserRequest: CleanserRequest.shippingAddresses
    });
    // ??? ????????????(??????????????? ????????????)
    public static signup = Task<SignupParam, boolean>(UserApiClientModule.signup, {isPrimitiveResult: true});
    // ?????? ??????
    public static unlink = Task<undefined, boolean>(UserApiClientModule.unlink, {isPrimitiveResult: true, noarg: true});
    // ????????? ???????????? ?????? ??? ??????
    public static updateProfile = Task<UpdateProfileParam, boolean>(UserApiClientModule.updateProfile);
}

// KakaoSDK
export default class KakaoSDK {
    // ?????????<br>
    // ?????? ????????? ?????? ??????, KAKAO_NATIVE_APP_KEY ???????????? ???????????? ???????????? ????????? ????????? ????????? ?????? ??????????????????.
    public static init = Task<InitParam, boolean>(KakaoSdkCommonModule.init);
    // ????????? ??????
    public static isInitialized = Task<undefined, boolean>(KakaoSdkCommonModule.isInitialized, {
        isPrimitiveResult: true,
        noarg: true
    });
}
