import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, createMap, formatDate } from '@/lib/utils';
import type { RatingListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/user/rating/data-table-row-actions';
import { DataTableTextTooltip } from '@/components/custom/data-table/data-table-text-tooltip';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';

export const scores = [
    { label: '⭐', value: '1' },
    { label: '⭐⭐', value: '2' },
    { label: '⭐⭐⭐', value: '3' },
    { label: '⭐⭐⭐⭐', value: '4' },
    { label: '⭐⭐⭐⭐⭐', value: '5' }
];

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<RatingListItem>[] = [
        {
            accessorKey: 'id',
            header: '动漫评分ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'user.nickname',
            meta: {
                title: '用户昵称'
            },
            header: '用户昵称',
            cell: ({ row }) => row.original.user.nickname
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
                return (
                    <PhotoProvider
                        loadingElement={<Loading />}
                        brokenElement={
                            <Error className={cn('relative text-white')} />
                        }
                    >
                        <PhotoView src={row.original.anime.coverUrl}>
                            <span className={cn('cursor-pointer')}>
                                {row.original.anime.name}
                            </span>
                        </PhotoView>
                    </PhotoProvider>
                );
            }
        },
        {
            accessorKey: 'score',
            meta: {
                title: '动漫评分'
            },
            header: ({ column }) => (
                <div className={cn('flex items-center space-x-1')}>
                    <span>动漫评分</span>
                    <DataTableColumnSort column={column} />
                </div>
            ),
            cell: ({ row }) => {
                const ScoresMap = createMap(scores);
                return ScoresMap[row.original.score];
            }
        },
        {
            accessorKey: 'content',
            meta: {
                title: '动漫评分内容'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>动漫评分内容</span>
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
