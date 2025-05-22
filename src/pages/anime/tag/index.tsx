import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getTagList } from '@/apis';
import { useTagTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/tag/columns';
import CustomTools from '@/pages/anime/tag/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useTagTableStore(state => state.types);
    const sizes = useTagTableStore(state => state.sizes);
    const data = useTagTableStore(state => state.data);
    const setData = useTagTableStore(state => state.setData);
    const total = useTagTableStore(state => state.total);
    const setTotal = useTagTableStore(state => state.setTotal);
    const sorting = useTagTableStore(state => state.sorting);
    const setSorting = useTagTableStore(state => state.setSorting);
    const type = useTagTableStore(state => state.type);
    const setType = useTagTableStore(state => state.setType);
    const keyword = useTagTableStore(state => state.keyword);
    const setKeyword = useTagTableStore(state => state.setKeyword);
    const order = useTagTableStore(state => state.order);
    const orderBy = useTagTableStore(state => state.orderBy);
    const page = useTagTableStore(state => state.page);
    const pageSize = useTagTableStore(state => state.pageSize);
    const resetPagination = useTagTableStore(state => state.resetPagination);
    const pagination = useTagTableStore(state => state.pagination);
    const setPagination = useTagTableStore(state => state.setPagination);

    const { run, loading, refresh, cancel } = useRequest(getTagList, {
        debounceWait: 300,
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
