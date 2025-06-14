import { HttpClient } from '@/lib/request';
import type {
    DanmakuListParams,
    DanmakuListRes,
    DanmakuDeleteParams
} from '@/types';

const path = '/api/server/danmakus';

const getDanmakuList = (params: DanmakuListParams) => {
    return HttpClient.get<DanmakuListRes>(path, params);
};

const danmakuDelete = (params: DanmakuDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getDanmakuList, danmakuDelete };
