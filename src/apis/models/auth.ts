export interface UserInfoRes {
    id: string;
    phone: string;
    nickname: string;
    status: number;
    avatar?: string;
    permissions: string[];
    createdAt: string;
    updatedAt: string;
}
