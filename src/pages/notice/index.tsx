import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getNoticeList } from '@/apis';
import { useNoticeTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/notice/columns';
import CustomTools from '@/pages/notice/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useNoticeTableStore(state => state.types);
    const status = useNoticeTableStore(state => state.status);
    const sizes = useNoticeTableStore(state => state.sizes);
    const data = useNoticeTableStore(state => state.data);
    const setData = useNoticeTableStore(state => state.setData);
    const total = useNoticeTableStore(state => state.total);
    const setTotal = useNoticeTableStore(state => state.setTotal);
    const sorting = useNoticeTableStore(state => state.sorting);
    const setSorting = useNoticeTableStore(state => state.setSorting);
    const type = useNoticeTableStore(state => state.type);
    const setType = useNoticeTableStore(state => state.setType);
    const keyword = useNoticeTableStore(state => state.keyword);
    const setKeyword = useNoticeTableStore(state => state.setKeyword);
    const order = useNoticeTableStore(state => state.order);
    const orderBy = useNoticeTableStore(state => state.orderBy);
    const page = useNoticeTableStore(state => state.page);
    const pageSize = useNoticeTableStore(state => state.pageSize);
    const resetPagination = useNoticeTableStore(state => state.resetPagination);
    const pagination = useNoticeTableStore(state => state.pagination);
    const setPagination = useNoticeTableStore(state => state.setPagination);
    const columnFilters = useNoticeTableStore(state => state.columnFilters);
    const setColumnFilters = useNoticeTableStore(
        state => state.setColumnFilters
    );

    const { run, loading, refresh, cancel } = useRequest(getNoticeList, {
        loadingDelay: 250,
        debounceWait: 250,
        defaultParams: [{ page, pageSize }],
        onSuccess: data => {
            const { rows, total } = data.data;
            setTotal(total);
            setData(rows);
        },
        refreshDeps: [page, pageSize, sorting, columnFilters],
        refreshDepsAction: () => {
            run({ page, type, keyword, pageSize, orderBy, order, status });
        }
    });

    useEffect(() => {
        return () => {
            cancel();
        };
    }, [cancel]);

    const columns = getColumns(() => {
        if (data.length === 1 && page > 1) {
            setPagination({ pageIndex: page - 2, pageSize });
        } else {
            refresh();
        }
    });

    const handleSearch = (keyword: string) => {
        resetPagination();
        setKeyword(keyword);
        run({ page, type, keyword, pageSize, orderBy, order, status });
    };

    return (
        <DataTable
            data={data}
            columns={columns}
            loading={loading}
            pagination={pagination}
            pageCount={Math.ceil(total / pageSize)}
            total={total}
            onPaginationChange={setPagination}
            sizes={sizes}
            onSearch={handleSearch}
            sorting={sorting}
            defaultTypeValue={type}
            onTypeSelect={setType}
            typeOptions={types}
            onSortingChange={setSorting}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            customTools={<CustomTools onRefresh={refresh} />}
        />
    );
};

export default Index;
