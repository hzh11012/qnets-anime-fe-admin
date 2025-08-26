interface VideoListItem {
    id: string;
    animeId: string;
    anime: {
        name: string;
        seasonName: string;
        coverUrl: string;
    };
    title?: string;
    episode: number;
    playCount: number;
    url: string;
    createdAt: string;
}

interface VideoListRes {
    total: number;
    rows: VideoListItem[];
}

interface VideoListParams extends ListParams {}

interface VideoCreateParams {
    animeId: string;
    title?: string;
    episode: number;
    url: string;
}

interface VideoEditParams extends VideoCreateParams {
    id: string;
}

interface VideoDeleteParams {
    id: string;
}

export {
    VideoListRes,
    VideoListItem,
    VideoListParams,
    VideoCreateParams,
    VideoEditParams,
    VideoDeleteParams
};
