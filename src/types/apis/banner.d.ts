interface BannerListItem {
    id: string;
    animeId: string;
    anime: { name: string; description: string; bannerUrl: string };
    createdAt: string;
}

interface BannerListRes {
    total: number;
    rows: BannerListItem[];
}

interface BannerListParams extends ListParams {}

interface BannerCreateParams {
    animeId: string;
}

interface BannerDeleteParams {
    id: string;
}

export {
    BannerListRes,
    BannerListItem,
    BannerListParams,
    BannerCreateParams,
    BannerDeleteParams
};
