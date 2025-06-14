import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, createMap, formatDate } from '@/lib/utils';
import type { PermissionListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableArrayTooltip } from '@/components/custom/data-table/data-table-array-tooltip';
import { DataTableRowActions } from '@/pages/auth/permission/data-table-row-actions';
import { DataTableColumnFilter } from '@/components/custom/data-table/data-table-column-filter';

export const systems = [
    { label: '否', value: '0' },
    { label: '是', value: '1' }
];

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
            accessorKey: 'system',
            meta: {
                title: '是否系统权限'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>是否系统权限</span>
                        <DataTableColumnFilter
                            column={column}
                            options={systems}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const SystemsMap = createMap(systems);
                return SystemsMap[row.original.system];
            }
        },
        {
            accessorKey: 'roles',
            meta: {
                title: '关联角色'
            },
            header: '关联角色',
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
