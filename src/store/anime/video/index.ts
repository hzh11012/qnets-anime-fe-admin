import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    VideoListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<VideoListItem> {
    types: Option[];
    sizes: number[];
    allAnimes: Option[];
    setAllAnimes: (animes: Option[]) => void;
}

interface PaginationSlice extends BasePaginationSlice {}

const useVideoTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        types: [
            { label: '动漫名称', value: 'name' },
            { label: '视频链接', value: 'url' }
        ],
        sizes: [10, 20, 50, 100],
        allAnimes: [],
        setAllAnimes: allAnimes => set(() => ({ allAnimes }))
    })
);

export { useVideoTableStore };
