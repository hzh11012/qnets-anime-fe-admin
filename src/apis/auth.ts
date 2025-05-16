import { HttpClient, AuthClient } from '@/lib/request';
import type { UserInfoRes } from '@/types';

const getUserInfo = () => {
    return HttpClient.get<UserInfoRes>('/api/server/users/me');
};

const logout = () => {
    return AuthClient.post('/api/sso/logout');
};

export { getUserInfo, logout };
