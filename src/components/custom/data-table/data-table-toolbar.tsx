import { DataTableViewColumn } from '@/components/custom/data-table/data-table-view-column';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import { ReactNode } from 'react';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    customTools?: ReactNode;
    defaultValue?: string;
    options?: {
        label: string;
        value: string;
    }[];
    onSearch: (val: string) => void;
    onSelect?: (val: string) => void;
    onRefresh: () => void;
}

export function DataTableToolbar<TData>({
    table,
    customTools,
    onSearch,
    defaultValue,
    options,
    onSelect,
    onRefresh
}: DataTableToolbarProps<TData>) {
    return (
        <div className={cn('flex items-center justify-between')}>
            <div className={cn('flex flex-1 items-center space-x-6')}>
                {customTools}
                {options && (
                    <Select
                        onValueChange={val => {
                            onSelect && onSelect(val);
                        }}
                        defaultValue={defaultValue}
                    >
                        <SelectTrigger
                            className={cn('rounded-e-none mr-0 focus:z-10')}
                        >
                            <SelectValue placeholder="请选择" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map(option => {
                                const { label, value } = option;
                                return (
                                    <SelectItem value={value} key={value}>
                                        {label}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                )}
                <Input
                    type="text"
                    placeholder="请输入"
                    className={cn('-ms-px shadow-none max-w-72 focus:z-10', {
                        'rounded-s-none': options
                    })}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            onSearch && onSearch(e.currentTarget.value);
                        }
                    }}
                />
            </div>
            <DataTableViewColumn table={table} onRefresh={onRefresh} />
        </div>
    );
}
