import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, createMap, formatDate } from '@/lib/utils';
import type { NoticeListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/notice/data-table-row-actions';
import { DataTableColumnFilter } from '@/components/custom/data-table/data-table-column-filter';

export const status = [
    { label: '未发布', value: '0' },
    { label: '已发布', value: '1' }
];

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<NoticeListItem>[] = [
        {
            accessorKey: 'id',
            header: '公告ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'title',
            meta: {
                title: '公告标题'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>公告标题</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'content',
            meta: {
                title: '公告内容'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>公告内容</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'status',
            meta: {
                title: '公告状态'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>公告状态</span>
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
