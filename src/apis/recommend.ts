import { HttpClient } from '@/lib/request';
import type {
    RecommendListParams,
    RecommendListRes,
    RecommendCreateParams,
    RecommendEditParams,
    RecommendDeleteParams
} from '@/types';

const path = '/api/server/anime-recommends';

const getRecommendList = (params: RecommendListParams) => {
    return HttpClient.get<RecommendListRes>(path, params);
};

const recommendCreate = (params: RecommendCreateParams) => {
    return HttpClient.post(path, params);
};

const recommendEdit = (params: RecommendEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const recommendDelete = (params: RecommendDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getRecommendList, recommendCreate, recommendEdit, recommendDelete };
