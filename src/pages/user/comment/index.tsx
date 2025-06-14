import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getCommentList } from '@/apis';
import { useCommentTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/user/comment/columns';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useCommentTableStore(state => state.types);
    const sizes = useCommentTableStore(state => state.sizes);
    const data = useCommentTableStore(state => state.data);
    const setData = useCommentTableStore(state => state.setData);
    const total = useCommentTableStore(state => state.total);
    const setTotal = useCommentTableStore(state => state.setTotal);
    const sorting = useCommentTableStore(state => state.sorting);
    const setSorting = useCommentTableStore(state => state.setSorting);
    const type = useCommentTableStore(state => state.type);
    const setType = useCommentTableStore(state => state.setType);
    const keyword = useCommentTableStore(state => state.keyword);
    const setKeyword = useCommentTableStore(state => state.setKeyword);
    const order = useCommentTableStore(state => state.order);
    const orderBy = useCommentTableStore(state => state.orderBy);
    const page = useCommentTableStore(state => state.page);
    const pageSize = useCommentTableStore(state => state.pageSize);
    const resetPagination = useCommentTableStore(
        state => state.resetPagination
    );
    const pagination = useCommentTableStore(state => state.pagination);
    const setPagination = useCommentTableStore(state => state.setPagination);

    const { run, loading, refresh, cancel } = useRequest(getCommentList, {
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
