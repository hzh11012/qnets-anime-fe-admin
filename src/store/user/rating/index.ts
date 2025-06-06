import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    RatingListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<RatingListItem> {
    types: Option[];
    sizes: number[];
}

interface PaginationSlice extends BasePaginationSlice {}

const useRatingTableStore = create<TableSlice & PaginationSlice>()(
    (set, ...a) => ({
        ...createTableSlice(set, ...a),
        ...createPaginationSlice(set, ...a),
        type: 'nickname',
        types: [
            { label: '用户名称', value: 'nickname' },
            { label: '动漫评分内容', value: 'content' },
            { label: '动漫名称', value: 'animeName' }
        ],
        sizes: [10, 20, 50, 100]
    })
);

export { useRatingTableStore };
