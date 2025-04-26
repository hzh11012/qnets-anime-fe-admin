import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import type { Table } from '@tanstack/react-table';
import PaginationPage from '@/components/custom/data-table/data-table-pagination-page';
import { cn } from '@/lib/utils';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    sizes: number[];
    total?: number;
}

function DataTablePagination<TData>({
    table,
    sizes,
    total
}: DataTablePaginationProps<TData>) {
    return (
        <div className={cn('flex items-center justify-between')}>
            <div className={cn('flex items-center')}>
                <div className={cn('items-center space-x-2 hidden sm:flex')}>
                    <div className={cn('text-sm font-medium')}>总数</div>
                    <div className={cn('text-sm font-medium')}>{total}</div>
                </div>
            </div>
            <div className={cn('flex items-center justify-between space-x-6')}>
                {!!sizes.length && (
                    <div className={cn('flex items-center space-x-2')}>
                        <p
                            className={cn(
                                'hidden text-sm items-center font-medium sm:block'
                            )}
                        >
                            每页数
                        </p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={value => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className={cn('w-auto')}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {sizes.map(pageSize => {
                                        return (
                                            <SelectItem
                                                key={pageSize}
                                                value={`${pageSize}`}
                                            >
                                                {pageSize}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}
                <div className={cn('flex items-center space-x-2')}>
                    <PaginationPage table={table} />
                </div>
            </div>
        </div>
    );
}

export default DataTablePagination;
