'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function NavMain({
    items
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            icon?: LucideIcon;
            url: string;
        }[];
    }[];
}) {
    const { isMobile, state } = useSidebar();

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map(item =>
                    item.items ? (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={item.isActive}
                            className={cn('group/collapsible')}
                        >
                            {state === 'expanded' || isMobile ? (
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span
                                                className={cn(
                                                    'whitespace-nowrap'
                                                )}
                                            >
                                                {item.title}
                                            </span>
                                            <ChevronRight
                                                className={cn(
                                                    'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
                                                )}
                                            />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map(subItem => (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                    >
                                                        <Link
                                                            to={
                                                                item.url +
                                                                subItem.url
                                                            }
                                                        >
                                                            {subItem.icon && (
                                                                <subItem.icon />
                                                            )}
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                            >
                                                {item.icon ? (
                                                    <item.icon />
                                                ) : (
                                                    item.title.slice(0, 1)
                                                )}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className={cn(
                                            'w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                                        )}
                                        side="right"
                                        align="start"
                                        sideOffset={4}
                                    >
                                        {item.items?.map(subItem => (
                                            <DropdownMenuGroup
                                                key={subItem.title}
                                            >
                                                <DropdownMenuItem
                                                    className={cn(
                                                        'cursor-pointer'
                                                    )}
                                                    asChild
                                                >
                                                    <Link
                                                        to={
                                                            item.url +
                                                            subItem.url
                                                        }
                                                    >
                                                        {subItem.icon && (
                                                            <subItem.icon />
                                                        )}
                                                        <span>
                                                            {subItem.title}
                                                        </span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <Link to={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
