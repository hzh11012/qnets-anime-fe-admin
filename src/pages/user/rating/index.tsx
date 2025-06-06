import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getRatingList } from '@/apis';
import { useRatingTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/user/rating/columns';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useRatingTableStore(state => state.types);
    const sizes = useRatingTableStore(state => state.sizes);
    const data = useRatingTableStore(state => state.data);
    const setData = useRatingTableStore(state => state.setData);
    const total = useRatingTableStore(state => state.total);
    const setTotal = useRatingTableStore(state => state.setTotal);
    const sorting = useRatingTableStore(state => state.sorting);
    const setSorting = useRatingTableStore(state => state.setSorting);
    const type = useRatingTableStore(state => state.type);
    const setType = useRatingTableStore(state => state.setType);
    const keyword = useRatingTableStore(state => state.keyword);
    const setKeyword = useRatingTableStore(state => state.setKeyword);
    const order = useRatingTableStore(state => state.order);
    const orderBy = useRatingTableStore(state => state.orderBy);
    const page = useRatingTableStore(state => state.page);
    const pageSize = useRatingTableStore(state => state.pageSize);
    const resetPagination = useRatingTableStore(state => state.resetPagination);
    const pagination = useRatingTableStore(state => state.pagination);
    const setPagination = useRatingTableStore(state => state.setPagination);

    const { run, loading, refresh, cancel } = useRequest(getRatingList, {
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
            run({
                page,
                type,
                keyword,
                pageSize,
                orderBy,
                order
            });
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
