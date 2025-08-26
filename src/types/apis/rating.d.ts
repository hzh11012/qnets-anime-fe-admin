interface RatingListItem {
    id: string;
    animeId: string;
    userId: string;
    score: 1 | 2 | 3 | 4 | 5;
    content: string;
    user: {
        nickname: string;
    };
    anime: {
        name: string;
        seasonName: string;
        coverUrl: string;
    };
    createdAt: string;
}

interface RatingListRes {
    total: number;
    rows: RatingListItem[];
}

interface RatingListParams extends ListParams {}

interface RatingEditParams {
    id: string;
    score: string;
    content: string;
}

interface RatingDeleteParams {
    id: string;
}

export {
    RatingListRes,
    RatingListItem,
    RatingListParams,
    RatingEditParams,
    RatingDeleteParams
};
