import { StateCreator } from 'zustand';
import type { BasePaginationSlice, BaseTableSlice } from '@/types';

const createTableSlice: StateCreator<
    BaseTableSlice<any>,
    [],
    [],
    BaseTableSlice<any>
> = set => ({
    data: [],
    total: 0,
    sorting: [],
    type: 'name',
    keyword: undefined,
    order: undefined,
    orderBy: undefined,

    setData: data => set(() => ({ data })),
    setTotal: total => set(() => ({ total })),
    setSorting: updater => {
        set(state => {
            const base = state.sorting;
            const next =
                typeof updater === 'function' ? updater(base) : updater;

            return {
                sorting: next,
                order: !next?.[0]
                    ? state.order
                    : next?.[0]?.desc
                      ? 'DESC'
                      : 'ASC',
                orderBy: next?.[0]?.id
            };
        });
    },
    setType: type => set(() => ({ type })),
    setKeyword: keyword => set(() => ({ keyword })),
    setOrder: order => set(() => ({ order })),
    setOrderBy: orderBy => set(() => ({ orderBy }))
});

const createPaginationSlice: StateCreator<
    BasePaginationSlice,
    [],
    [],
    BasePaginationSlice
> = set => ({
    page: 1,
    pageSize: 10,
    pagination: {
        pageIndex: 0,
        pageSize: 10
    },

    setPagination: updater => {
        set(state => {
            const base = state.pagination;
            const next =
                typeof updater === 'function' ? updater(base) : updater;

            return {
                pagination: next,
                page: next.pageIndex + 1,
                pageSize: next.pageSize
            };
        });
    },

    resetPagination: () =>
        set(state => ({
            pagination: { ...state.pagination, pageIndex: 0 },
            page: 1
        }))
});

export { createTableSlice, createPaginationSlice };
