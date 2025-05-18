import React from 'react';
import { useRequest } from 'ahooks';
import { getMessageList } from '@/apis';
import { useMessageTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/user/message/columns';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const searchTypes = useMessageTableStore(state => state.searchTypes);
    const status = useMessageTableStore(state => state.status);
    const types = useMessageTableStore(state => state.types);
    const sizes = useMessageTableStore(state => state.sizes);
    const data = useMessageTableStore(state => state.data);
    const setData = useMessageTableStore(state => state.setData);
    const total = useMessageTableStore(state => state.total);
    const setTotal = useMessageTableStore(state => state.setTotal);
    const sorting = useMessageTableStore(state => state.sorting);
    const setSorting = useMessageTableStore(state => state.setSorting);
    const type = useMessageTableStore(state => state.type);
    const setType = useMessageTableStore(state => state.setType);
    const keyword = useMessageTableStore(state => state.keyword);
    const setKeyword = useMessageTableStore(state => state.setKeyword);
    const order = useMessageTableStore(state => state.order);
    const orderBy = useMessageTableStore(state => state.orderBy);
    const page = useMessageTableStore(state => state.page);
    const pageSize = useMessageTableStore(state => state.pageSize);
    const resetPagination = useMessageTableStore(
        state => state.resetPagination
    );
    const pagination = useMessageTableStore(state => state.pagination);
    const setPagination = useMessageTableStore(state => state.setPagination);
    const columnFilters = useMessageTableStore(state => state.columnFilters);
    const setColumnFilters = useMessageTableStore(
        state => state.setColumnFilters
    );

    const { run, loading, refresh } = useRequest(getMessageList, {
        defaultParams: [{ page, pageSize }],
        onSuccess: data => {
            const { rows, total } = data.data;
            setTotal(total);
            setData(rows);
        },
        refreshDeps: [page, pageSize, sorting, columnFilters],
        refreshDepsAction: () => {
            run({
                page,
                type,
                keyword,
                pageSize,
                orderBy,
                order,
                status,
                types
            });
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
            typeOptions={searchTypes}
            onSortingChange={setSorting}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
        />
    );
};

export default Index;
