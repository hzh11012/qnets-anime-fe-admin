import { HttpClient } from '@/lib/request';
import type {
    RoleListParams,
    RoleListRes,
    RoleCreateParams,
    RoleEditParams,
    RoleDeleteParams,
    Option
} from '@/types';

const path = '/api/server/roles';

const getRoleList = (params: RoleListParams) => {
    return HttpClient.get<RoleListRes>(path, params);
};

const roleCreate = (params: RoleCreateParams) => {
    return HttpClient.post(path, params);
};

const roleEdit = (params: RoleEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const roleDelete = (params: RoleDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

const getRoleOptions = () => {
    return HttpClient.get<Option[]>(`${path}/options`);
};

export { getRoleList, roleCreate, roleEdit, roleDelete, getRoleOptions };
