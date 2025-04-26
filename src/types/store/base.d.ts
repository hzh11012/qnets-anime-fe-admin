import type { OnChangeFn, PaginationState } from '@tanstack/react-table';

interface BaseTableState<TDate> {
    data: TDate[];
    total: number;
    sorting: { desc: boolean; id: string }[];
    type: string;
    keyword?: string;
    order?: string;
    orderBy?: string;
}

interface BaseTableSlice<TDate> extends BaseTableState<TDate> {
    setData: (data: TableState['data']) => void;
    setTotal: (total: TableState['total']) => void;
    setSorting: (sorting: TableState['sorting']) => void;
    setType: (total: TableState['type']) => void;
    setKeyword: (total: TableState['keyword']) => void;
    setOrder: (total: TableState['order']) => void;
    setOrderBy: (total: TableState['orderBy']) => void;
}

interface BasePaginationSlice {
    page: number;
    pageSize: number;
    pagination: PaginationState;
    setPagination: OnChangeFn<PaginationState>;
    resetPagination: () => void;
}

export { BaseTableSlice, BasePaginationSlice };
