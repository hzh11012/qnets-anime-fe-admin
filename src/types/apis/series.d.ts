interface SeriesListItem {
    id: string;
    name: string;
    animes: { name: string }[];
    createdAt: string;
}

interface SeriesListRes {
    total: number;
    rows: SeriesListItem[];
}

interface SeriesListParams extends ListParams {}

interface SeriesCreateParams {
    name: string;
}

interface SeriesDeleteParams {
    id: string;
}

export {
    SeriesListRes,
    SeriesListItem,
    SeriesListParams,
    SeriesCreateParams,
    SeriesDeleteParams
};
