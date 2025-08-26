import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, formatDate, formateNumber } from '@/lib/utils';
import type { VideoListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/anime/video/data-table-row-actions';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<VideoListItem>[] = [
        {
            accessorKey: 'id',
            header: '视频ID',
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
            accessorKey: 'title',
            meta: {
                title: '视频标题'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>视频标题</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => {
                const title =
                    row.original.title || `第 ${row.original.episode} 集`;
                return title;
            }
        },
        {
            accessorKey: 'url',
            meta: {
                title: '视频链接'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>视频链接</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            }
        },
        {
            accessorKey: 'episode',
            meta: {
                title: '集数编号'
            },
            header: ({ column }) => (
                <div className={cn('flex items-center space-x-1')}>
                    <span>集数编号</span>
                    <DataTableColumnSort column={column} />
                </div>
            )
        },
        {
            accessorKey: 'playCount',
            meta: {
                title: '播放量'
            },
            header: ({ column }) => (
                <div className={cn('flex items-center space-x-1')}>
                    <span>播放量</span>
                    <DataTableColumnSort column={column} />
                </div>
            ),
            cell: ({ row }) => {
                const playCount = row.original.playCount;
                return formateNumber(playCount);
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
