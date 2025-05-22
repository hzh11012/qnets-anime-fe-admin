import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getSeriesList } from '@/apis';
import { useSeriesTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/series/columns';
import CustomTools from '@/pages/anime/series/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useSeriesTableStore(state => state.types);
    const sizes = useSeriesTableStore(state => state.sizes);
    const data = useSeriesTableStore(state => state.data);
    const setData = useSeriesTableStore(state => state.setData);
    const total = useSeriesTableStore(state => state.total);
    const setTotal = useSeriesTableStore(state => state.setTotal);
    const sorting = useSeriesTableStore(state => state.sorting);
    const setSorting = useSeriesTableStore(state => state.setSorting);
    const type = useSeriesTableStore(state => state.type);
    const setType = useSeriesTableStore(state => state.setType);
    const keyword = useSeriesTableStore(state => state.keyword);
    const setKeyword = useSeriesTableStore(state => state.setKeyword);
    const order = useSeriesTableStore(state => state.order);
    const orderBy = useSeriesTableStore(state => state.orderBy);
    const page = useSeriesTableStore(state => state.page);
    const pageSize = useSeriesTableStore(state => state.pageSize);
    const resetPagination = useSeriesTableStore(state => state.resetPagination);
    const pagination = useSeriesTableStore(state => state.pagination);
    const setPagination = useSeriesTableStore(state => state.setPagination);

    const { run, loading, refresh, cancel } = useRequest(getSeriesList, {
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
            customTools={<CustomTools onRefresh={refresh} />}
        />
    );
};

export default Index;
