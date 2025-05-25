import React, { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { getAnimeOptions, getBannerList } from '@/apis';
import { useBannerTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/anime/banner/columns';
import CustomTools from '@/pages/anime/banner/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useBannerTableStore(state => state.types);
    const sizes = useBannerTableStore(state => state.sizes);
    const data = useBannerTableStore(state => state.data);
    const setData = useBannerTableStore(state => state.setData);
    const total = useBannerTableStore(state => state.total);
    const setTotal = useBannerTableStore(state => state.setTotal);
    const sorting = useBannerTableStore(state => state.sorting);
    const setSorting = useBannerTableStore(state => state.setSorting);
    const type = useBannerTableStore(state => state.type);
    const setType = useBannerTableStore(state => state.setType);
    const keyword = useBannerTableStore(state => state.keyword);
    const setKeyword = useBannerTableStore(state => state.setKeyword);
    const order = useBannerTableStore(state => state.order);
    const orderBy = useBannerTableStore(state => state.orderBy);
    const page = useBannerTableStore(state => state.page);
    const pageSize = useBannerTableStore(state => state.pageSize);
    const resetPagination = useBannerTableStore(state => state.resetPagination);
    const pagination = useBannerTableStore(state => state.pagination);
    const setPagination = useBannerTableStore(state => state.setPagination);
    const setAllAnimes = useBannerTableStore(state => state.setAllAnimes);

    const { run, loading, refresh, cancel } = useRequest(getBannerList, {
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
