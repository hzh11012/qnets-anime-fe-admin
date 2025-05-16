'use client';

import { ChevronsUpDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function NavUser({
    user,
    onLogout
}: {
    user: {
        nickname: string;
        email: string;
        avatar?: string;
    };
    onLogout: () => void;
}) {
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className={cn(
                                'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                            )}
                        >
                            <Avatar className={cn('h-8 w-8 rounded-lg')}>
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.nickname}
                                />
                                <AvatarFallback className={cn('rounded-lg')}>
                                    {user.nickname.slice(0, 1)}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={cn(
                                    'grid flex-1 text-left text-sm leading-tight'
                                )}
                            >
                                <span className={cn('truncate font-medium')}>
                                    {user.nickname}
                                </span>
                                <span className={cn('truncate text-xs')}>
                                    {user.email}
                                </span>
                            </div>
                            <ChevronsUpDown className={cn('ml-auto size-4')} />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className={cn(
                            'w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                        )}
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className={cn('p-0 font-normal')}>
                            <div
                                className={cn(
                                    'flex items-center gap-2 px-1 py-1.5 text-left text-sm'
                                )}
                            >
                                <Avatar className={cn('h-8 w-8 rounded-lg')}>
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.nickname}
                                    />
                                    <AvatarFallback
                                        className={cn('rounded-lg')}
                                    >
                                        {user.nickname.slice(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={cn(
                                        'grid flex-1 text-left text-sm leading-tight'
                                    )}
                                >
                                    <span
                                        className={cn('truncate font-medium')}
                                    >
                                        {user.nickname}
                                    </span>
                                    <span className={cn('truncate text-xs')}>
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onLogout}>
                            <LogOut />
                            退出登录
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
