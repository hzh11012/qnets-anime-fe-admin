interface HistoryListItem {
    id: string;
    time: number;
    user: { nickname: string; avatar: string | null };
    video: { episode: number };
    anime: { name: string };
    createdAt: string;
}

interface HistoryListRes {
    total: number;
    rows: HistoryListItem[];
}

interface HistoryListParams extends ListParams {}

interface HistoryDeleteParams {
    id: string;
}

export {
    HistoryListRes,
    HistoryListItem,
    HistoryListParams,
    HistoryDeleteParams
};
