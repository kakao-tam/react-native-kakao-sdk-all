// 스토리 권한
// - A: 전체공개
// - F: 친구공개
// - M: 비공개
type StoryPermission = 'A' | 'F' | 'M'
// 미디어 유형
type MediaType = "NOT_SUPPORTED" | "NOTE" | "PHOTO"
// 느낌(감정표현)
// - UNKNOWN, NOT_DEFINED: 미정의
// - LIKE: 좋아요
// - COOL: 멋저요
// - HAPPY: 기뻐요
// - SAD: 슬퍼요
// - CHEER_UP: 힘내요
type Emotion = "UNKNOWN" | "NOT_DEFINED" | "LIKE" | "COOL" | "HAPPY" | "SAD" | "CHEER_UP"

// 스토리 미디어 (이미지)
interface StoryMedia {
    // 원본 이미지 URL
    original?: string | null;
    // 1208 * 1796 이미지 URL
    xlarge?: string | null;
    // 720 * 960 이미지 URL
    large?: string | null;
    // 240 * 320 이미지 URL
    medium?: string | null;
    // 160 * 213 이미 URL
    small?: string | null;
}

// 스토리 댓글
interface StoryComment {
    // 댓글
    text: string;
    // 작성자
    writer: StoryActor
}

// 작성자 정보
interface StoryActor {
    // 이름
    displayName: string;
    // 프로필 썸네일 이미지 URL
    profileThumbnailUrl?: string | null;
}

// 느낌(감정표현) 정보
interface StoryLike {
    // 느낌(감정표현)
    emotion: Emotion;
    // 작성자
    actor: StoryActor;
}

// 스토리 포스팅을 위한 링크 정보
interface LinkInfo {
    // 스크랩한 주소이 URL
    url?: string | null;
    // 요청 시, 원본 URL
    requestedUrl?: string | null;
    // 스크랩한 호스트 도메인
    host?: string | null;
    // 웹 페이지의 제목
    title?: string | null;
    // 웹 페이지의 대표 이미지 주소 (최대 3개)
    images?: string[] | null;
    // 웹 페이지의 설명
    description?: string | null;
    // 웹 페이지의 섹션 정보
    section?: string | null;
    // 웹 페이지의 콘텐츠 타입<br>
    // 예) video, music, book, article, profile, website
    type?: string | null;
}

// 스토리 정보
interface Story {
    // 포스트 ID
    id: string;
    // 내스토리 정보의 URL
    url: string;
    // 미디어 유형
    mediaType?: MediaType | null;
    // 작성된 시각
    createdAt: Date;
    // 포스팅 내용
    content?: string | null;
    // 미디어 목록
    media?: StoryMedia[] | null;
    // 댓글 수
    commentCount: number;
    // 좋아요 수
    likeCount: number;
    // 공개 범위
    permission?: StoryPermission | null;
    // 댓글 목록
    comments?: StoryComment[] | null;
    // 좋아요 정보 목록
    likes?: StoryLike[] | null;
}

// 카카오스토리 프로필
interface StoryProfile {
    // 닉네임
    nickname?: string | null;
    // 프로필 이미지 URL
    profileImageUrl?: string | null;
    // 프로필 이미지 섬네일 URL
    thumbnailUrl?: string | null;
    // 카카오스토리 배경 이미지 URL
    bgImageUrl?: string | null;
    // 스토리 퍼머링크
    permalink?: string | null;
    // 생일 (MMDD)
    birthday?: string | null;
    // 생일 타입
    birthdayType?: BirthdayType;
}

// 스토리 삭제 파라메터
interface DeleteStoryParam {
    // 포스트 ID
    id: string
}

// 링크정보 파라메터
interface LinkInfoParam {
    url: string
}

// 링크 스토리 쓰기 파라메터
interface PostLinkParam {
    // 콘텐츠
    content: string;
    // 링크 정보
    linkInfo: LinkInfo;
    // 공개 범위
    permission: StoryPermission;
    // 친구 공개 스토리인 경우 공유 설정 (기본값: false)
    enableShare?: boolean | null;
    // 스토리의 [해당 앱으로 이동] 버튼을 눌렀을 때 Android 앱 실행 URL에 붙일 파라미터
    androidExecParam?: Map | null;
    // 스토리의 [해당 앱으로 이동] 버튼을 눌렀을 때 iOS 앱 실행 URL에 붙일 파라미터
    iosExecParam?: Map | null;
    // 스토리에서 오픈마켓으로 이동할 때 실행 URL에 붙일 파라미터
    androidMarketParam?: Map | null;
    // 스토리에서 앱스토어로 이동할 때 실행 URL에 붙일 파라미터
    iosMarketParam?: Map | null;
}

// 글 스토리 쓰기 파라메터
interface PostNoteParam {
    // 콘텐츠
    content: string;
    // 공개 범위
    permission: StoryPermission;
    // 친구 공개 스토리인 경우 공유 설정 (기본값: false)
    enableShare?: boolean | null;
    // 스토리의 [해당 앱으로 이동] 버튼을 눌렀을 때 Android 앱 실행 URL에 붙일 파라미터
    androidExecParam?: Map | null;
    // 스토리의 [해당 앱으로 이동] 버튼을 눌렀을 때 iOS 앱 실행 URL에 붙일 파라미터
    iosExecParam?: Map | null;
    // 스토리에서 오픈마켓으로 이동할 때 실행 URL에 붙일 파라미터
    androidMarketParam?: Map | null;
    // 스토리에서 앱스토어로 이동할 때 실행 URL에 붙일 파라미터
    iosMarketParam?: Map | null;
}

// 사진 스토리 쓰기 파라메터
interface PostPhotoParam {
    // 콘텐츠
    content: string;
    // 스토리에 들어갈 이미지들의 URL
    imagePaths: string[];
    // 공개 범위
    permission: StoryPermission;
    // 친구 공개 스토리인 경우 공유 설정 (기본값: false)
    enableShare?: boolean | null;
    // 스토리의 [해당 앱으로 이동] 버튼을 눌렀을 때 Android 앱 실행 URL에 붙일 파라미터
    androidExecParam?: Map | null;
    // 스토리의 [해당 앱으로 이동] 버튼을 눌렀을 때 iOS 앱 실행 URL에 붙일 파라미터
    iosExecParam?: Map | null;
    // 스토리에서 오픈마켓으로 이동할 때 실행 URL에 붙일 파라미터
    androidMarketParam?: Map | null;
    // 스토리에서 앱스토어로 이동할 때 실행 URL에 붙일 파라미터
    iosMarketParam?: Map | null;
}

// 프로필 가져오기 파라메터
interface ProfileParam {
    // URL을 https로 받을지 여부 (기본값 true)
    secureResource: boolean;
}

// 스토리 여러개 가져오기<br>
// 카카오스토리의 여러 개의 내스토리 정보들을 얻을 수 있습니다. 단, comments, likes등의 상세정보는 없으며 이는 내스토리 정보 요청을 통해 얻을 수 있습니다.
interface StoriesParam {
    // 마지막 포스트 ID
    lastId?: string | null;
}

// 내스토리 정보 요청 파라메터
interface StoryParam {
    // 포스트 ID
    id: string;
}

// 로컬 이미지 업로드 파라메터
interface StoryUploadParam {
    // 파일경로
    images: string[]
}
