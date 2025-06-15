interface ChartListItem {
    date: string;
    [propsName: string]: number;
}

interface ChartListRes {
    total: number;
    rows: ChartListItem[];
}

export { ChartListRes };
