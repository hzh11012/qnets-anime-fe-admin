import { HttpClient } from '@/lib/request';
import type {
    NoticeListParams,
    NoticeListRes,
    NoticeCreateParams,
    NoticeEditParams,
    NoticeDeleteParams
} from '@/types';

const path = '/api/server/notices';

const getNoticeList = (params: NoticeListParams) => {
    return HttpClient.get<NoticeListRes>(path, params);
};

const noticeCreate = (params: NoticeCreateParams) => {
    return HttpClient.post(path, params);
};

const noticeEdit = (params: NoticeEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const noticeDelete = (params: NoticeDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getNoticeList, noticeCreate, noticeEdit, noticeDelete };
