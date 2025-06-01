import { HttpClient } from '@/lib/request';
import type {
    GuideListParams,
    GuideListRes,
    GuideCreateParams,
    GuideEditParams,
    GuideDeleteParams
} from '@/types';

const path = '/api/server/anime-guides';

const getGuideList = (params: GuideListParams) => {
    return HttpClient.get<GuideListRes>(path, params);
};

const guideCreate = (params: GuideCreateParams) => {
    return HttpClient.post(path, params);
};

const guideEdit = (params: GuideEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const guideDelete = (params: GuideDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getGuideList, guideCreate, guideEdit, guideDelete };
