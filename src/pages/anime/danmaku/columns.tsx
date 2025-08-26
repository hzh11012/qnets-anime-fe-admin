import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, createMap, formatDate } from '@/lib/utils';
import type { DanmakuListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/anime/danmaku/data-table-row-actions';
import { DataTableColumnFilter } from '@/components/custom/data-table/data-table-column-filter';
import { DataTableTextTooltip } from '@/components/custom/data-table/data-table-text-tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Color from '@/components/custom/color';

export const modes = [
    { label: '滚动弹幕', value: '0' },
    { label: '顶部弹幕', value: '1' },
    { label: '底部弹幕', value: '2' }
];

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<DanmakuListItem>[] = [
        {
            accessorKey: 'id',
            header: '弹幕ID',
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
            accessorKey: 'text',
            meta: {
                title: '弹幕内容'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>弹幕内容</span>
                        <Search className={cn('size-3.5')} />
                    </div>
                );
            },
            cell: ({ row }) => {
                const text = row.original.text;
                return <DataTableTextTooltip text={text} />;
            }
        },
        {
            accessorKey: 'color',
            meta: {
                title: '弹幕颜色'
            },
            header: '弹幕颜色',
            cell: ({ row }) => {
                const color = row.original.color;
                return <Color color={color} />;
            }
        },
        {
            accessorKey: 'time',
            meta: {
                title: '弹幕时间点'
            },
            header: ({ column }) => (
                <div className={cn('flex items-center space-x-1')}>
                    <span>弹幕时间点</span>
                    <DataTableColumnSort column={column} />
                </div>
            )
        },
        {
            accessorKey: 'mode',
            meta: {
                title: '弹幕模式'
            },
            header: ({ column }) => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>弹幕模式</span>
                        <DataTableColumnFilter
                            column={column}
                            options={modes}
                        />
                    </div>
                );
            },
            cell: ({ row }) => {
                const ModesMap = createMap(modes);
                return ModesMap[row.original.mode];
            }
        },
        {
            accessorKey: 'video.anime.name',
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
                const name = (
                    row.original.video.anime.name +
                    ' ' +
                    row.original.video.anime.seasonName
                ).trim();
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
