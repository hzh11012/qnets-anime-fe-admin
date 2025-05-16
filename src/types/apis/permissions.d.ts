interface PermissionListItem {
    id: string;
    name: string;
    permission: string;
    roles: { name: string }[];
    createdAt: string;
}

interface PermissionListRes {
    total: number;
    rows: PermissionListItem[];
}

interface PermissionListParams extends ListParams {}

interface PermissionCreateParams {
    name: string;
    permission: string;
}

interface PermissionDeleteParams {
    id: string;
}

export {
    PermissionListRes,
    PermissionListItem,
    PermissionListParams,
    PermissionCreateParams,
    PermissionDeleteParams
};
