import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getAnimeOptions, getGuideList, getTagOptions } from '@/apis';
import { useGuideTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/guide/columns';
import CustomTools from '@/pages/anime/guide/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useGuideTableStore(state => state.types);
    const status = useGuideTableStore(state => state.status);
    const tags = useGuideTableStore(state => state.tags);
    const updateDays = useGuideTableStore(state => state.updateDays);
    const sizes = useGuideTableStore(state => state.sizes);
    const data = useGuideTableStore(state => state.data);
    const setData = useGuideTableStore(state => state.setData);
    const total = useGuideTableStore(state => state.total);
    const setTotal = useGuideTableStore(state => state.setTotal);
    const sorting = useGuideTableStore(state => state.sorting);
    const setSorting = useGuideTableStore(state => state.setSorting);
    const type = useGuideTableStore(state => state.type);
    const setType = useGuideTableStore(state => state.setType);
    const keyword = useGuideTableStore(state => state.keyword);
    const setKeyword = useGuideTableStore(state => state.setKeyword);
    const order = useGuideTableStore(state => state.order);
    const orderBy = useGuideTableStore(state => state.orderBy);
    const page = useGuideTableStore(state => state.page);
    const pageSize = useGuideTableStore(state => state.pageSize);
    const resetPagination = useGuideTableStore(state => state.resetPagination);
    const pagination = useGuideTableStore(state => state.pagination);
    const setPagination = useGuideTableStore(state => state.setPagination);
    const columnFilters = useGuideTableStore(state => state.columnFilters);
    const setColumnFilters = useGuideTableStore(
        state => state.setColumnFilters
    );
    const setAllAnimes = useGuideTableStore(state => state.setAllAnimes);
    const allTags = useGuideTableStore(state => state.allTags);
    const setAllTags = useGuideTableStore(state => state.setAllTags);

    const { run, loading, refresh, cancel } = useRequest(getGuideList, {
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
                tags,
                updateDays
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
    }, allTags);

    const handleSearch = (keyword: string) => {
        resetPagination();
        setKeyword(keyword);
        run({
            page,
            type,
            keyword,
            pageSize,
            orderBy,
            order,
            status,
            tags,
            updateDays
        });
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
