import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, formatDate } from '@/lib/utils';
import type { MessageListItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/user/message/data-table-row-actions';
import { DataTableColumnFilter } from '@/components/custom/data-table/data-table-column-filter';
import { DataTableTextTooltip } from '@/components/custom/data-table/data-table-text-tooltip';

export const types = [
    { label: '咨询', value: '0' },
    { label: '建议', value: '1' },
    { label: '投诉', value: '2' },
    { label: '其他', value: '3' }
];

export const status = [
    { label: '待处理', value: '0' },
    { label: '处理中', value: '1' },
    { label: '已完成', value: '2' },
    { label: '已关闭', value: '3' }
];

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<MessageListItem>[] = [
        {
            accessorKey: 'id',
            header: '留言ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'user',
            meta: {
                title: '用户昵称'
            },
            header: '用户昵称',
            cell: ({ row }) => row.original.user.nickname
        },
        {
            accessorKey: 'content',
            meta: {
                title: '留言内容'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>留言内容</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => {
                const text = row.original.content;
                return <DataTableTextTooltip text={text} />;
            }
        },
        {
            accessorKey: 'reply',
            meta: {
                title: '回复内容'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>回复内容</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => {
                const text = row.original.reply;
                return <DataTableTextTooltip text={text} />;
            }
        },
        {
            accessorKey: 'type',
            meta: {
                title: '留言类型'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>留言类型</span>
                        <DataTableColumnFilter
                            column={column}
                            options={types}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const TypesMap: { [key: number]: string } = {
                    0: '咨询',
                    1: '建议',
                    2: '投诉',
                    3: '其他'
                };
                return TypesMap[row.original.type];
            }
        },
        {
            accessorKey: 'status',
            meta: {
                title: '留言状态'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>留言状态</span>
                        <DataTableColumnFilter
                            column={column}
                            options={status}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const StatusMap: { [key: number]: string } = {
                    0: '待处理',
                    1: '处理中',
                    2: '已完成',
                    3: '已关闭'
                };
                return StatusMap[row.original.status];
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
