import { HttpClient } from '@/lib/request';
import type {
    MessageListParams,
    MessageListRes,
    MessageEditParams,
    MessageDeleteParams
} from '@/types';

const path = '/api/server/messages';

const getMessageList = (params: MessageListParams) => {
    return HttpClient.get<MessageListRes>(path, params);
};

const messageEdit = (params: MessageEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const messageDelete = (params:  MessageDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getMessageList, messageEdit, messageDelete };
