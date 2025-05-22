import { HttpClient } from '@/lib/request';
import type {
    TagListParams,
    TagListRes,
    TagCreateParams,
    TagDeleteParams
} from '@/types';

const path = '/api/server/anime-tags';

const getTagList = (params: TagListParams) => {
    return HttpClient.get<TagListRes>(path, params);
};

const tagCreate = (params: TagCreateParams) => {
    return HttpClient.post(path, params);
};

const tagDelete = (params: TagDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getTagList, tagCreate, tagDelete };
