interface UserInfoRes {
    id: string;
    email: string;
    nickname: string;
    status: number;
    avatar?: string;
    permissions: string[];
    createdAt: string;
    updatedAt: string;
}

export { UserInfoRes };
