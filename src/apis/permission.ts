import { HttpClient } from '@/lib/request';
import type { PermissionListParams, PermissionListRes } from '@/types';

const path = '/api/server/permissions';

const getPermissionList = (params: PermissionListParams) => {
    return HttpClient.get<PermissionListRes>(path, params);
};

export { getPermissionList };
