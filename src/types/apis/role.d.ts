interface RoleListItem {
    id: string;
    name: string;
    role: string;
    permissions: { id: string; name: string }[];
    users: { nickname: string }[];
    createdAt: string;
}

interface RoleListRes {
    total: number;
    rows: RoleListItem[];
}

interface RoleListParams extends ListParams {}

interface RoleCreateParams {
    name: string;
    role: string;
    permissions?: string[];
}

interface RoleEditParams {
    id: string;
    name: string;
    role: string;
    permissions?: string[];
}

interface RoleDeleteParams {
    id: string;
}

export {
    RoleListRes,
    RoleListItem,
    RoleListParams,
    RoleCreateParams,
    RoleEditParams,
    RoleDeleteParams
};
