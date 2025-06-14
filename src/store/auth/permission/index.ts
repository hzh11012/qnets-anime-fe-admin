import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    PermissionListItem,
    Option
} from '@/types';
import type { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface TableSlice extends BaseTableSlice<PermissionListItem> {
    types: Option[];
    sizes: number[];
    systems: string[];
    columnFilters: ColumnFiltersState;
    setColumnFilters?: OnChangeFn<ColumnFiltersState>;
}

interface PaginationSlice extends BasePaginationSlice {}

const usePermissionTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        types: [
            { label: '权限名称', value: 'name' },
            { label: '权限编码', value: 'permission' }
        ],
        sizes: [10, 20, 50, 100],
        systems: [],
        columnFilters: [],
        setColumnFilters: updater => {
            set(state => {
                const base = state.columnFilters;
                const next =
                    typeof updater === 'function' ? updater(base) : updater;

                return {
                    columnFilters: next,
                    systems: (next.find(item => item.id === 'system')?.value ||
                        []) as string[]
                };
            });
        }
    })
);

export { usePermissionTableStore };
