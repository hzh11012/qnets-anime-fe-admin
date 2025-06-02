import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getAnimeOptions, getRecommendList } from '@/apis';
import { useRecommendTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/recommend/columns';
import CustomTools from '@/pages/anime/recommend/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useRecommendTableStore(state => state.types);
    const status = useRecommendTableStore(state => state.status);
    const sizes = useRecommendTableStore(state => state.sizes);
    const data = useRecommendTableStore(state => state.data);
    const setData = useRecommendTableStore(state => state.setData);
    const total = useRecommendTableStore(state => state.total);
    const setTotal = useRecommendTableStore(state => state.setTotal);
    const sorting = useRecommendTableStore(state => state.sorting);
    const setSorting = useRecommendTableStore(state => state.setSorting);
    const type = useRecommendTableStore(state => state.type);
    const setType = useRecommendTableStore(state => state.setType);
    const keyword = useRecommendTableStore(state => state.keyword);
    const setKeyword = useRecommendTableStore(state => state.setKeyword);
    const order = useRecommendTableStore(state => state.order);
    const orderBy = useRecommendTableStore(state => state.orderBy);
    const page = useRecommendTableStore(state => state.page);
    const pageSize = useRecommendTableStore(state => state.pageSize);
    const resetPagination = useRecommendTableStore(
        state => state.resetPagination
    );
    const pagination = useRecommendTableStore(state => state.pagination);
    const setPagination = useRecommendTableStore(state => state.setPagination);
    const columnFilters = useRecommendTableStore(state => state.columnFilters);
    const setColumnFilters = useRecommendTableStore(
        state => state.setColumnFilters
    );
    const setAllAnimes = useRecommendTableStore(state => state.setAllAnimes);

    const { run, loading, refresh, cancel } = useRequest(getRecommendList, {
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
            run({
                page,
                type,
                keyword,
                pageSize,
                orderBy,
                order,
                status
            });
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
