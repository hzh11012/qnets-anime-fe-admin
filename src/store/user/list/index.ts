import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    UserListItem,
    Option
} from '@/types';
import { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface TableSlice extends BaseTableSlice<UserListItem> {
    types: Option[];
    sizes: number[];
    roles: Option[];
    setRoles: (roles: Option[]) => void;
    status: string[];
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
}

interface PaginationSlice extends BasePaginationSlice {}

const useUserTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        type: 'nickname',
        types: [
            { label: '用户昵称', value: 'nickname' },
            { label: '用户邮箱', value: 'email' }
        ],
        sizes: [10, 20, 50, 100],
        roles: [],
        setRoles: roles => set(() => ({ roles })),
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

export { useUserTableStore };
