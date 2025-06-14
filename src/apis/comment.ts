import { HttpClient } from '@/lib/request';
import type {
    CommentListParams,
    CommentListRes,
    CommentEditParams,
    CommentDeleteParams
} from '@/types';

const path = '/api/server/video-comments';

const getCommentList = (params: CommentListParams) => {
    return HttpClient.get<CommentListRes>(path, params);
};

const commentEdit = (params: CommentEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const commentDelete = (params: CommentDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getCommentList, commentEdit, commentDelete };
