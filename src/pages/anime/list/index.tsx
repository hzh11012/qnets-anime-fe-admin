import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getAnimeList, getSeriesOptions, getTagOptions } from '@/apis';
import { useAnimeTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/list/columns';
import CustomTools from '@/pages/anime/list/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const searchTypes = useAnimeTableStore(state => state.searchTypes);
    const types = useAnimeTableStore(state => state.types);
    const status = useAnimeTableStore(state => state.status);
    const months = useAnimeTableStore(state => state.months);
    const years = useAnimeTableStore(state => state.years);
    const tags = useAnimeTableStore(state => state.tags);
    const sizes = useAnimeTableStore(state => state.sizes);
    const data = useAnimeTableStore(state => state.data);
    const setData = useAnimeTableStore(state => state.setData);
    const total = useAnimeTableStore(state => state.total);
    const setTotal = useAnimeTableStore(state => state.setTotal);
    const sorting = useAnimeTableStore(state => state.sorting);
    const setSorting = useAnimeTableStore(state => state.setSorting);
    const type = useAnimeTableStore(state => state.type);
    const setType = useAnimeTableStore(state => state.setType);
    const keyword = useAnimeTableStore(state => state.keyword);
    const setKeyword = useAnimeTableStore(state => state.setKeyword);
    const order = useAnimeTableStore(state => state.order);
    const orderBy = useAnimeTableStore(state => state.orderBy);
    const page = useAnimeTableStore(state => state.page);
    const pageSize = useAnimeTableStore(state => state.pageSize);
    const resetPagination = useAnimeTableStore(state => state.resetPagination);
    const pagination = useAnimeTableStore(state => state.pagination);
    const setPagination = useAnimeTableStore(state => state.setPagination);
    const columnFilters = useAnimeTableStore(state => state.columnFilters);
    const setColumnFilters = useAnimeTableStore(
        state => state.setColumnFilters
    );
    const allTags = useAnimeTableStore(state => state.allTags);
    const setAllTags = useAnimeTableStore(state => state.setAllTags);
    const setAllSeries = useAnimeTableStore(state => state.setAllSeries);

    const { run, loading, refresh, cancel } = useRequest(getAnimeList, {
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
                status,
                types,
                months,
                years,
                tags
            });
        }
    });

    useRequest(getTagOptions, {
        onSuccess({ code, data }) {
            if (code === 200) {
                setAllTags(data);
            }
        }
    });

    useRequest(getSeriesOptions, {
        onSuccess({ code, data }) {
            if (code === 200) {
                setAllSeries(data);
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
    }, allTags);

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
            customTools={<CustomTools onRefresh={refresh} />}
        />
    );
};

export default Index;
