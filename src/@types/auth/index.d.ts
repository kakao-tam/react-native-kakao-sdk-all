// 카카오 로그인을 통해 발급 받은 토큰
interface OAuthToken {
    // API 인증에 사용하는 접근 토큰
    accessToken: string;
    // 접근 토큰 만료 까지 남은 시간 (초)
    accessTokenExpiresIn: number | null;
    // 접근 토큰 만료 시각
    accessTokenExpiresAt: Date | null;
    // OIDC(OpenID Connect) ID 토큰
    idToken: string | null;
    // 리프레시 토큰
    refreshToken: string;
    // 리프레시 토큰 만료 까지 남은 시간 (초)
    refreshTokenExpiresIn: number | null;
    // 리프레시 토큰 만료 시각
    refreshTokenExpiresAt: Date | null;
    // 토큰에 부여된 scope 목록
    scopes: string[] | null
}

// 카카오톡 인증 로그인을 통해 발급 받은 토큰 및 전자서명 접수 번호
interface CertTokenInfo {
    // 토큰 정보
    token: OAuthToken;
    // 전자서명 접수 번호
    txId: string;
}
