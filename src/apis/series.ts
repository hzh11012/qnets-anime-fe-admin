import { HttpClient } from '@/lib/request';
import type {
    SeriesListParams,
    SeriesListRes,
    SeriesCreateParams,
    SeriesDeleteParams
} from '@/types';

const path = '/api/server/anime-series';

const getSeriesList = (params: SeriesListParams) => {
    return HttpClient.get<SeriesListRes>(path, params);
};

const seriesCreate = (params: SeriesCreateParams) => {
    return HttpClient.post(path, params);
};

const seriesDelete = (params: SeriesDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getSeriesList, seriesCreate, seriesDelete };
