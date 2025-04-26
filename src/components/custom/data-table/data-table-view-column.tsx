import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';

interface DataTableViewColumnProps<TData> {
    table: Table<TData>;
}

export function DataTableViewColumn<TData>({
    table
}: DataTableViewColumnProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn('ml-auto hidden size-9 px-0 lg:flex')}
                >
                    <Settings2 width={18} height={18} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={cn('w-[150px]')}>
                <DropdownMenuLabel>选择显示列</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter(
                        column =>
                            typeof column.accessorFn !== 'undefined' &&
                            column.getCanHide()
                    )
                    .map(column => (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className={cn('capitalize')}
                            checked={column.getIsVisible()}
                            onCheckedChange={value =>
                                column.toggleVisibility(!!value)
                            }
                        >
                            {column.columnDef.meta?.title}
                        </DropdownMenuCheckboxItem>
                    ))}
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    key={'clear_all'}
                    className={cn('capitalize px-2 justify-center')}
                    onCheckedChange={() => table.resetColumnVisibility()}
                >
                    重置
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
