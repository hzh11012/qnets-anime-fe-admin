import { HttpClient } from '@/lib/request';
import type {
    TopicListParams,
    TopicListRes,
    TopicCreateParams,
    TopicEditParams,
    TopicDeleteParams
} from '@/types';

const path = '/api/server/anime-topics';

const getTopicList = (params: TopicListParams) => {
    return HttpClient.get<TopicListRes>(path, params);
};

const topicCreate = (params: TopicCreateParams) => {
    return HttpClient.post(path, params);
};

const topicEdit = (params: TopicEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const topicDelete = (params: TopicDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getTopicList, topicCreate, topicEdit, topicDelete };
