interface AnimeListItem {
    id: string;
    animeSeriesId: string;
    name: string;
    description: string;
    coverUrl: string;
    bannerUrl: string;
    type: 0 | 1 | 2 | 3 | 4;
    status: 0 | 1 | 2;
    year: number;
    month: 0 | 1 | 2 | 3;
    season: number;
    seasonName?: string;
    director?: string;
    cv?: string;
    animeTags: { id: string; name: string }[];
    averageScore: number;
    collectionCount: number;
    ratingCount: number;
    createdAt: string;
}

interface AnimeListRes {
    total: number;
    rows: AnimeListItem[];
}

interface AnimeListParams extends ListParams {
    status?: string[];
    types?: string[];
    months?: string[];
    years?: string[];
    tags?: string[];
}

interface AnimeCreateParams {
    series: string;
    name: string;
    description: string;
    coverUrl: string;
    bannerUrl: string;
    status: string;
    type: string;
    director?: string;
    cv?: string;
    year: string;
    month: string;
    seasonName?: string;
    season: string;
    tags?: string[];
}

interface AnimeEditParams extends AnimeCreateParams {
    id: string;
}

interface AnimeDeleteParams {
    id: string;
}

export {
    AnimeListRes,
    AnimeListItem,
    AnimeListParams,
    AnimeCreateParams,
    AnimeEditParams,
    AnimeDeleteParams
};
