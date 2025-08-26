import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, createMap, formatDate } from '@/lib/utils';
import type { TopicListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/anime/topic/data-table-row-actions';
import { DataTableColumnFilter } from '@/components/custom/data-table/data-table-column-filter';
import { DataTableArrayTooltip } from '@/components/custom/data-table/data-table-array-tooltip';
import { DataTableTextTooltip } from '@/components/custom/data-table/data-table-text-tooltip';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';

export const status = [
    { label: '禁用', value: '0' },
    { label: '启用', value: '1' }
];

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<TopicListItem>[] = [
        {
            accessorKey: 'id',
            header: '专题ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'name',
            meta: {
                title: '专题名称'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>专题名称</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => {
                return (
                    <PhotoProvider
                        loadingElement={<Loading />}
                        brokenElement={
                            <Error className={cn('relative text-white')} />
                        }
                    >
                        <PhotoView src={row.original.coverUrl}>
                            <span className={cn('cursor-pointer')}>
                                {row.original.name}
                            </span>
                        </PhotoView>
                    </PhotoProvider>
                );
            }
        },
        {
            accessorKey: 'description',
            meta: {
                title: '专题简介'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>专题简介</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => {
                const text = row.original.description;
                return <DataTableTextTooltip text={text} />;
            }
        },
        {
            accessorKey: 'status',
            meta: {
                title: '专题状态'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>专题状态</span>
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
            accessorKey: 'animes',
            meta: {
                title: '关联动漫'
            },
            header: '关联动漫',
            cell: ({ row }) => {
                const animes = row.original.animes.map(item =>
                    (item.name + ' ' + item.seasonName).trim()
                );
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
