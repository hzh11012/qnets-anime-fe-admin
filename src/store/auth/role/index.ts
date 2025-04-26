import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    RoleListItem
} from '@/types';

interface TableSlice extends BaseTableSlice<RoleListItem> {
    types: {
        label: string;
        value: string;
    }[];
    sizes: number[];
}

interface PaginationSlice extends BasePaginationSlice {}

const useRoleTableStore = create<TableSlice & PaginationSlice>()((...a) => ({
    ...createTableSlice(...a),
    ...createPaginationSlice(...a),
    types: [
        { label: '角色名称', value: 'name' },
        { label: '角色编码', value: 'role' }
    ],
    sizes: [10, 20, 50, 100]
}));

export { useRoleTableStore };
