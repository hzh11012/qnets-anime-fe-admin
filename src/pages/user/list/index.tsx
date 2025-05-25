import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getUserList, getRoleOptions } from '@/apis';
import { useUserTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/user/list/columns';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useUserTableStore(state => state.types);
    const status = useUserTableStore(state => state.status);
    const sizes = useUserTableStore(state => state.sizes);
    const data = useUserTableStore(state => state.data);
    const setData = useUserTableStore(state => state.setData);
    const total = useUserTableStore(state => state.total);
    const setTotal = useUserTableStore(state => state.setTotal);
    const sorting = useUserTableStore(state => state.sorting);
    const setSorting = useUserTableStore(state => state.setSorting);
    const type = useUserTableStore(state => state.type);
    const setType = useUserTableStore(state => state.setType);
    const keyword = useUserTableStore(state => state.keyword);
    const setKeyword = useUserTableStore(state => state.setKeyword);
    const order = useUserTableStore(state => state.order);
    const orderBy = useUserTableStore(state => state.orderBy);
    const page = useUserTableStore(state => state.page);
    const pageSize = useUserTableStore(state => state.pageSize);
    const resetPagination = useUserTableStore(state => state.resetPagination);
    const pagination = useUserTableStore(state => state.pagination);
    const setPagination = useUserTableStore(state => state.setPagination);
    const setRoles = useUserTableStore(state => state.setRoles);
    const columnFilters = useUserTableStore(state => state.columnFilters);
    const setColumnFilters = useUserTableStore(state => state.setColumnFilters);

    const { run, loading, refresh, cancel } = useRequest(getUserList, {
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

    useRequest(getRoleOptions, {
        onSuccess({ code, data }) {
            if (code === 200) {
                setRoles(data);
            }
        }
    });

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
        run({ page, type, keyword, pageSize, orderBy, order });
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
        />
    );
};

export default Index;
