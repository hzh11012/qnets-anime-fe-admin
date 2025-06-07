import { HttpClient } from '@/lib/request';
import type {
    AnimeListParams,
    AnimeListRes,
    AnimeCreateParams,
    AnimeEditParams,
    AnimeDeleteParams,
    Option
} from '@/types';

const path = '/api/server/animes';

const getAnimeList = (params: AnimeListParams) => {
    return HttpClient.get<AnimeListRes>(path, params);
};

const animeCreate = (params: AnimeCreateParams) => {
    return HttpClient.post(path, params);
};

const animeEdit = (params: AnimeEditParams) => {
    const { id, ...rest } = params;
    return HttpClient.patch(`${path}/${id}`, rest);
};

const animeDelete = (params: AnimeDeleteParams) => {
    const { id } = params;
    return HttpClient.delete(`${path}/${id}`);
};

const getAnimeOptions = () => {
    return HttpClient.get<Option[]>(`${path}/options`);
};

export { getAnimeList, animeCreate, animeEdit, animeDelete, getAnimeOptions };
