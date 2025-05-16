import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    PermissionListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<PermissionListItem> {
    types: Option[];
    sizes: number[];
}

interface PaginationSlice extends BasePaginationSlice {}

const usePermissionTableStore = create<TableSlice & PaginationSlice>()(
    (...a) => ({
        ...createTableSlice(...a),
        ...createPaginationSlice(...a),
        types: [
            { label: '权限名称', value: 'name' },
            { label: '权限编码', value: 'permission' }
        ],
        sizes: [10, 20, 50, 100]
    })
);

export { usePermissionTableStore };
