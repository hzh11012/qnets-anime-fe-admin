import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getAnimeOptions, getTopicList } from '@/apis';
import { useTopicTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/topic/columns';
import CustomTools from '@/pages/anime/topic/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useTopicTableStore(state => state.types);
    const status = useTopicTableStore(state => state.status);
    const sizes = useTopicTableStore(state => state.sizes);
    const data = useTopicTableStore(state => state.data);
    const setData = useTopicTableStore(state => state.setData);
    const total = useTopicTableStore(state => state.total);
    const setTotal = useTopicTableStore(state => state.setTotal);
    const sorting = useTopicTableStore(state => state.sorting);
    const setSorting = useTopicTableStore(state => state.setSorting);
    const type = useTopicTableStore(state => state.type);
    const setType = useTopicTableStore(state => state.setType);
    const keyword = useTopicTableStore(state => state.keyword);
    const setKeyword = useTopicTableStore(state => state.setKeyword);
    const order = useTopicTableStore(state => state.order);
    const orderBy = useTopicTableStore(state => state.orderBy);
    const page = useTopicTableStore(state => state.page);
    const pageSize = useTopicTableStore(state => state.pageSize);
    const resetPagination = useTopicTableStore(
        state => state.resetPagination
    );
    const pagination = useTopicTableStore(state => state.pagination);
    const setPagination = useTopicTableStore(state => state.setPagination);
    const columnFilters = useTopicTableStore(state => state.columnFilters);
    const setColumnFilters = useTopicTableStore(
        state => state.setColumnFilters
    );
    const setAllAnimes = useTopicTableStore(state => state.setAllAnimes);

    const { run, loading, refresh, cancel } = useRequest(getTopicList, {
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

    useRequest(getAnimeOptions, {
        onSuccess({ code, data }) {
            if (code === 200) {
                setAllAnimes(data);
            }
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
