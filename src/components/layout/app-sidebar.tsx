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
import { userStore } from '@/store/user';
import { useRequest } from 'ahooks';
import { logout } from '@/apis/auth';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = userStore(state => state.userInfo);

    const { run: runLogout } = useRequest(logout, {
        manual: true,
        debounceWait: 300,
        onSuccess() {
            window.location.reload();
        }
    });

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavHeader item={platform} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={links} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} onLogout={runLogout} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
