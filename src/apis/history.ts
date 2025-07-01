import { HttpClient } from '@/lib/request';
import type {
    HistoryListParams,
    HistoryListRes,
    HistoryDeleteParams
} from '@/types';

const path = '/api/server/video-histories';

const getHistoryList = (params: HistoryListParams) => {
    return HttpClient.get<HistoryListRes>(path, params);
};

const historyDelete = (params: HistoryDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getHistoryList, historyDelete };
