import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    GuideListItem,
    Option
} from '@/types';
import type { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface TableSlice extends BaseTableSlice<GuideListItem> {
    types: Option[];
    sizes: number[];
    updateDays: string[];
    status: string[];
    tags: string[];
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
    allAnimes: Option[];
    setAllAnimes: (animes: Option[]) => void;
    allTags: Option[];
    setAllTags: (tags: Option[]) => void;
}

interface PaginationSlice extends BasePaginationSlice {}

const useGuideTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        types: [{ label: '动漫名称', value: 'name' }],
        sizes: [10, 20, 50, 100],
        updateDays: [],
        status: [],
        tags: [],
        columnFilters: [],
        setColumnFilters: updater => {
            set(state => {
                const base = state.columnFilters;
                const next =
                    typeof updater === 'function' ? updater(base) : updater;

                return {
                    columnFilters: next,
                    updateDays: (next.find(item => item.id === 'updateDay')
                        ?.value || []) as string[],
                    status: (next.find(item => item.id === 'anime_status')
                        ?.value || []) as string[],
                    tags: (next.find(item => item.id === 'anime_animeTags')
                        ?.value || []) as string[]
                };
            });
        },
        allAnimes: [],
        setAllAnimes: allAnimes => set(() => ({ allAnimes })),
        allTags: [],
        setAllTags: allTags => set(() => ({ allTags }))
    })
);

export { useGuideTableStore };
