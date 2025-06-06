import { HttpClient } from '@/lib/request';
import type {
    RatingListParams,
    RatingListRes,
    RatingEditParams,
    RatingDeleteParams
} from '@/types';

const path = '/api/server/anime-ratings';

const getRatingList = (params: RatingListParams) => {
    return HttpClient.get<RatingListRes>(path, params);
};

const ratingEdit = (params: RatingEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const ratingDelete = (params: RatingDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getRatingList, ratingEdit, ratingDelete };
