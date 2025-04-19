import { HttpClient, AuthClient } from '@/lib/request';
import { UserInfoRes } from '@/apis/models/auth';

const getUserInfo = () => {
    return HttpClient.get<UserInfoRes>('/api/server/user/info');
};

const logout = () => {
    return AuthClient.post('/api/sso/logout');
};

export { getUserInfo, logout };
