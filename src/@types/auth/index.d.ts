interface OAuthToken {
    accessToken: string;
    accessTokenExpiresIn: number | null;
    accessTokenExpiresAt: Date | null;
    idToken: string | null;
    refreshToken: string;
    refreshTokenExpiresIn: number | null;
    refreshTokenExpiresAt: Date | null;
    scopes: string[] | null
}

interface CertTokenInfo {
    token: OAuthToken;
    txId: string;
}

interface IAuthApi {
    hasToken: () => Promise<boolean>;
    refreshToken: () => Promise<OAuthToken>;
}
