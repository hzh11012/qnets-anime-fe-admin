import { HttpClient } from '@/lib/request';
import type {
    BannerListParams,
    BannerListRes,
    BannerCreateParams,
    BannerDeleteParams
} from '@/types';

const path = '/api/server/anime-banners';

const getBannerList = (params: BannerListParams) => {
    return HttpClient.get<BannerListRes>(path, params);
};

const bannerCreate = (params: BannerCreateParams) => {
    return HttpClient.post(path, params);
};

const bannerDelete = (params: BannerDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getBannerList, bannerCreate, bannerDelete };
