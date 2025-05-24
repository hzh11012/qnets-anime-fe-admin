interface UserListItem {
    id: string;
    nickname: string;
    email: string;
    avatar?: string;
    status: 0 | 1;
    roles: { id: string; name: string }[];
    createdAt: string;
}

interface UserListRes {
    total: number;
    rows: UserListItem[];
}

interface UserListParams extends ListParams {
    status?: string[];
}

interface UserEditParams {
    id: string;
    nickname: string;
    status: string;
    roles?: string[];
}

export { UserListItem, UserListRes, UserListParams, UserEditParams };
