import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getAnimeOptions, getVideoList } from '@/apis';
import { useVideoTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/video/columns';
import CustomTools from '@/pages/anime/video/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useVideoTableStore(state => state.types);
    const sizes = useVideoTableStore(state => state.sizes);
    const data = useVideoTableStore(state => state.data);
    const setData = useVideoTableStore(state => state.setData);
    const total = useVideoTableStore(state => state.total);
    const setTotal = useVideoTableStore(state => state.setTotal);
    const sorting = useVideoTableStore(state => state.sorting);
    const setSorting = useVideoTableStore(state => state.setSorting);
    const type = useVideoTableStore(state => state.type);
    const setType = useVideoTableStore(state => state.setType);
    const keyword = useVideoTableStore(state => state.keyword);
    const setKeyword = useVideoTableStore(state => state.setKeyword);
    const order = useVideoTableStore(state => state.order);
    const orderBy = useVideoTableStore(state => state.orderBy);
    const page = useVideoTableStore(state => state.page);
    const pageSize = useVideoTableStore(state => state.pageSize);
    const resetPagination = useVideoTableStore(state => state.resetPagination);
    const pagination = useVideoTableStore(state => state.pagination);
    const setPagination = useVideoTableStore(state => state.setPagination);
    const setAllAnimes = useVideoTableStore(state => state.setAllAnimes);

    const { run, loading, refresh, cancel } = useRequest(getVideoList, {
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
