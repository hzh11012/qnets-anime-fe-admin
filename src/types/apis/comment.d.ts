interface CommentListItem {
    id: string;
    content: string;
    likeCount: number;
    replyCount: number;
    parent: { content: string } | null;
    user: { nickname: string; avatar: string | null };
    video: { episode: number; anime: { name: string } };
    createdAt: string;
}

interface CommentListRes {
    total: number;
    rows: CommentListItem[];
}

interface CommentListParams extends ListParams {}

interface CommentEditParams {
    id: string;
    content: string;
}

interface CommentDeleteParams {
    id: string;
}

export {
    CommentListRes,
    CommentListItem,
    CommentListParams,
    CommentEditParams,
    CommentDeleteParams
};
