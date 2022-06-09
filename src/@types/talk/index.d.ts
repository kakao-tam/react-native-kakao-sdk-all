// 기본 템플릿 유형<br>
type Templatable = FeedTemplate | ListTemplate | LocationTemplate | CommerceTemplate | TextTemplate;
// 채널 관계
// - ADDED: 추가된 상태
// - NONE: 관계없음
// - BLOCKED: 차단 상태
type Relation = 'ADDED' | 'NONE' | 'BLOCKED'
// 정렬
// - asc: 오름차순
// - desc: 내림차순
type Order = 'asc' | 'desc'
// 친구 정렬
// - nickname: 닉네임 정렬
// - age: 나이 정렬
// - favorite: 즐겨찾기 순 정렬
type FriendOrder = 'nickname' | 'age' | 'favorite'

// 채널추가 URL 파라메터
interface AddChannelParam {
    // 채널ID
    channelPublicId: string;
}

// 채널채팅 URL 파라메터
interface ChannelChatParam {
    // 채널ID
    channelPublicId: string;
}

// 채널 관계 조회 파라메터
interface ChannelParam {
    publicIds?: string[] | null
}

// 채널정보
interface Channels {
    // 회원번호
    userId?: number | null;
    // 채널목록
    channels?: Channel[]
}

// 채널
interface Channel {
    // 채널UUID
    channelUuid: string;
    // 채널ID
    channelPublicId: string;
    // 채널관계
    relation: Relation;
    // 마지막 상태 변경 시각 (GTM)
    updatedAt?: Date | null;
}

// 친구 목록 조회 파라메터
interface FriendsParam {
    offset?: number | null;
    limit?: number | null;
    order?: Order | null;
    friendOrder?: FriendOrder | null;
}

// 친구목록
interface Friends {
    // 친구목록
    elements?: Friend[] | null;
    // 전체 수
    totalCount: number;
    // 즐겨찾기 수
    favoriteCount?: number | null;
    // 친구 목록 이전 페이지 URL
    beforeUrl?: string | null;
    // 친구 목록 다음 페이지 URL
    afterUrl?: string | null;
}

// 친구
interface Friend {
    // 회원번호
    id?: number | null;
    // UUID
    uuid: string;
    // 프로필 닉네임
    profileNickname?: string | null;
    // 프로필 썸네일 이미지
    profileThumbnailImage?: string | null;
    // 즐겨찾기 여부
    favorite?: boolean | null;
    // 메시지 수신 가능 여부
    allowedMsg?: boolean | null;
}

// 카카오톡 프로필
interface TalkProfile {
    // 닉네임
    nickname?: string | null;
    // 프로필 이미지 URL
    profileImageUrl?: string | null;
    // 썸네일 이미지 URL
    thumbnailUrl?: string | null;
    // 카카오톡 국가 코드
    countryISO?: string | null
}

// 나에게 커스텀 메시지 보내기 파라메터
interface SendCustomMemoParam {
    // 템플릿ID
    templateId: number;
    // 템플릿 사용자 파라메터
    templateArgs?: Map | null;
}

// 나에게 기본 메시지 보내기 파라메터
interface SendDefaultMemoParam {
    // 템플릿
    templatable: Templatable
}

// 피드 템플릿
interface FeedTemplate {
    // 메인 콘텐츠
    content: Content;
    // 아이템 영역 콘텐츠
    itemContent?: ItemContent | null;
    // 소셜 정보
    social?: Social | null;
    // 기본 버튼 명
    buttonTitle?: string | null;
    // 버튼 목록 (최대 2개)
    buttons?: Button[] | null;
}

// 콘텐츠
interface Content {
    // 타이틀
    title: string;
    // 이미지 URL
    imageUrl: string;
    // 이미지 너비 (픽셀)
    imageWidth?: number | null;
    // 이미지 높이 (픽셀)
    imageHeight?: number | null;
    // 이미지 설명
    description?: string | null;
    // 클릭시 이동할 링크 정보
    link: Link;
}

// 링크 오브젝트
interface Link {
    // PC버전 웹링크 URL
    webUrl?: string | null;
    // 모바일 카카오톡에서 사용하는 웹 링크 URL
    mobileWebUrl?: string | null;
    // 안드로이드 카카오톡에서 사용하는 앱 링크 URL에 추가할 파라메터
    androidExecutionParams?: string | null;
    // iOS 카카오톡에서 사용하는 앱 링크 URL에 추가할 파라메터
    iosExecutionParams?: string | null;
}

// 아이템 목록 콘텐츠
interface ItemContent {
    // 프로필 영역 출력 텍스트
    profileText?: string | null;
    // 프로필 이미지 영역 출력 이미지URL
    profileImageUrl?: string | null;
    // 이미지 아이템 제목 (최대2줄, 24자)
    titleImageText?: string | null;
    // 아이템 이미지 URL
    titleImageUrl?: string | null;
    // 이미지 아이템 카테고리 영역 출력
    titleImageCategory?: string | null;
    // 각 텍스트 아이템 정보
    items?: ItemInfo[] | null;
    // 주문금액, 결제금액등 아이템 영역의 요약 정보
    sum?: string | null;
    // 아이템 영역의 가격 합산 정보
    sumOp?: string | null;
}

// 아이템
interface ItemInfo {
    // 아이템 이름
    item: string;
    // 아이템 가격
    itemOp: string;
}

// 소셜정보
interface Social {
    // 좋아요 수
    likeCount?: number | null;
    // 댓글 수
    commentCount?: number | null;
    // 공유 수
    sharedCount?: number | null;
    // 조회 수
    viewCount?: number | null;
    // 구독 수
    subscriberCount?: number | null;
}

// 버튼 오브젝트
interface Button {
    // 타이틀
    title: string;
    // 링크 정보
    link: Link;
}

// 리스트 템플릿
interface ListTemplate {
    // 헤더 타이틀
    headerTitle: string;
    // 헤더 링크
    headerLink: Link;
    // 컨텐츠 목록 (최대 2개)
    contents: Content[];
    // 버튼 타이틀
    buttonTitle?: string | null;
    // 버튼 목록 (최대 2개)
    buttons?: Button[] | null;
}

// 위치공유 템플릿
interface LocationTemplate {
    // 주소
    address: string;
    // 주소 타이틀
    addressTitle?: string | null;
    // 콘텐츠
    content: Content;
    // 소셜정보
    social?: Social | null;
    // 기본 버튼 타이틀
    buttonTitle?: string | null;
    // 버튼 목록
    buttons?: Button[] | null;
}

// 커머스 템플릿
interface CommerceTemplate {
    // 콘텐츠
    content: Content;
    // 콘텐츠의 커머스 가격정보
    commerce: CommerceDetail;
    // 기본 버튼 타이틀
    buttonTitle?: string | null;
    // 버튼 목록
    buttons?: Button[] | null;
}

// 커머스 가격정보
interface CommerceDetail {
    // 정상가격
    regularPrice: number;
    // 할인가격
    discountPrice?: number | null;
    // 할인율
    discountRate?: number | null;
    // 정액 할인 가격
    fixedDiscountPrice?: number | null;
    // 상품명
    productName?: string | null;
    // 가격 단위
    currencyUnit?: string | null;
    // 가격 단위 위치
    // - 0: 가격 뒤
    // - 1: 가격 앞
    currencyUnitPosition?: 0 | 1 | null;
}

// 텍스트 템플릿
interface TextTemplate {
    // 텍스트 (최대 200자)
    text: string;
    // 콘텐츠 클릭 시 이동할 링크 정보
    link: Link;
    // 기본 버튼 타이틀
    buttonTitle?: string | null;
    // 버튼 목록
    buttons?: Button[] | null;
}

// 나에게 스크랩 메시지 보내기 파라메터
interface SendScrapMemoParam {
    // 스크랩 대상 주소
    requestUrl: string;
    // 템플릿 ID
    templateId?: number | null;
    // 템플릿 사용자 파라메터
    templateArgs?: Map | null;
}

interface SendCustomMessageParam {
    // 템플릿 ID
    templateId?: number | null;
    // 템플릿 사용자 파라메터
    templateArgs?: Map | null;
    // 수신자 UUID 목록
    receiverUuids: string[]
}

// 메시지 전송 결과
interface MessageSendResult {
    // 성공한 UUID 목록
    successfulReceiverUuids?: string[] | null;
    // 실패 내역 정보
    failureInfos?: MessageFailureInfo[] | null;
}

// 실패 내역 정보
interface MessageFailureInfo {
    // 오류코드
    code: number;
    // 매시지
    msg: string;
    // 같은 오류코드의 UUID 목록
    receiverUuids: string[];
}

// 기본 메시지 파라메터
interface SendDefaultMessageParam {
    // 템플릿
    templatable: Templatable;
    // 수신자 UUID 목록
    receiverUuids: string[];
}

// 스크랩 메시지 파라메터
interface SendScrapMessageParam {
    requestUrl: string;
    // 템플릿 ID
    templateId?: number | null;
    // 템플릿 사용자 파라메터
    templateArgs?: Map | null;
    // 수신자 UUID 목록
    receiverUuids: string[]
}
