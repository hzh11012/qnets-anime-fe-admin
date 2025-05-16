import React from 'react';
import { useRequest } from 'ahooks';
import { getPermissionList, getRoleList } from '@/apis';
import { useRoleTableStore } from '@/store';
import DataTable from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/auth/role/columns';
import CustomTools from '@/pages/auth/role/custom-tools';

const Index: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const types = useRoleTableStore(state => state.types);
    const sizes = useRoleTableStore(state => state.sizes);
    const data = useRoleTableStore(state => state.data);
    const setData = useRoleTableStore(state => state.setData);
    const total = useRoleTableStore(state => state.total);
    const setTotal = useRoleTableStore(state => state.setTotal);
    const sorting = useRoleTableStore(state => state.sorting);
    const setSorting = useRoleTableStore(state => state.setSorting);
    const type = useRoleTableStore(state => state.type);
    const setType = useRoleTableStore(state => state.setType);
    const keyword = useRoleTableStore(state => state.keyword);
    const setKeyword = useRoleTableStore(state => state.setKeyword);
    const order = useRoleTableStore(state => state.order);
    const orderBy = useRoleTableStore(state => state.orderBy);
    const page = useRoleTableStore(state => state.page);
    const pageSize = useRoleTableStore(state => state.pageSize);
    const resetPagination = useRoleTableStore(state => state.resetPagination);
    const pagination = useRoleTableStore(state => state.pagination);
    const setPagination = useRoleTableStore(state => state.setPagination);
    const setPermissions = useRoleTableStore(state => state.setPermissions);

    const { run, loading, refresh } = useRequest(getRoleList, {
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

    useRequest(getPermissionList, {
        defaultParams: [
            {
                page: 1,
                pageSize: 10000
            }
        ],
        onSuccess({ code, data }) {
            if (code === 200) {
                const { rows } = data;
                const res = rows.map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    };
                });
                setPermissions(res);
            }
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
