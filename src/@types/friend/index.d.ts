type PickerServiceTypeFilter =
    | 'talk'
    | 'story'
    | 'talkstory'

type ViewAppearance =
    | 'auto'
    | 'light'
    | 'dark'


type PickerOrientation =
    | 'portrait'
    | 'landscape'
    | 'auto'

interface OpenPickerFriendRequestParams {
    title?: String | null;
    serviceTypeFilter?: PickerServiceTypeFilter | null;
    viewAppearance?: ViewAppearance | null;
    orientation?: PickerOrientation | null;
    enableSearch?: boolean | null;
    showMyProfile?: boolean | null;
    showFavorite?: boolean | null;
    showPickedFriend?: boolean | null;
    maxPickableCount?: number | null;
    minPickableCount?: number | null;
}

interface SelectedUser {
    id?: number;
    uuid: string;
    profileNickname?: string;
    profileThumbnailImage?: string;
    favorite?: boolean
}

interface SelectedUsers {
    totalCount: number;
    users?: SelectedUser[];
}

interface IPickerApi {
    selectFriend: (param?: OpenPickerFriendRequestParams) => Promise<SelectedUsers>;
    selectFriendPopup: (param?: OpenPickerFriendRequestParams) => Promise<SelectedUsers>;
    selectFriends: (param?: OpenPickerFriendRequestParams) => Promise<SelectedUsers>;
    selectFriendsPopup: (param?: OpenPickerFriendRequestParams) => Promise<SelectedUsers>;
}
