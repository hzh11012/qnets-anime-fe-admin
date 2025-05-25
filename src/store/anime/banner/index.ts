import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    BannerListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<BannerListItem> {
    types: Option[];
    sizes: number[];
    allAnimes: Option[];
    setAllAnimes: (animes: Option[]) => void;
}

interface PaginationSlice extends BasePaginationSlice {}

const useBannerTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        types: [
            { label: '动漫名称', value: 'name' },
            { label: '动漫简介', value: 'description' }
        ],
        sizes: [10, 20, 50, 100],
        allAnimes: [],
        setAllAnimes: allAnimes => set(() => ({ allAnimes }))
    })
);

export { useBannerTableStore };
