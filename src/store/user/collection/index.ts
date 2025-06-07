import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    CollectionListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<CollectionListItem> {
    types: Option[];
    sizes: number[];
}

interface PaginationSlice extends BasePaginationSlice {}

const useCollectionTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        type: 'nickname',
        types: [
            { label: '用户名称', value: 'nickname' },
            { label: '动漫名称', value: 'animeName' }
        ],
        sizes: [10, 20, 50, 100]
    })
);

export { useCollectionTableStore };
