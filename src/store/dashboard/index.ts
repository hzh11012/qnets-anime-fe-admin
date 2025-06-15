import { create } from 'zustand';
import type { DashboardState, DashboardAction } from '@/types';

const useDashboardStore = create<DashboardState & DashboardAction>(set => ({
    userChartTotal: 0,
    userChartList: [],
    setUserChartTotal: value => {
        set(() => ({ userChartTotal: value }));
    },
    setUserChartList: value => {
        set(() => ({ userChartList: value }));
    },
    animeChartTotal: 0,
    animeChartList: [],
    setAnimeChartTotal: value => {
        set(() => ({ animeChartTotal: value }));
    },
    setAnimeChartList: value => {
        set(() => ({ animeChartList: value }));
    },
    commentChartTotal: 0,
    commentChartList: [],
    setCommentChartTotal: value => {
        set(() => ({ commentChartTotal: value }));
    },
    setCommentChartList: value => {
        set(() => ({ commentChartList: value }));
    },
    messageChartTotal: 0,
    messageChartList: [],
    setMessageChartTotal: value => {
        set(() => ({ messageChartTotal: value }));
    },
    setMessageChartList: value => {
        set(() => ({ messageChartList: value }));
    },
    ratingChartTotal: 0,
    ratingChartList: [],
    setRatingChartTotal: value => {
        set(() => ({ ratingChartTotal: value }));
    },
    setRatingChartList: value => {
        set(() => ({ ratingChartList: value }));
    },
    collectionChartTotal: 0,
    collectioChartList: [],
    setCollectionChartTotal: value => {
        set(() => ({ collectionChartTotal: value }));
    },
    setCollectionChartList: value => {
        set(() => ({ collectioChartList: value }));
    },
    playChartTotal: 0,
    playChartList: [],
    setPlayChartTotal: value => {
        set(() => ({ playChartTotal: value }));
    },
    setPlayChartList: value => {
        set(() => ({ playChartList: value }));
    },
    danmakuChartTotal: 0,
    danmakuChartList: [],
    setDanmakuChartTotal: value => {
        set(() => ({ danmakuChartTotal: value }));
    },
    setDanmakuChartList: value => {
        set(() => ({ danmakuChartList: value }));
    }
}));

export { useDashboardStore };
