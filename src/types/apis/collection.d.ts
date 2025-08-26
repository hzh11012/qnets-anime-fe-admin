interface CollectionListItem {
    id: string;
    animeId: string;
    userId: string;
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

interface CollectionListRes {
    total: number;
    rows: CollectionListItem[];
}

interface CollectionListParams extends ListParams {}

interface CollectionDeleteParams {
    id: string;
}

export {
    CollectionListRes,
    CollectionListItem,
    CollectionListParams,
    CollectionDeleteParams
};
