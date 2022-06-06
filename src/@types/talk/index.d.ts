type Templatable = FeedTemplate | ListTemplate | LocationTemplate | CommerceTemplate | TextTemplate;
type Relation = 'ADDED' | 'NONE' | 'BLOCKED'
type Order = 'asc' | 'desc'
type FriendOrder = 'nickname' | 'age' | 'favorite'

interface AddChannelParam {
    channelPublicId: string;
}

interface ChannelChatParam {
    channelPublicId: string;
}

interface ChannelParam {
    publicIds?: string[] | null
}

interface Channels {
    userId?: number | null;
    channels?: Channel[]
}

interface Channel {
    channelUuid: string;
    channelPublicId: string;
    encodedId: string;
    relation: Relation;
    updatedAt?: Date | null;
}

interface FriendsParam {
    offset?: number | null;
    limit?: number | null;
    order?: Order | null;
    friendOrder?: FriendOrder | null;
}

interface Friends {
    elements?: Friend | null;
    totalCount: number;
    favoriteCount?: number | null;
    beforeUrl?: string | null;
    afterUrl?: string | null;
}

interface Friend {
    id?: number | null;
    serviceUserId?: number | null;
    uuid: string;
    profileNickname?: string | null;
    profileThumbnailImage?: string | null;
    favorite?: boolean | null;
    allowedMsg?: boolean | null;
}

interface TalkProfile {
    nickname?: string | null;
    profileImageUrl?: string | null;
    thumbnailUrl?: string | null;
    countryISO?: string | null
}

interface SendCustomMemoParam {
    templateId: number;
    templateArgs?: Map | null;
}

interface SendDefaultMemoParam {
    templatable: Templatable
}

interface FeedTemplate {
    content: Content;
    itemContent?: ItemContent | null;
    social?: Social | null;
    buttonTitle?: string | null;
    buttons?: Button[] | null;
}

interface Content {
    title: string;
    imageUrl: string;
    imageWidth?: number | null;
    imageHeight?: number | null;
    description?: string | null;
    link: Link;
}

interface Link {
    webUrl?: string | null;
    mobileWebUrl?: string | null;
    androidExecutionParams?: string | null;
    iosExecutionParams?: string | null;
}

interface ItemContent {
    profileText?: string | null;
    profileImageUrl?: string | null;
    titleImageText?: string | null;
    titleImageUrl?: string | null;
    titleImageCategory?: string | null;
    items?: ItemInfo[] | null;
    sum?: string | null;
    sumOp?: string | null;
}

interface ItemInfo {
    item: string;
    itemOp: string;
}

interface Social {
    likeCount?: number | null;
    commentCount?: number | null;
    sharedCount?: number | null;
    viewCount?: number | null;
    subscriberCount?: number | null;
}

interface Button {
    title: string;
    link: Link;
}

interface ListTemplate {
    headerTitle: string;
    contents: Content[];
    buttonTitle?: string | null;
    buttons?: Button[] | null;
}

interface LocationTemplate {
    address: string;
    addressTitle?: string | null;
    content: Content;
    social?: Social | null;
    buttonTitle?: string | null;
    buttons?: Buttonp[] | null;
}

interface CommerceTemplate {
    content: Content;
    commerce: CommerceDetail;
    buttonTitle?: string | null;
    buttons?: Button[] | null;
}

interface CommerceDetail {
    regularPrice: number;
    discountPrice?: number | null;
    discountRate?: number | null;
    fixedDiscountPrice?: number | null;
    productName?: string | null;
    currencyUnit?: string | null;
    currencyUnitPosition?: 0 | 1 | null;
}

interface TextTemplate {
    text: string;
    link: Link;
    buttonTitle?: string | null;
    buttons?: Button[] | null;
}

interface SendScrapMemoParam {
    requestUrl: string;
    templateId?: number | null;
    templateArgs?: Map | null;
}

interface SendCustomMessageParam {
    templateId?: number | null;
    templateArgs?: Map | null;
    receiverUuids: string[]
}

interface MessageSendResult {
    successfulReceiverUuids?: string[] | null;
    failureInfos?: MessageFailureInfo[] | null;
}

interface MessageFailureInfo {
    code: number;
    msg: string;
    receiverUuids: string[];
}

interface SendDefaultMessageParam {
    templatable: Templatable;
    receiverUuids: string[];
}

interface SendScrapMessageParam {
    requestUrl: string;
    templateId?: number | null;
    templateArgs?: Map | null;
    receiverUuids: string[]
}

interface ITalkApi {
    addChannelUrl: (param: AddChannelParam) => Promise<string>;
    channelChatUrl: (param: ChannelChatParam) => Promise<string>;
    channels: (param?: ChannelParam) => Promise<Channels>;
    friends: (param?: FriendsParam) => Promise<Friends>;
    profile: () => Promise<TalkProfile>;
    sendCustomMemo: (param: SendCustomMemoParam) => Promise<boolean>;
    sendDefaultMemo: (param: SendDefaultMemoParam) => Promise<boolean>;
    sendScrapMemo: (param: SendScrapMemoParam) => Promise<boolean>;
    sendCustomMessage: (param: SendCustomMessageParam) => Promise<MessageSendResult>;
    sendDefaultMessage: (param: SendDefaultMessageParam) => Promise<MessageSendResult>;
    sendScrapMessage: (param: SendScrapMessageParam) => Promise<MessageSendResult>;
}
