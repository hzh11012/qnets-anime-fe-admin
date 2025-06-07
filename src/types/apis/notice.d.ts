interface NoticeListItem {
    id: string;
    title: string;
    content: string;
    status: 0 | 1;
    createdAt: string;
}

interface NoticeListRes {
    total: number;
    rows: NoticeListItem[];
}

interface NoticeListParams extends ListParams {
    status?: string[];
}

interface NoticeCreateParams {
    title: string;
    content: string;
    status: string;
}

interface NoticeEditParams extends VideoCreateParams {
    id: string;
}

interface NoticeDeleteParams {
    id: string;
}

export {
    NoticeListRes,
    NoticeListItem,
    NoticeListParams,
    NoticeCreateParams,
    NoticeEditParams,
    NoticeDeleteParams
};
