// Map<String, String>
interface Map {
    [key: string]: string;
}

// Map<String, Object>
interface MapAny {
    [key: string]: string | number | boolean | MapAny
}

// 예외 규격
interface ApiError {
    // API 에러코드
    code: string;
    // 에러 메시지
    message: string;
}

// 특수한 경우에만 사용됩니다.
interface ServerHosts {
    kapi: string;
    dapi: string;
    kauth: string;
    auth: string;
    talkAuth: string;
    channel: string;
    talkLink: string;
    talkLinkVersion: string;
    sharerLink: string;
}

// 초기화 파라메터<br>
// 특별한 경우에만 사용됩니다. KAKAO_NATIVE_APP_KEY 리소스를 설정하고 이 파라메터는 사용하지 않는 것을 권장 드립니다.
interface InitParam {
    appKey?: string | null;
    customScheme?: string | null;
    loggingEnabled?: boolean | null;
    hosts?: ServerHosts | null;
}
