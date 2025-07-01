import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, formatDate, formatVideoTime } from '@/lib/utils';
import type { HistoryListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/user/history/data-table-row-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<HistoryListItem>[] = [
        {
            accessorKey: 'id',
            header: '历史记录ID',
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'user.avatar',
            meta: {
                title: '用户头像'
            },
            header: '用户头像',
            cell: ({ row }: any) => {
                return (
                    <Avatar className={cn('w-8 h-8')}>
                        <AvatarImage src={row.original.user.avatar} />
                        <AvatarFallback>
                            {row.original.user.nickname.slice(0, 1)}
                        </AvatarFallback>
                    </Avatar>
                );
            }
        },
        {
            accessorKey: 'user.nickname',
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
            accessorKey: 'time',
            meta: {
                title: '播放时间点'
            },
            header: '播放时间点',
            cell: ({ row }) => {
                const time = row.original.time;
                return formatVideoTime(time);
            }
        },
        {
            accessorKey: 'anime.name',
            meta: {
                title: '关联动漫'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>关联动漫</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => {
                const name = row.original.anime.name;
                const episode = row.original.video.episode;
                return `${name}（第${episode}集）`;
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
