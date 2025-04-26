import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, formatDate } from '@/lib/utils';
import type { RoleListItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableTooltip } from '@/components/custom/data-table/data-table-tooltip';
import { DataTableRowActions } from '@/pages/auth/role/data-table-row-actions';

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<RoleListItem>[] = [
        {
            accessorKey: 'id',
            header: '角色ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'name',
            meta: {
                title: '角色名称'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>角色名称</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'role',
            meta: {
                title: '角色编码'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>角色编码</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'users',
            meta: {
                title: '用户'
            },
            header: '用户',
            cell: ({ row }) => {
                const users = row.original.users.map(item => item.nickname);
                return <DataTableTooltip items={users} />;
            }
        },
        {
            accessorKey: 'permissions',
            meta: {
                title: '权限'
            },
            header: '权限',
            cell: ({ row }) => {
                const permissions = row.original.permissions.map(
                    item => item.name
                );
                return <DataTableTooltip items={permissions} />;
            }
        },
        {
            accessorKey: 'createdAt',
            meta: {
                title: '创建时间'
            },
            header: ({ column }) => (
                <div className={cn('flex items-center space-x-1')}>
                    <span>创建时间</span>
                    <DataTableColumnSort column={column} />
                </div>
            ),
            cell: ({ row }) => {
                const createdAt = row.original.createdAt;
                return formatDate(createdAt);
            }
        },
        {
            id: 'actions',
            header: '操作',
            cell: ({ row }) => {
                return (
                    <DataTableRowActions
                        row={row.original}
                        onRefresh={onRefresh}
                    />
                );
            }
        }
    ];

    return columns;
};

export default getColumns;
