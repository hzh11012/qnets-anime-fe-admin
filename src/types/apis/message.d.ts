interface MessageListItem {
    id: string;
    content: string;
    reply: string;
    status: 0 | 1 | 2 | 3;
    type: 0 | 1 | 2 | 3;
    user: { nickname: string };
    createdAt: string;
}

interface MessageListRes {
    total: number;
    rows: MessageListItem[];
}

interface MessageListParams extends ListParams {
    status?: string[];
    types?: string[];
}

interface MessageEditParams {
    id: string;
    reply: string;
    status: string;
    type: string;
}

interface MessageDeleteParams {
    id: string;
}

export {
    MessageListRes,
    MessageListItem,
    MessageListParams,
    MessageEditParams,
    MessageDeleteParams
};
