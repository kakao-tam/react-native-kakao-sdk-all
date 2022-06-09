// 친구 피커 서비스 유형 필터
// - talkstory: 카카오톡 및 카카오스토리 친구 모두 조회
// - talk: 카카오톡 친구만 조회
// - story: 카카옷토리 친구만 조회
type PickerServiceTypeFilter =
    | 'talk'
    | 'story'
    | 'talkstory'

// 친구 피커 화면 모드
// - auto: 시스템 디스플레이 설정에 따라 라이트 또는 다크 모드로 자동 전환
// - dark: 다크 모드
// - light: 라이트 모드
type ViewAppearance =
    | 'auto'
    | 'light'
    | 'dark'

// 친구 피거 방향
// - auto: 시스템 설저에 따라 세로 또는 가로 모드로 자동 전환
// - landscape: 가로 모드
// - portrait: 세로 모드
type PickerOrientation =
    | 'auto'
    | 'landscape'
    | 'portrait'

// 친구 피거 설정 파라메터
interface OpenPickerFriendRequestParams {
    // 친구 피커의 이름
    title?: String | null;
    // 친구를 가져올 서비스
    serviceTypeFilter?: PickerServiceTypeFilter | null;
    // 친구 피커 화면 모드
    viewAppearance?: ViewAppearance | null;
    // 친구 피커의 방향
    orientation?: PickerOrientation | null;
    // 친구 검색 기능 사용 여부
    enableSearch?: boolean | null;
    // 내 프로필 표시 여부
    showMyProfile?: boolean | null;
    // 즐겨찾기 친구 표시 여부
    showFavorite?: boolean | null;
    // 선택한 친구 표시 여부 (멀티피커 전용)
    showPickedFriend?: boolean | null;
    // 선택 가능한 친구 수의 최대값
    maxPickableCount?: number | null;
    // 선택 가능한 친구 수의 최소값
    minPickableCount?: number | null;
}

// 선택한 사용자 정보
interface SelectedUser {
    // 회원번호<br>
    // 앱과 연결된 친구에게만 존재
    id?: number;
    // UUID
    uuid: string;
    // 프로필 닉네임
    profileNickname?: string;
    // 프로필 썸네일 이미지
    profileThumbnailImage?: string;
    // 즐겨찾기 추가 여부
    favorite?: boolean
}

// 선택한 사용자 정보 목록
interface SelectedUsers {
    // 선택한 전체 사용자 수<br>
    // users 수와 다를 수 있음
    totalCount: number;
    // 실제 응답으로 전달되는 사용자 정보 목록
    users?: SelectedUser[];
}
