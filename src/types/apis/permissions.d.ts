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

export { PermissionListRes, PermissionListItem, PermissionListParams };
