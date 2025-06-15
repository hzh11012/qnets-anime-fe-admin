interface DashboardState {
    userChartTotal: number;
    userChartList: { date: string; [propsName: string]: number }[];
    animeChartTotal: number;
    animeChartList: { date: string; [propsName: string]: number }[];
    commentChartTotal: number;
    commentChartList: { date: string; [propsName: string]: number }[];
    messageChartTotal: number;
    messageChartList: { date: string; [propsName: string]: number }[];
    ratingChartTotal: number;
    ratingChartList: { date: string; [propsName: string]: number }[];
    collectionChartTotal: number;
    collectioChartList: { date: string; [propsName: string]: number }[];
    playChartTotal: number;
    playChartList: { date: string; [propsName: string]: number }[];
    danmakuChartTotal: number;
    danmakuChartList: { date: string; [propsName: string]: number }[];
}

interface DashboardAction {
    setUserChartTotal: (value: DashboardState['userChartTotal']) => void;
    setUserChartList: (value: DashboardState['userChartList']) => void;
    setAnimeChartTotal: (value: DashboardState['animeChartTotal']) => void;
    setAnimeChartList: (value: DashboardState['animeChartList']) => void;
    setCommentChartTotal: (value: DashboardState['commentChartTotal']) => void;
    setCommentChartList: (value: DashboardState['commentChartList']) => void;
    setMessageChartTotal: (value: DashboardState['messageChartTotal']) => void;
    setMessageChartList: (value: DashboardState['messageChartList']) => void;
    setRatingChartTotal: (value: DashboardState['ratingChartTotal']) => void;
    setRatingChartList: (value: DashboardState['ratingChartList']) => void;
    setCollectionChartTotal: (
        value: DashboardState['collectionChartTotal']
    ) => void;
    setCollectionChartList: (
        value: DashboardState['collectioChartList']
    ) => void;
    setPlayChartTotal: (value: DashboardState['playChartTotal']) => void;
    setPlayChartList: (value: DashboardState['playChartList']) => void;
    setDanmakuChartTotal: (value: DashboardState['danmakuChartTotal']) => void;
    setDanmakuChartList: (value: DashboardState['danmakuChartList']) => void;
}

export { DashboardState, DashboardAction };
