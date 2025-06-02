interface RecommendListItem {
    id: string;
    name: string;
    status: 0 | 1;
    animes: { id: string; name: string }[];
    createdAt: string;
}

interface RecommendListRes {
    total: number;
    rows: RecommendListItem[];
}

interface RecommendListParams extends ListParams {
    status?: string[];
}

interface RecommendCreateParams {
    name: string;
    status: string;
    animes?: string[];
}

interface RecommendEditParams extends RecommendCreateParams {
    id: string;
}

interface RecommendDeleteParams {
    id: string;
}

export {
    RecommendListRes,
    RecommendListItem,
    RecommendListParams,
    RecommendCreateParams,
    RecommendEditParams,
    RecommendDeleteParams
};
