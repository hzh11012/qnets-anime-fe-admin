import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, createMap, formatDate } from '@/lib/utils';
import type { UserListItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableArrayTooltip } from '@/components/custom/data-table/data-table-array-tooltip';
import { DataTableRowActions } from '@/pages/user/list/data-table-row-actions';
import { DataTableColumnFilter } from '@/components/custom/data-table/data-table-column-filter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const status = [
    { label: '禁用', value: '0' },
    { label: '启用', value: '1' }
];

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<UserListItem>[] = [
        {
            accessorKey: 'id',
            header: '用户ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'avatar',
            meta: {
                title: '用户头像'
            },
            header: '用户头像',
            cell: ({ row }: any) => {
                return (
                    <Avatar className={cn('w-8 h-8')}>
                        <AvatarImage src={row.original.avatar} />
                        <AvatarFallback>
                            {row.original.nickname.slice(0, 1)}
                        </AvatarFallback>
                    </Avatar>
                );
            }
        },
        {
            accessorKey: 'nickname',
            meta: {
                title: '用户昵称'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>用户昵称</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'email',
            meta: {
                title: '用户邮箱'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>用户邮箱</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'status',
            meta: {
                title: '用户状态'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>用户状态</span>
                        <DataTableColumnFilter
                            column={column}
                            options={status}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const StatusMap = createMap(status);
                return StatusMap[row.original.status];
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
