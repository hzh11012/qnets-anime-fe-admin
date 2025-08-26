import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, createMap, formatDate } from '@/lib/utils';
import type { GuideListItem, Option } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/anime/guide/data-table-row-actions';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';
import { DataTableColumnFilter } from '@/components/custom/data-table/data-table-column-filter';
import { DataTableArrayTooltip } from '@/components/custom/data-table/data-table-array-tooltip';
import { status } from '@/pages/anime/list/columns';

export const updateDays = [
    { label: '星期一', value: '1' },
    { label: '星期二', value: '2' },
    { label: '星期三', value: '3' },
    { label: '星期四', value: '4' },
    { label: '星期五', value: '5' },
    { label: '星期六', value: '6' },
    { label: '星期日', value: '0' }
];

const getColumns = (onRefresh: () => void, tags: Option[] = []) => {
    const columns: ColumnDef<GuideListItem>[] = [
        {
            accessorKey: 'id',
            header: '新番导视ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'anime.name',
            meta: {
                title: '动漫名称'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫名称</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => {
                const title = (
                    row.original.anime.name +
                    ' ' +
                    row.original.anime.seasonName
                ).trim();
                return (
                    <PhotoProvider
                        loadingElement={<Loading />}
                        brokenElement={
                            <Error className={cn('relative text-white')} />
                        }
                    >
                        <PhotoView src={row.original.anime.coverUrl}>
                            <span className={cn('cursor-pointer')}>
                                {title}
                            </span>
                        </PhotoView>
                    </PhotoProvider>
                );
            }
        },
        {
            accessorKey: 'anime.animeTags',
            meta: {
                title: '动漫分类'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫分类</span>
                        <DataTableColumnFilter column={column} options={tags} />
                    </div>
                );
            },
            cell: ({ row }) => {
                const tags = row.original.anime.animeTags.map(
                    item => item.name
                );
                return <DataTableArrayTooltip items={tags} />;
            }
        },
        {
            accessorKey: 'anime.status',
            meta: {
                title: '动漫状态'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫状态</span>
                        <DataTableColumnFilter
                            column={column}
                            options={status}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const StatusMap = createMap(status);
                return StatusMap[row.original.anime.status];
            }
        },
        {
            accessorKey: 'updateDay',
            meta: {
                title: '更新日期'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>更新日期</span>
                        <DataTableColumnFilter
                            column={column}
                            options={updateDays}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const DaysMap = createMap(updateDays);
                return DaysMap[row.original.updateDay];
            }
        },
        {
            accessorKey: 'updateTime',
            meta: {
                title: '更新时间'
            },
            header: ({ column }) => (
                <div className={cn('flex items-center space-x-1')}>
                    <span>更新时间</span>
                    <DataTableColumnSort column={column} />
                </div>
            )
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
