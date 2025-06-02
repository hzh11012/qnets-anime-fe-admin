import { HttpClient } from '@/lib/request';
import type {
    VideoListParams,
    VideoListRes,
    VideoCreateParams,
    VideoEditParams,
    VideoDeleteParams
} from '@/types';

const path = '/api/server/videos';

const getVideoList = (params: VideoListParams) => {
    return HttpClient.get<VideoListRes>(path, params);
};

const videoCreate = (params: VideoCreateParams) => {
    return HttpClient.post(path, params);
};

const videoEdit = (params: VideoEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const videoDelete = (params: VideoDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getVideoList, videoCreate, videoEdit, videoDelete };
