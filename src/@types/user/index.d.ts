// Prompt
type Prompt = "login" | "cert"
// 연령대 (한국 나이)
type AgeRange =
    '0~9'
    | '10~14'
    | '15~19'
    | '20~29'
    | '30~39'
    | '40~49'
    | '50~59'
    | '60~69'
    | '70~79'
    | '80~89'
    | '90~'
    | 'UNKNOWN';
// 생일의 양력/음력
// - SOLAR: 양력
// - LUNAR: 음력
type BirthdayType = 'SOLAR' | 'LUNAR' | 'UNKNOWN'
// 성별
// - male: 남
// - female: 여
type Gender = 'male' | 'female' | 'UNKNOWN'
// 공의 항목 타입
// - PRIVACY: 개인정보 보호
// - SERVICE: 접근권한 관리
type ScopeType = 'PRIVACY' | 'SERVICE'
// 배송 주소 타입
type ShippingAddressType = 'OLD' | 'NEW' | 'UNKNOWN'

// 토큰 정보 요청 응답
interface AccessTokenInfo {
    // 앱ID
    appId: number;
    // 남은 만료시간 (초)
    expiresIn: number;
    // 회원번호(앱유저아이디)
    id?: number | null
}

// 사용자의 배송지 정보
interface UserShippingAddresses {
    // 배송지 정보 조회를 위해 제3자 정보제공동의 필요 여부
    shippingAddressesNeedsAgreement?: boolean | null;
    // 배송지 정보 리스트
    shippingAddresses?: ShippingAddress[] | null;
    // 회원번호
    userId?: number | null;
}

// 배송지 정보
interface ShippingAddress {
    // 기본주소
    baseAddress?: string | null;
    // 상세 주소
    detailAddress?: string | null;
    // 배송지 ID
    id: number;
    // 기본 배송지 여부
    isDefault: boolean;
    // 배송지 이름
    name?: string | null;
    // 수령인 이름
    receiverName?: string | null;
    // 수령인 연락처
    receiverPhoneNumber1?: string | null;
    // 수령인 추가 연락처
    receiverPhoneNumber2?: string | null;
    // 배송지 유형
    type?: ShippingAddressType | null;
    // 수정시각
    updatedAt?: Date | null;
    // 우편번호 (구주소)
    zipCode?: string | null;
    // 우편번호 (신주소)
    zoneNumber?: string | null;
}

// 사용자 정보
interface User {
    // 서비스 연결 완료 시각 (GMT)
    connectedAt?: Date | null;
    // 그룹유저토큰
    groupUserToken?: string | null;
    // signup 여부
    hasSignedUp?: boolean | null;
    // 회원번호
    id?: number | null;
    // 카카오계정 정보
    kakaoAccount?: Account | null;
    // 추가 정보
    properties?: Map | null;
    // 카카오싱크 간편가입을 통해 로그인한 시각 (GMT)
    synchedAt?: Date | null;
}

// 카카오계정 정보
interface Account {
    // 연령대
    ageRange?: AgeRange | null;
    // 연령대 제공에 대한 사용자 동의 필요 여부
    ageRangeNeedsAgreement?: boolean | null;
    // 생일(MMDD)
    birthday?: string | null;
    // 생일 제공에 대한 사용자 동의 필요 여부
    birthdayNeedsAgreement?: boolean | null;
    // 생일의 양력/음력
    birthdayType?: BirthdayType | null;
    // 출생연도 (YYYY)
    birthyear?: string | null
    // 출생연도 제공에 대한 사용자 동의 필요 여부
    birthyearNeedsAgreement?: boolean | null;
    // 암호화된 사용자 확인값
    ci?: string | null;
    // CI발급시간 (GMT)
    ciAuthenticatedAt?: Date | null;
    // 암호회된 사용자 확인값 제공에 대한 사용자 동의 필요 여부
    ciNeedsAgreement?: boolean | null;
    // 카카오 계정 대표 이메일
    email?: string | null;
    // 카카오 계정 대표 이메일 제공에 대한 사용자 동의 필요 여부
    emailNeedsAgreement?: boolean | null;
    // 성별
    gender?: Gender | null
    // 성별 제공에 대한 사용자 동의 필요 여부
    genderNeedsAgreement?: boolean | null;
    // 대표 이메일 유효 여부
    isEmailValid?: boolean | null;
    // 대표 이메일 인증 여부
    isEmailVerified?: boolean | null;
    // 한국인 여부
    isKorean?: boolean | null;
    // 한국인 여부 제공에 대한 사용자 동의 필요 여부
    isKoreanNeedsAgreement?: boolean | null;
    // 법정생년월일
    legalBirthDate?: string | null;
    // 법정생년월일 제공에 대한 사용자 동의 필요 여부
    legalBirthDateNeedsAgreement?: boolean | null;
    // 법정성별
    legalGender?: Gender | null;
    // 법정성별 제공에 대한 사용자 동의 필요 여부
    legalGenderNeedsAgreement?: boolean | null;
    // 실명
    legalName?: string | null;
    // 실명 제공에 대한 사용자 동의 필요 여부
    legalNameNeedsAgreement?: boolean | null;
    // 카카오 계정 이름
    name?: string | null;
    // 카카오 계정 이름 제공에 대한 사용자 동의 필요 여부
    nameNeedsAgreement?: boolean | null;
    // 전화번호
    phoneNumber?: string | null;
    // 전화번호 제공에 대한 사용자 동의 필요 여부
    phoneNumberNeedsAgreement?: boolean | null;
    // 카카오계정 프로필 정보
    profile?: Profile | null;
    // 프로필 이미지 제공에 대한 사용자 동의 필요 여부
    profileImageNeedsAgreement?: boolean | null;
    // 프로필 제공에 대한 사용자 동의 필요 여부
    profileNeedsAgreement?: boolean | null;
    // 프로필 닉네임 제공에 대한 사용자 동의 필요 여부
    profileNicknameNeedsAgreement?: boolean | null;
}

// 카카오계정 프로필
interface Profile {
    // 카카오계정에 등록된 프로필 이미지가 기본이미지인지 여부
    isDefaultImage?: boolean | null;
    // 닉네임
    nickname?: string | null;
    // 프로필 이미지 URL
    profileImageUrl?: string | null;
    // 프로필 이미지 섬네일 URL
    thumbnailImageUrl?: string | null;
}

// 사용자 동의 내역
interface ScopeInfo {
    // 회원번호
    id: number;
    // 동의 항목 목록
    scopes?: Scope[] | null;
}

// 동의 항목별 정보
interface Scope {
    // 동의 여부
    agreed: boolean;
    // 위임 동의 항목 여부
    delegated?: boolean | null;
    // 동의 항목 이름
    displayName: string;
    // 동의항목 ID
    id: string;
    // 철회가능여부
    revocable?: boolean | null;
    // 동의 항목 타입
    type: ScopeType;
    // 현재 사용여부
    using: boolean;
}

// 사용자가 동의한 약관 목록
interface UserServiceTerms {
    // 동의한 약관 항목
    allowedServiceTerms?: ServiceTerms[] | null;
    // 앱 서비스 약관
    appServiceTerms?: AppServiceTerms[] | null;
    // 회원번호
    userId?: number | null;
}

// 약관항목
interface ServiceTerms {
    // 동의시간 (GMT)
    agreedAt: Date;
    // 약관 태그
    tag: string;
}

// 앱에 사용 설정된 서비스 약관 목록
interface AppServiceTerms {
    // 서비스 약관 등록 시간 (GMT)
    createdAt: Date;
    // 약관 태그
    tag: string;
    // 약관 수정 시간 (GMT)
    updatedAt: Date;
}

// 채널 메시지 방식 인증 로그인 파라메터
interface CertLoginWithKakaoAccountParam {
    prompts?: Prompt[] | null;
    state?: string | null;
    nonce?: string | null;
    channelPublicIds?: string[] | null;
    serviceTerms?: string[] | null;
    loginHint?: string | null;
}

// 앱투앱 방식 인증 로그인 파라메터
interface CertLoginWithKakaoTalkParam {
    prompts?: Prompt[] | null;
    state?: string | null;
    requestCode: number,
    nonce?: string | null;
    channelPublicIds?: string[] | null;
    serviceTerms?: string[] | null;
}

// 카카오계정 로그인(웹) 파라메터
interface LoginWithKakaoAccountParam {
    prompts?: Prompt[] | null;
    loginHint?: string | null;
    nonce?: string | null;
    channelPublicIds?: string[] | null;
    serviceTerms?: string[] | null;
    scopes?: string[] | null;
}

// 카카오톡 로그인 파라메터
interface LoginWithKakaoTalkParam {
    requestCode?: number | null;
    nonce?: string | null;
    channelPublicIds?: string[] | null;
    serviceTerms?: string[] | null;
}

// 사용자 정보 조회 파라메터
interface MeParam {
    secureReSource?: boolean | null;
}

// 동의항목 철회 파라메터
interface RevokeScopesParam {
    // 동의항목
    scopes: string[];
}

// 동의항목 목록 조회 파라메터
interface ScopesParam {
    // 동의항목
    scopes?: string[] | null;
}

// 서비스약관 동의 내역 목록 조회 파라메터
interface ServiceTermsParam {
    // 앱에 사용 설정된 서빗 약관 목록을 함께 요청하려면 'app_service_terms' 값을 지정
    extra?: string | null;
}

// 사용자 배송지 목록 조회 파라메터
interface ShippingAddressesParam {
    // 주소ID
    addressId?: number | null;
    // 갱신일시<br>
    // 주소가 많은경우 해당 시각을 기준으로 조회 합니다.
    fromUpdateAt?: Date | null;
    // 페이지 사이즈<br>
    // 한 페이지에 표시될 주소 수(기본:10)
    pageSize?: number | null;
}

// 앱 연결요청 파라메터<br>
// 자동연결이 아닌경우만 사용되며 2018년 이후 앱은 기본 자동연결 됩니다.
interface SignupParam {
    properties?: Map | null;
}

// 사용자 부가정보 설정 파라메터
interface UpdateProfileParam {
    // 부가정보
    properties: Map
}
