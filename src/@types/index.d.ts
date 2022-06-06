interface Map {
    [key: string]: string;
}

interface MapAny {
    [key: string]: string | number | boolean | MapAny
}

interface ApiError {
    code: string;
    message: string;
}

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

interface InitParam {
    appKey?: string | null;
    customScheme?: string | null;
    loggingEnabled?: boolean | null;
    hosts?: ServerHosts | null;
}

interface IKakaoSdk {
    init: (param?: InitParam) => Promise<boolean>;
    isInitialized: () => Promise<boolean>;
}
