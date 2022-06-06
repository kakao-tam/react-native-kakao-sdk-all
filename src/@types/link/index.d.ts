interface LinkResult {
    url: string;
    warningMsg?: Map | null;
    argumentMsg?: Map | null;
}

interface ImageUploadResult {
    infos: ImageInfos
}

interface ImageInfos {
    original: ImageInfo
}

interface ImageInfo {
    url: string;
    contentType: string;
    length: number;
    width: number;
    height: number;
}

interface CustomTemplateParam {
    templateId: number;
    templateArgs?: Map | null;
    serverCallbackArgs?: Map | null;
}

interface DefaultTemplateParam {
    templateObject: Templatable;
    serverCallbackArgs?: Map | null;
}

interface ScrapImageParam {
    imageUrl: string;
    secureResource?: boolean | null;
}

interface ScrapTemplateParam {
    requestUrl: string;
    templateId?: number | null;
    templateArgs?: Map | null;
}

interface UploadImageParam {
    image: string;
    secureResource?: bool | null;
}

interface ILinkApi {
    customTemplate: (param: CustomTemplateParam) => Promise<LinkResult>;
    defaultTemplate: (param: DefaultTemplateParam) => Promise<LinkResult>;
    scrapImage: (param: ScrapImageParam) => Promise<ImageUploadResult>;
    scrapTemplate: (param: ScrapTemplateParam) => Promise<LinkResult>;
    uploadImage: (param: UploadImageParam) => Promise<ImageUploadResult>;
}
