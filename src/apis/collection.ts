import { HttpClient } from '@/lib/request';
import type {
    CollectionListParams,
    CollectionListRes,
    CollectionDeleteParams
} from '@/types';

const path = '/api/server/anime-collections';

const getCollectionList = (params: CollectionListParams) => {
    return HttpClient.get<CollectionListRes>(path, params);
};

const collectionDelete = (params: CollectionDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

export { getCollectionList, collectionDelete };
