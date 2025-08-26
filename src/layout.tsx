import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { cn, getTitleByPath } from '@/lib/utils';
import ThemeSwitch from '@/components/custom/theme-switch';
import { links } from '@/links';

const Layout = () => {
    const { pathname } = useLocation();

    const title = getTitleByPath(links, pathname);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header
                    className={cn(
                        'flex bg-background h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'
                    )}
                >
                    <div className={cn('flex items-center gap-2 px-4')}>
                        <SidebarTrigger className={cn('-ml-1 md:hidden')} />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem
                                    className={cn('hidden md:block')}
                                >
                                    <BreadcrumbLink asChild>
                                        <Link to={'/'}>仪表盘</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {title && pathname !== '/' && (
                                    <>
                                        <BreadcrumbSeparator
                                            className={cn('hidden md:block')}
                                        />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                {title}
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className={cn('flex items-center gap-2 px-4 pr-6')}>
                        <ThemeSwitch />
                    </div>
                </header>
                <div
                    className={cn(
                        'flex flex-1 flex-col gap-4 p-4 md:pr-6 pb-4 md:pb-2'
                    )}
                >
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
export default Layout;
