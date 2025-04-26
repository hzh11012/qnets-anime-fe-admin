import { HttpClient } from '@/lib/request';
import type {
    RoleListParams,
    RoleListRes,
    RoleCreateParams,
    RoleEditParams,
    RoleDeleteParams
} from '@/types';

const path = '/api/server/role';

const getRoleList = (params: RoleListParams) => {
    return HttpClient.get<RoleListRes>(path, params);
};

const roleCreate = (params: RoleCreateParams) => {
    return HttpClient.post(path, params);
};

const roleEdit = (params: RoleEditParams) => {
    return HttpClient.put(path, params);
};

const roleDelete = (params: RoleDeleteParams) => {
    return HttpClient.delete(path, params);
};

export { getRoleList, roleCreate, roleEdit, roleDelete };
