interface TagListItem {
    id: string;
    name: string;
    animes: { name: string }[];
    createdAt: string;
}

interface TagListRes {
    total: number;
    rows: TagListItem[];
}

interface TagListParams extends ListParams {}

interface TagCreateParams {
    name: string;
}

interface TagDeleteParams {
    id: string;
}

export {
    TagListRes,
    TagListItem,
    TagListParams,
    TagCreateParams,
    TagDeleteParams
};
