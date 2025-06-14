import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, formatDate } from '@/lib/utils';
import type { SeriesListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableArrayTooltip } from '@/components/custom/data-table/data-table-array-tooltip';
import { DataTableRowActions } from '@/pages/anime/series/data-table-row-actions';

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<SeriesListItem>[] = [
        {
            accessorKey: 'id',
            header: '系列ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'name',
            meta: {
                title: '系列名称'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>系列名称</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'animes',
            meta: {
                title: '关联动漫'
            },
            header: '关联动漫',
            cell: ({ row }) => {
                const animes = row.original.animes.map(item => item.name);
                return <DataTableArrayTooltip items={animes} />;
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
