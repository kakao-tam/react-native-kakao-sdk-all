// 카카오톡 공유 호출 결과
interface LinkResult {
    // 카카오톡 공유를 실행할 수 있는 URL
    url: string;
    // 템플릿 검증 결과
    warningMsg?: Map | null;
    // 템플릿 사용자 파라메터 검증 결과
    argumentMsg?: Map | null;
}

// 이미지 업로드, 스크랩 요청 결과
interface ImageUploadResult {
    // 업로드된 이미지 정보
    infos: ImageInfos
}

// 업로드된 이미지 정보
interface ImageInfos {
    // 원본 이미지
    original: ImageInfo
}

// 이미지 정보
interface ImageInfo {
    // 업로드 된 이미지의 URL
    url: string;
    // 업로드 된 이미지의 Content-Type
    contentType: string;
    // 업로드 된 이미지의 용량 (단위: 바이트)
    length: number;
    // 업로드 된 이미지의 너비 (단위: 픽셀)
    width: number;
    // 업로드 된 이미지의 높이 (단위: 픽셀)
    height: number;
}

// 커스텀 템플릿 공유 파라메터
interface CustomTemplateParam {
    // 템플릿 ID
    templateId: number;
    // 템플릿 사용자 파라메터
    templateArgs?: Map | null;
    // 콜백 파라메터
    serverCallbackArgs?: Map | null;
}

// 기본 템플릿 공유 파라메터
interface DefaultTemplateParam {
    // 템플릿
    templateObject: Templatable;
    // 콜백 파라메터
    serverCallbackArgs?: Map | null;
}

// 스크랩 공유 파라메터
interface ScrapImageParam {
    // 이미지를 스크랩할 경로 URL
    imageUrl: string;
    // URL을 https로 받을지 여부 (기본값 true)
    secureResource?: boolean | null;
}

// 스크랩 템플릿 공유 파라메터
interface ScrapTemplateParam {
    // 이미지를 스크랩할 경로 URL
    requestUrl: string;
    // 템플릿 ID
    templateId?: number | null;
    // 템플릿 사용자 파라메터
    templateArgs?: Map | null;
}

// 이미지 업로드
interface UploadImageParam {
    // 로컬 이미지 경로
    image: string;
    // URL을 https로 받을지 여부 (기본값 true)
    secureResource?: bool | null;
}
