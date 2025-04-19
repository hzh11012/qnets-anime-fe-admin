import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function NavHeader({
    item
}: {
    item: { logo: any; title: string; subTitle: string };
}) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                    <div>
                        <div
                            className={cn(
                                'flex size-8 items-center justify-center'
                            )}
                        >
                            <item.logo size={'2rem'} />
                        </div>
                        <div className={cn('flex flex-col gap-1 leading-none')}>
                            <span
                                className={cn(
                                    'font-semibold whitespace-nowrap'
                                )}
                            >
                                {item.title}
                            </span>
                            <span className={cn('text-xs whitespace-nowrap')}>
                                {item.subTitle}
                            </span>
                        </div>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
