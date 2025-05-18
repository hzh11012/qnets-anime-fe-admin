import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, formatDate } from '@/lib/utils';
import type { PermissionListItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableArrayTooltip } from '@/components/custom/data-table/data-table-array-tooltip';
import { DataTableRowActions } from '@/pages/auth/permission/data-table-row-actions';

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<PermissionListItem>[] = [
        {
            accessorKey: 'id',
            header: '权限ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'name',
            meta: {
                title: '权限名称'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>权限名称</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'permission',
            meta: {
                title: '权限编码'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>权限编码</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'roles',
            meta: {
                title: '角色'
            },
            header: '角色',
            cell: ({ row }) => {
                const roles = row.original.roles.map(item => item.name);
                return <DataTableArrayTooltip items={roles} />;
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
