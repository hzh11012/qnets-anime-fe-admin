import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    RoleListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<RoleListItem> {
    types: Option[];
    sizes: number[];
    permissions: Option[];
    setPermissions: (permissions: Option[]) => void;
}

interface PaginationSlice extends BasePaginationSlice {}

const useRoleTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        types: [
            { label: '角色名称', value: 'name' },
            { label: '角色编码', value: 'role' }
        ],
        sizes: [10, 20, 50, 100],
        permissions: [],
        setPermissions: permissions => set(() => ({ permissions }))
    })
);

export { useRoleTableStore };
