import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, createMap, formatDate } from '@/lib/utils';
import type { AnimeListItem, Option } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableArrayTooltip } from '@/components/custom/data-table/data-table-array-tooltip';
import { DataTableRowActions } from '@/pages/anime/list/data-table-row-actions';
import { DataTableColumnFilter } from '@/components/custom/data-table/data-table-column-filter';
import { DataTableTextTooltip } from '@/components/custom/data-table/data-table-text-tooltip';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';

export const status = [
    { label: '即将上线', value: '0' },
    { label: '连载中', value: '1' },
    { label: '已完结', value: '2' }
];

export const types = [
    { label: '剧场版', value: '0' },
    { label: '日番', value: '1' },
    { label: '美番', value: '2' },
    { label: '国番', value: '3' },
    { label: '里番', value: '4' }
];

export const years = Array.from(
    { length: new Date().getFullYear() - 1988 },
    (_, i) => {
        return { label: String(1990 + i), value: String(1990 + i) };
    }
).reverse();

export const seasons = Array.from({ length: 999 }, (_, i) => {
    return { label: String(0 + i), value: String(0 + i) };
});

export const months = [
    { label: '一月番', value: '0' },
    { label: '四月番', value: '1' },
    { label: '七月番', value: '2' },
    { label: '十月番', value: '3' }
];

const getColumns = (onRefresh: () => void, tags: Option[] = []) => {
    const columns: ColumnDef<AnimeListItem>[] = [
        {
            accessorKey: 'id',
            header: '动漫ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'name',
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
                        <PhotoView src={row.original.bannerUrl}>
                            {undefined}
                        </PhotoView>
                    </PhotoProvider>
                );
            }
        },
        {
            accessorKey: 'description',
            meta: {
                title: '动漫简介'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫简介</span>
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
            accessorKey: 'animeTags',
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
                const tags = row.original.animeTags.map(item => item.name);
                return <DataTableArrayTooltip items={tags} />;
            }
        },
        {
            accessorKey: 'type',
            meta: {
                title: '动漫类型'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫类型</span>
                        <DataTableColumnFilter
                            column={column}
                            options={types}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const TypesMap = createMap(types);
                return TypesMap[row.original.type];
            }
        },
        {
            accessorKey: 'status',
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
                return StatusMap[row.original.status];
            }
        },
        {
            accessorKey: 'year',
            meta: {
                title: '动漫发行年份'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫发行年份</span>
                        <DataTableColumnFilter
                            column={column}
                            options={years}
                        />
                    </div>
                );
            }
        },
        {
            accessorKey: 'month',
            meta: {
                title: '动漫发行月份'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫发行月份</span>
                        <DataTableColumnFilter
                            column={column}
                            options={months}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const MonthsMap = createMap(months);
                return MonthsMap[row.original.month];
            }
        },
        {
            accessorKey: 'season',
            meta: {
                title: '动漫所属季'
            },
            header: '动漫所属季',
            cell: ({ row }) => {
                const season =
                    row.original.seasonName || `第${row.original.season}季`;
                return season;
            }
        },
        {
            accessorKey: 'averageScore',
            meta: {
                title: '动漫评分'
            },
            header: '动漫评分'
        },
        {
            accessorKey: 'ratingCount',
            meta: {
                title: '动漫评分数'
            },
            header: '动漫评分数'
        },
        {
            accessorKey: 'collectionCount',
            meta: {
                title: '动漫收藏数'
            },
            header: '动漫收藏数'
        },
        {
            accessorKey: 'director',
            meta: {
                title: '动漫导演'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫导演</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => row.original.director || '-'
        },
        {
            accessorKey: 'cv',
            meta: {
                title: '动漫声优'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫声优</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => row.original.cv || '-'
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
