interface DanmakuListItem {
    id: string;
    text: string;
    mode: 0 | 1 | 2;
    color: string;
    time: number;
    user: { nickname: string; avatar: string | null };
    video: { episode: number; anime: { name: string; seasonName: string } };
    createdAt: string;
}

interface DanmakuListRes {
    total: number;
    rows: DanmakuListItem[];
}

interface DanmakuListParams extends ListParams {
    modes?: string[];
}

interface DanmakuDeleteParams {
    id: string;
}

export {
    DanmakuListRes,
    DanmakuListItem,
    DanmakuListParams,
    DanmakuDeleteParams
};
