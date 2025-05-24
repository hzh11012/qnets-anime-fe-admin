import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    AnimeListItem,
    Option
} from '@/types';
import { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface TableSlice extends BaseTableSlice<AnimeListItem> {
    searchTypes: Option[];
    sizes: number[];
    status: string[];
    types: string[];
    months: string[];
    years: string[];
    tags: string[];
    allTags: Option[];
    setAllTags: (sorting: Option[]) => void;
    allSeries: Option[];
    setAllSeries: (sorting: Option[]) => void;
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
}

interface PaginationSlice extends BasePaginationSlice {}

const useAnimeTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        type: 'name',
        searchTypes: [
            { label: '动漫名称', value: 'name' },
            { label: '动漫简介', value: 'description' },
            { label: '动漫季名', value: 'seasonName' },
            { label: '动漫导演', value: 'director' },
            { label: '动漫声优', value: 'cv' }
        ],
        sizes: [10, 20, 50, 100],
        status: [],
        types: [],
        months: [],
        years: [],
        tags: [],
        columnFilters: [],
        setColumnFilters: updater => {
            set(state => {
                const base = state.columnFilters;
                const next =
                    typeof updater === 'function' ? updater(base) : updater;
                return {
                    columnFilters: next,
                    status: (next.find(item => item.id === 'status')?.value ||
                        []) as string[],
                    types: (next.find(item => item.id === 'type')?.value ||
                        []) as string[],
                    months: (next.find(item => item.id === 'month')?.value ||
                        []) as string[],
                    years: (next.find(item => item.id === 'year')?.value ||
                        []) as string[],
                    tags: (next.find(item => item.id === 'animeTags')?.value ||
                        []) as string[]
                };
            });
        },
        allTags: [],
        setAllTags: allTags => set(() => ({ allTags })),
        allSeries: [],
        setAllSeries: allSeries => set(() => ({ allSeries }))
    })
);

export { useAnimeTableStore };
