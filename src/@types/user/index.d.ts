//
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
type BirthdayType = 'SOLAR' | 'LUNAR' | 'UNKNOWN'
// 성별
type Gender = 'male' | 'female' | 'UNKNOWN'
// 공의 항목 타입 (PRIVACY: 개인정보 보호, SERVICE: 접근권한 관리)
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

interface CertLoginWithKakaoAccountParam {
    prompts?: Prompt[] | null;
    state?: string | null;
    nonce?: string | null;
    channelPublicIds?: string[] | null;
    serviceTerms?: string[] | null;
    loginHint?: string | null;
}

interface CertLoginWithKakaoTalkParam {
    prompts?: Prompt[] | null;
    state?: string | null;
    requestCode: number,
    nonce?: string | null;
    channelPublicIds?: string[] | null;
    serviceTerms?: string[] | null;
}

interface LoginWithKakaoAccountParam {
    prompts?: Prompt[] | null;
    loginHint?: string | null;
    nonce?: string | null;
    channelPublicIds?: string[] | null;
    serviceTerms?: string[] | null;
    scopes?: string[] | null;
}

interface LoginWithKakaoTalkParam {
    requestCode?: number | null;
    nonce?: string | null;
    channelPublicIds?: string[] | null;
    serviceTerms?: string[] | null;
}

interface MeParam {
    secureReSource?: boolean | null;
}

interface RevokeScopesParam {
    scopes: string[];
}

interface ScopesParam {
    scopes?: string[] | null;
}

interface ServiceTermsParam {
    extra?: string | null;
}

interface ShippingAddressesParam {
    addressId?: number | null;
    fromUpdateAt?: Date | null;
    pageSize?: number | null;
}

interface SignupParam {
    properties?: Map | null;
}

interface UpdateProfileParam {
    properties: Map
}

interface IUserApi {
    // 현재 로그인한 사용자의 엑세스 토큰 정보 보기
    accessTokenInfo: () => Promise<AccessTokenInfo>;
    // 채널 메시지 방식 카카오톡 인증 로그인
    certLoginWithKakaoAccount: (param?: CertLoginWithKakaoAccountParam) => Promise<CertTokenInfo>;
    // 앱투앱 방식 카카오톡 인증 로그인
    certLoginWithKakaoTalk: (param?: CertLoginWithKakaoTalkParam) => Promise<CertTokenInfo>;
    // 카카오톡 로그인 가능(철치)여부 검사
    isKakaoTalkLoginAvailable: () => Promise<boolean>;
    // 카카오계정 로그인 (브라우저 이용)
    loginWithKakaoAccount: (param?: LoginWithKakaoAccountParam) => Promise<OAuthToken>;
    // 카카오톡 로그인 (카카오톡 이용)
    loginWithKakaoTalk: (param?: LoginWithKakaoTalkParam) => Promise<OAuthToken>;
    // 현재 토큰을 만료시키고 로그아웃
    logout: () => Promise<boolean>;
    // 사용자 정보 요청
    me: (param?: MeParam) => Promise<User>;
    // 특정 동의항목 철회
    revokeScopes: (param: RevokeScopesParam) => Promise<ScopeInfo>;
    // 사용자 동의 항목 목록 상세
    scopes: (param?: ScopesParam) => Promise<ScopeInfo>;
    // 서비스약관 동의 내역 목록 상세
    serviceTerms: (param?: ServiceTermsParam) => Promise<UserServiceTerms>;
    // 사용자 배송지 목록
    shippingAddresses: (param?: ShippingAddressesParam) => Promise<UserShippingAddresses>;
    // 앱 연결요청(자동연결이 아닌경우)
    signup: (param?: SignupParam) => Promise<boolean>;
    // 연결 끊기
    unlink: () => Promise<boolean>;
    // 사용자 부가정보 추가 및 수정
    updateProfile: (param: UpdateProfileParam) => Promise<boolean>;
}
