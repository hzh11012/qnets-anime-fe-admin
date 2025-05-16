import React from 'react';
import { useRequest } from 'ahooks';
import { getPermissionList } from '@/apis';
import { usePermissionTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/auth/permission/columns';
import CustomTools from '@/pages/auth/permission/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = usePermissionTableStore(state => state.types);
    const sizes = usePermissionTableStore(state => state.sizes);
    const data = usePermissionTableStore(state => state.data);
    const setData = usePermissionTableStore(state => state.setData);
    const total = usePermissionTableStore(state => state.total);
    const setTotal = usePermissionTableStore(state => state.setTotal);
    const sorting = usePermissionTableStore(state => state.sorting);
    const setSorting = usePermissionTableStore(state => state.setSorting);
    const type = usePermissionTableStore(state => state.type);
    const setType = usePermissionTableStore(state => state.setType);
    const keyword = usePermissionTableStore(state => state.keyword);
    const setKeyword = usePermissionTableStore(state => state.setKeyword);
    const order = usePermissionTableStore(state => state.order);
    const orderBy = usePermissionTableStore(state => state.orderBy);
    const page = usePermissionTableStore(state => state.page);
    const pageSize = usePermissionTableStore(state => state.pageSize);
    const resetPagination = usePermissionTableStore(
        state => state.resetPagination
    );
    const pagination = usePermissionTableStore(state => state.pagination);
    const setPagination = usePermissionTableStore(state => state.setPagination);

    const { run, loading, refresh } = useRequest(getPermissionList, {
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
