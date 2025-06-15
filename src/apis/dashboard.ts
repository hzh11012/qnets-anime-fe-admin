import { HttpClient } from '@/lib/request';
import type { ChartListRes } from '@/types';

const path = '/api/server/dashboard';

const getUserChartList = () => {
    return HttpClient.get<ChartListRes>(`${path}/users`);
};

const getAnimeChartList = () => {
    return HttpClient.get<ChartListRes>(`${path}/animes`);
};

const getCommentChartList = () => {
    return HttpClient.get<ChartListRes>(`${path}/comments`);
};

const getMessageChartList = () => {
    return HttpClient.get<ChartListRes>(`${path}/messages`);
};

const getRatingChartList = () => {
    return HttpClient.get<ChartListRes>(`${path}/ratings`);
};

const getCollectionChartList = () => {
    return HttpClient.get<ChartListRes>(`${path}/collections`);
};

const getPlayChartList = () => {
    return HttpClient.get<ChartListRes>(`${path}/plays`);
};

const getDanmakuChartList = () => {
    return HttpClient.get<ChartListRes>(`${path}/danmakus`);
};

export {
    getUserChartList,
    getAnimeChartList,
    getCommentChartList,
    getMessageChartList,
    getRatingChartList,
    getCollectionChartList,
    getPlayChartList,
    getDanmakuChartList
};
