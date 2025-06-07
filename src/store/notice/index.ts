import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    NoticeListItem,
    Option
} from '@/types';
import { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface TableSlice extends BaseTableSlice<NoticeListItem> {
    types: Option[];
    sizes: number[];
    status: string[];
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
}

interface PaginationSlice extends BasePaginationSlice {}

const useNoticeTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        type: 'title',
        types: [
            { label: '公告标题', value: 'title' },
            { label: '公告内容', value: 'content' }
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
        }
    })
);

export { useNoticeTableStore };
