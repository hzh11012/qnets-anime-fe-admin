import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getCollectionList } from '@/apis';
import { useCollectionTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/user/collection/columns';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useCollectionTableStore(state => state.types);
    const sizes = useCollectionTableStore(state => state.sizes);
    const data = useCollectionTableStore(state => state.data);
    const setData = useCollectionTableStore(state => state.setData);
    const total = useCollectionTableStore(state => state.total);
    const setTotal = useCollectionTableStore(state => state.setTotal);
    const sorting = useCollectionTableStore(state => state.sorting);
    const setSorting = useCollectionTableStore(state => state.setSorting);
    const type = useCollectionTableStore(state => state.type);
    const setType = useCollectionTableStore(state => state.setType);
    const keyword = useCollectionTableStore(state => state.keyword);
    const setKeyword = useCollectionTableStore(state => state.setKeyword);
    const order = useCollectionTableStore(state => state.order);
    const orderBy = useCollectionTableStore(state => state.orderBy);
    const page = useCollectionTableStore(state => state.page);
    const pageSize = useCollectionTableStore(state => state.pageSize);
    const resetPagination = useCollectionTableStore(
        state => state.resetPagination
    );
    const pagination = useCollectionTableStore(state => state.pagination);
    const setPagination = useCollectionTableStore(state => state.setPagination);

    const { run, loading, refresh, cancel } = useRequest(getCollectionList, {
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
