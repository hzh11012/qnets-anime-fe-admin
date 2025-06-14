import { DataTableColumnSort } from '@/components/custom/data-table/data-table-column-sort';
import { cn, formatDate, formateNumber } from '@/lib/utils';
import type { CommentListItem } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTableRowActions } from '@/pages/user/comment/data-table-row-actions';
import { DataTableTextTooltip } from '@/components/custom/data-table/data-table-text-tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const getColumns = (onRefresh: () => void) => {
    const columns: ColumnDef<CommentListItem>[] = [
        {
            accessorKey: 'id',
            header: '评论ID',
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
            accessorKey: 'content',
            meta: {
                title: '评论内容'
            },
            header: () => {
                return (
                    <div className={cn('flex items-center space-x-1')}>
                        <span>评论内容</span>
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
            accessorKey: 'parent.content',
            meta: {
                title: '回复内容'
            },
            header: '回复内容',
            cell: ({ row }) => {
                const text = row.original.parent?.content || '';
                return <DataTableTextTooltip text={text} />;
            }
        },
        {
            accessorKey: 'video.anime.name',
            meta: {
                title: '关联动漫'
            },
            header: '关联动漫',
            cell: ({ row }) => {
                const name = row.original.video.anime.name;
                const episode = row.original.video.episode;
                return `${name}（第${episode}集）`;
            }
        },
        {
            accessorKey: 'replyCount',
            meta: {
                title: '子评论数'
            },
            header: ({ column }) => (
                <div className={cn('flex items-center space-x-1')}>
                    <span>子评论数</span>
                    <DataTableColumnSort column={column} />
                </div>
            ),
            cell: ({ row }) => {
                const replyCount = row.original.replyCount;
                return formateNumber(replyCount);
            }
        },
        {
            accessorKey: 'likeCount',
            meta: {
                title: '点赞数'
            },
            header: ({ column }) => (
                <div className={cn('flex items-center space-x-1')}>
                    <span>点赞数</span>
                    <DataTableColumnSort column={column} />
                </div>
            ),
            cell: ({ row }) => {
                const likeCount = row.original.likeCount;
                return formateNumber(likeCount);
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
