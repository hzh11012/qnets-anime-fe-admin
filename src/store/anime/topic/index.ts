import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    TopicListItem,
    Option
} from '@/types';
import type { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface TableSlice extends BaseTableSlice<TopicListItem> {
    types: Option[];
    sizes: number[];
    status: string[];
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
    allAnimes: Option[];
    setAllAnimes: (animes: Option[]) => void;
}

interface PaginationSlice extends BasePaginationSlice {}

const useTopicTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        types: [
            { label: '专题名称', value: 'name' },
            {
                label: '专题简介',
                value: 'description'
            }
        ],
        sizes: [10, 20, 50, 100],
        status: [],
        columnFilters: [],
        setColumnFilters: updater => {
            set(state => {
                const base = state.columnFilters;
                const next =
                    typeof updater === 'function' ? updater(base) : updater;

                return {
                    columnFilters: next,
                    status: (next.find(item => item.id === 'status')?.value ||
                        []) as string[]
                };
            });
        },
        allAnimes: [],
        setAllAnimes: allAnimes => set(() => ({ allAnimes }))
    })
);

export { useTopicTableStore };
