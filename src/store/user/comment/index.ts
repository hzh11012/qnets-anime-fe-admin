import { create } from 'zustand';
import { createPaginationSlice, createTableSlice } from '@/store/base';
import type {
    BaseTableSlice,
    BasePaginationSlice,
    CommentListItem,
    Option
} from '@/types';

interface TableSlice extends BaseTableSlice<CommentListItem> {
    types: Option[];
    sizes: number[];
}

interface PaginationSlice extends BasePaginationSlice {}

const useCommentTableStore = create<TableSlice & PaginationSlice>()((...a) => ({
    ...createTableSlice(...a),
    ...createPaginationSlice(...a),
    type: 'nickname',
    types: [
        { label: '用户昵称', value: 'nickname' },
        { label: '评论内容', value: 'content' },
        { label: '动漫名称', value: 'animeName' }
    ],
    sizes: [10, 20, 50, 100]
}));

export { useCommentTableStore };
