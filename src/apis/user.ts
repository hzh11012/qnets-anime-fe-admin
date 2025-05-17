import { HttpClient } from '@/lib/request';
import type { UserListParams, UserListRes, UserEditParams } from '@/types';

const path = '/api/server/users';

const getUserList = (params: UserListParams) => {
    return HttpClient.get<UserListRes>(path, params);
};

const userEdit = (params: UserEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

export { getUserList, userEdit };
