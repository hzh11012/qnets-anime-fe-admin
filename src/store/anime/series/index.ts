import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    SeriesListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<SeriesListItem> {
    types: Option[];
    sizes: number[];
}

interface PaginationSlice extends BasePaginationSlice {}

const useSeriesTableStore = create<TableSlice & PaginationSlice>()((...a) => ({
    ...createTableSlice(...a),
    ...createPaginationSlice(...a),
    types: [{ label: '系列名称', value: 'name' }],
    sizes: [10, 20, 50, 100]
}));

export { useSeriesTableStore };
