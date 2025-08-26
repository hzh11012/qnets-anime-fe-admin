interface GuideListItem {
    id: string;
    animeId: string;
    updateDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    updateTime: string;
    anime: {
        name: string;
        seasonName: string;
        status: 0 | 1 | 2;
        coverUrl: string;
        animeTags: { id: string; name: string }[];
    };
    createdAt: string;
}

interface GuideListRes {
    total: number;
    rows: GuideListItem[];
}

interface GuideListParams extends ListParams {
    status?: string[];
    tags?: string[];
    updateDays?: string[];
}

interface GuideCreateParams {
    animeId: string;
    updateDay: string;
    updateTime: string;
}

interface GuideEditParams extends GuideCreateParams {
    id: string;
}

interface GuideDeleteParams {
    id: string;
}

export {
    GuideListRes,
    GuideListItem,
    GuideListParams,
    GuideCreateParams,
    GuideEditParams,
    GuideDeleteParams
};
