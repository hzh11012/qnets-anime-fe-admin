import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    MessageListItem,
    Option
} from '@/types';
import type { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface TableSlice extends BaseTableSlice<MessageListItem> {
    searchTypes: Option[];
    sizes: number[];
    status: string[];
    types: string[];
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
}

interface PaginationSlice extends BasePaginationSlice {}

const useMessageTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        type: 'content',
        searchTypes: [
            { label: '留言内容', value: 'content' },
            { label: '回复内容', value: 'reply' }
        ],
        sizes: [10, 20, 50, 100],
        status: [],
        types: [],
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
                        []) as string[]
                };
            });
        }
    })
);

export { useMessageTableStore };
