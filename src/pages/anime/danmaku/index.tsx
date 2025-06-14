import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getDanmakuList } from '@/apis';
import { useDanmakuTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/danmaku/columns';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useDanmakuTableStore(state => state.types);
    const modes = useDanmakuTableStore(state => state.modes);
    const sizes = useDanmakuTableStore(state => state.sizes);
    const data = useDanmakuTableStore(state => state.data);
    const setData = useDanmakuTableStore(state => state.setData);
    const total = useDanmakuTableStore(state => state.total);
    const setTotal = useDanmakuTableStore(state => state.setTotal);
    const sorting = useDanmakuTableStore(state => state.sorting);
    const setSorting = useDanmakuTableStore(state => state.setSorting);
    const type = useDanmakuTableStore(state => state.type);
    const setType = useDanmakuTableStore(state => state.setType);
    const keyword = useDanmakuTableStore(state => state.keyword);
    const setKeyword = useDanmakuTableStore(state => state.setKeyword);
    const order = useDanmakuTableStore(state => state.order);
    const orderBy = useDanmakuTableStore(state => state.orderBy);
    const page = useDanmakuTableStore(state => state.page);
    const pageSize = useDanmakuTableStore(state => state.pageSize);
    const resetPagination = useDanmakuTableStore(
        state => state.resetPagination
    );
    const pagination = useDanmakuTableStore(state => state.pagination);
    const setPagination = useDanmakuTableStore(state => state.setPagination);
    const columnFilters = useDanmakuTableStore(state => state.columnFilters);
    const setColumnFilters = useDanmakuTableStore(
        state => state.setColumnFilters
    );

    const { run, loading, refresh, cancel } = useRequest(getDanmakuList, {
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
            run({ page, type, keyword, pageSize, orderBy, order, modes });
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
        run({ page, type, keyword, pageSize, orderBy, order, modes });
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
