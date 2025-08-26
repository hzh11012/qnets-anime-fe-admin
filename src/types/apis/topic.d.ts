interface TopicListItem {
    id: string;
    name: string;
    description: string;
    coverUrl: string;
    status: 0 | 1;
    animes: { id: string; name: string; seasonName: string }[];
    createdAt: string;
}

interface TopicListRes {
    total: number;
    rows: TopicListItem[];
}

interface TopicListParams extends ListParams {
    status?: string[];
}

interface TopicCreateParams {
    name: string;
    description: string;
    coverUrl: string;
    status: string;
    animes?: string[];
}

interface TopicEditParams extends TopicCreateParams {
    id: string;
}

interface TopicDeleteParams {
    id: string;
}

export {
    TopicListRes,
    TopicListItem,
    TopicListParams,
    TopicCreateParams,
    TopicEditParams,
    TopicDeleteParams
};
