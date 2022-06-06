type StoryPermission = 'A' | 'F' | 'M'
type MediaType = "NOT_SUPPORTED" | "NOTE" | "PHOTO"
type Emotion = "NOT_DEFINED" | "LIKE" | "COOL" | "HAPPY" | "SAD" | "CHEER_UP"

interface StoryMedia {
    original?: string | null;
    xlarge?: string | null;
    large?: string | null;
    medium?: string | null;
    small?: string | null;
}

interface StoryComment {
    text: string;
    writer: StoryActor
}

interface StoryActor {
    displayName: string;
    profileThumbnailUrl?: string | null;
}

interface StoryLike {
    emotion: Emotion;
    actor: StoryActor;
}

interface LinkInfo {
    url?: string | null;
    requestedUrl?: string | null;
    host?: string | null;
    title?: string | null;
    image?: string[] | null;
    description?: string | null;
    section?: string | null;
    type?: string | null;
}

interface Story {
    id: string;
    url: string;
    mediaType?: MediaType | null;
    createdAt: Date;
    content?: string | null;
    media?: StoryMedia[] | null;
    commentCount: number;
    likeCount: number;
    permission?: StoryPermission | null;
    comments?: StoryComment[] | null;
    likes?: StoryLike[] | null;
}

interface StoryProfile {
    nickname?: string | null;
    profileImageUrl?: string | null;
    thumbnailUrl?: string | null;
    bgImageUrl?: string | null;
    permalink?: string | null;
    birthday?: string | null;
    birthdayType?: BirthdayType;
}

interface DeleteStoryParam {
    id: string
}

interface LinkInfoParam {
    url: string
}

interface PostLinkParam {
    content: string;
    linkInfo: LinkInfo;
    permission: StoryPermission;
    enableShare?: boolean | null;
    androidExecParam?: Map | null;
    iosExecParam?: Map | null;
    androidMarketParam?: Map | null;
    iosMarketParam?: Map | null;
}

interface PostNoteParam {
    content: string;
    permission: StoryPermission;
    enableShare?: boolean | null;
    androidExecParam?: Map | null;
    iosExecParam?: Map | null;
    androidMarketParam?: Map | null;
    iosMarketParam?: Map | null;
}

interface PostPhotoParam {
    content: string;
    imagePaths: string[];
    permission: StoryPermission;
    enableShare?: boolean | null;
    androidExecParam?: Map | null;
    iosExecParam?: Map | null;
    androidMarketParam?: Map | null;
    iosMarketParam?: Map | null;
}

interface ProfileParam {
    secureResource: boolean
}

interface StoriesParam {
    lastId?: string | null
}

interface StoryParam {
    id: string
}

interface StoryUploadParam {
    images: string[]
}

interface IStoryApi {
    delete: (param: DeleteStoryParam) => Promise<boolean>;
    isStoryUser: () => Promise<boolean>;
    linkInfo: (param: LinkInfoParam) => Promise<LinkInfo>;
    postLink: (param: PostLinkParam) => Promise<string>;
    postNote: (param: PostNoteParam) => Promise<string>;
    postPhoto: (param: PostPhotoParam) => Promise<string>;
    profile: (param?: ProfileParam) => Promise<StoryProfile>;
    stories: (param?: StoriesParam) => Promise<Story[]>;
    story: (param: StoryParam) => Promise<Story>;
    upload: (param: StoryUploadParam) => Promise<string[]>;
}
