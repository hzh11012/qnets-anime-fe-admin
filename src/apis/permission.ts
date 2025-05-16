import { HttpClient } from '@/lib/request';
import type {
    PermissionListParams,
    PermissionListRes,
    PermissionCreateParams,
    PermissionDeleteParams
} from '@/types';

const path = '/api/server/permissions';

const getPermissionList = (params: PermissionListParams) => {
    return HttpClient.get<PermissionListRes>(path, params);
};

const permissionCreate = (params: PermissionCreateParams) => {
    return HttpClient.post(path, params);
};

const permissionDelete = (params: PermissionDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getPermissionList, permissionCreate, permissionDelete };
