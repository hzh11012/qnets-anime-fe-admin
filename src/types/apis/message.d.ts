interface MessageListItem {
    id: string;
    content: string;
    reply: string;
    status: number;
    type: number;
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
