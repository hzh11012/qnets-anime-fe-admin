import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    TagListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<TagListItem> {
    types: Option[];
    sizes: number[];
}

interface PaginationSlice extends BasePaginationSlice {}

const useTagTableStore = create<TableSlice & PaginationSlice>()((...a) => ({
    ...createTableSlice(...a),
    ...createPaginationSlice(...a),
    types: [{ label: '分类名称', value: 'name' }],
    sizes: [10, 20, 50, 100]
}));

export { useTagTableStore };
