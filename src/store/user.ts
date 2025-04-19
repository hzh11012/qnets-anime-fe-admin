import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserInfoRes } from '@/apis/models/auth';

interface State {
    userInfo: UserInfoRes;
}

interface Action {
    setUserInfo: (value: State['userInfo']) => void;
}

const userStore = create(
    persist<State & Action>(
        set => ({
            userInfo: {
                id: '',
                phone: '',
                nickname: '',
                status: 0,
                avatar: '',
                createdAt: '',
                updatedAt: ''
            },
            setUserInfo: value => {
                set(() => ({ userInfo: value }));
            }
        }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export { userStore };
