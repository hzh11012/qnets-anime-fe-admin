import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    DanmakuListItem,
    Option
} from '@/types';
import type { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface TableSlice extends BaseTableSlice<DanmakuListItem> {
    types: Option[];
    sizes: number[];
    modes: string[];
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
}

interface PaginationSlice extends BasePaginationSlice {}

const useDanmakuTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        type: 'nickname',
        types: [
            { label: '用户昵称', value: 'nickname' },
            { label: '弹幕内容', value: 'text' },
            { label: '动漫名称', value: 'animeName' }
        ],
        sizes: [10, 20, 50, 100],
        modes: [],
        columnFilters: [],
        setColumnFilters: updater => {
            set(state => {
                const base = state.columnFilters;
                const next =
                    typeof updater === 'function' ? updater(base) : updater;

                return {
                    columnFilters: next,
                    modes: (next.find(item => item.id === 'mode')?.value ||
                        []) as string[]
                };
            });
        }
    })
);

export { useDanmakuTableStore };
