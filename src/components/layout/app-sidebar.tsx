import * as React from 'react';
import { NavMain } from '@/components/layout/nav-main';
import { NavUser } from '@/components/layout/nav-user';
import { NavHeader } from '@/components/layout/nav-header';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
} from '@/components/ui/sidebar';
import { links, platform } from '@/links';
import { useUserStore } from '@/store';
import { useRequest } from 'ahooks';
import { logout } from '@/apis';
import { filterLinksByPermissions } from '@/lib/utils';

const ADMIN = import.meta.env.VITE_ADMIN;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useUserStore(state => state.userInfo);

    const { run: runLogout } = useRequest(logout, {
        manual: true,
        debounceWait: 300,
        onSuccess() {
            window.location.reload();
        }
    });

    // 根据用户权限过滤对应的菜单
    const permLinks = !user.permissions.includes(ADMIN)
        ? filterLinksByPermissions(links, user.permissions)
        : links;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavHeader item={platform} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={permLinks} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} onLogout={runLogout} />
            </SidebarFooter>
            {/* <SidebarRail /> */}
        </Sidebar>
    );
}
