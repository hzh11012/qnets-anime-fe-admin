import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, formatDate } from '@/lib/utils';
import type { BannerListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/anime/banner/data-table-row-actions';
import { DataTableTextTooltip } from '@/components/custom/data-table/data-table-text-tooltip';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<BannerListItem>[] = [
        {
            accessorKey: 'id',
            header: '轮播ID',
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
                        <PhotoView src={row.original.anime.bannerUrl}>
                            <span className={cn('cursor-pointer')}>
                                {title}
                            </span>
                        </PhotoView>
                    </PhotoProvider>
                );
            }
        },
        {
            accessorKey: 'anime.description',
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
                const text = row.original.anime.description;
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
