import { HttpClient } from '@/lib/request';
import type {
    PermissionListParams,
    PermissionListRes,
    PermissionCreateParams,
    PermissionDeleteParams,
    Option
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

const getPermissionOptions = () => {
    return HttpClient.get<Option[]>(`${path}/options`);
};

export {
    getPermissionList,
    permissionCreate,
    permissionDelete,
    getPermissionOptions
};
