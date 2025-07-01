import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getHistoryList } from '@/apis';
import { useHistoryTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/user/history/columns';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useHistoryTableStore(state => state.types);
    const sizes = useHistoryTableStore(state => state.sizes);
    const data = useHistoryTableStore(state => state.data);
    const setData = useHistoryTableStore(state => state.setData);
    const total = useHistoryTableStore(state => state.total);
    const setTotal = useHistoryTableStore(state => state.setTotal);
    const sorting = useHistoryTableStore(state => state.sorting);
    const setSorting = useHistoryTableStore(state => state.setSorting);
    const type = useHistoryTableStore(state => state.type);
    const setType = useHistoryTableStore(state => state.setType);
    const keyword = useHistoryTableStore(state => state.keyword);
    const setKeyword = useHistoryTableStore(state => state.setKeyword);
    const order = useHistoryTableStore(state => state.order);
    const orderBy = useHistoryTableStore(state => state.orderBy);
    const page = useHistoryTableStore(state => state.page);
    const pageSize = useHistoryTableStore(state => state.pageSize);
    const resetPagination = useHistoryTableStore(
        state => state.resetPagination
    );
    const pagination = useHistoryTableStore(state => state.pagination);
    const setPagination = useHistoryTableStore(state => state.setPagination);

    const { run, loading, refresh, cancel } = useRequest(getHistoryList, {
        loadingDelay: 250,
        debounceWait: 250,
        defaultParams: [{ page, pageSize }],
        onSuccess: data => {
            const { rows, total } = data.data;
            setTotal(total);
            setData(rows);
        },
        refreshDeps: [page, pageSize, sorting],
        refreshDepsAction: () => {
            run({ page, type, keyword, pageSize, orderBy, order });
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
        />
    );
};

export default Index;
