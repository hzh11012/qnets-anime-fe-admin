import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import type {
    Column,
    ColumnDef,
    ColumnFiltersState,
    OnChangeFn,
    PaginationState,
    Row,
    RowSelectionState,
    SortingState
} from '@tanstack/react-table';
import Loading from '@/components/custom/loading';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { DataTableToolbar } from '@/components/custom/data-table/data-table-toolbar';
import DataTablePagination from '@/components/custom/data-table/data-table-pagination';
import { throttle } from 'throttle-debounce';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageCount?: number;
    total?: number;
    loading: boolean;
    sizes?: number[];
    pagination: PaginationState;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    customTools?: ReactNode;
    rowSelection?: RowSelectionState;
    enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
    enableMultiRowSelection?: boolean | ((row: Row<TData>) => boolean);
    onPaginationChange: OnChangeFn<PaginationState>;
    onSortingChange?: OnChangeFn<SortingState>;
    onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    onSearch: (val: string) => void;
    defaultTypeValue?: string;
    typeOptions?: {
        label: string;
        value: string;
    }[];
    onTypeSelect?: (val: string) => void;
    className?: string;
    headerClassName?: string;
}

const DataTable = <TData, TValue>({
    columns,
    data,
    pageCount,
    total,
    loading,
    sizes = [],
    pagination,
    sorting,
    columnFilters,
    customTools,
    rowSelection = {},
    enableRowSelection,
    enableMultiRowSelection,
    onSearch,
    defaultTypeValue,
    typeOptions,
    onTypeSelect,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onRowSelectionChange,
    className,
    headerClassName
}: DataTableProps<TData, TValue>) => {
    const getPinningStyles = useCallback(
        (column: Column<TData, TValue>): CSSProperties => {
            const isPinned = column.getIsPinned();
            const styles: CSSProperties = {
                position: isPinned ? 'sticky' : 'relative',
                width: column.getSize(),
                zIndex: isPinned ? 1 : 0
            };

            if (isPinned === 'left') {
                styles.left = `${column.getStart('left')}px`;
            } else if (isPinned === 'right') {
                styles.right = `${column.getAfter('right')}px`;
            }

            return styles;
        },
        []
    );

    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedData = useMemo(() => data, [data]);

    const table = useReactTable({
        initialState: {
            columnPinning: {
                right: ['actions']
            }
        },
        data: memoizedData,
        columns: memoizedColumns,
        pageCount,
        state: { pagination, sorting, rowSelection, columnFilters },
        manualPagination: true,
        manualFiltering: true,
        enableRowSelection,
        enableMultiRowSelection,
        onColumnFiltersChange,
        onPaginationChange,
        onSortingChange,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange
    });

    const tableRef = useRef(null);
    const [isLeftStart, setIsLeftStart] = useState(false);
    const [isRightEnd, setIsRightEnd] = useState(false);

    useEffect(() => {
        handleScroll();
    }, [loading]);

    useEffect(() => {
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const handleScroll = useCallback(
        throttle(100, () => {
            const table = tableRef.current;
            if (!table) return;

            // 计算关键滚动属性
            const { scrollLeft, clientWidth, scrollWidth } = table;

            // 判断是否滚动到最左/右侧
            const isStart = scrollLeft <= 0;
            const isEnd = Math.abs(scrollLeft + clientWidth - scrollWidth) < 1;

            setIsLeftStart(isStart);
            setIsRightEnd(isEnd);
        }),
        []
    );

    return (
        <Card className={cn('p-0 border-none shadow-none h-full gap-4')}>
            <CardHeader className={cn('px-0 gap-0', headerClassName)}>
                <DataTableToolbar
                    table={table}
                    customTools={customTools}
                    onSearch={onSearch}
                    defaultValue={defaultTypeValue}
                    onSelect={onTypeSelect}
                    options={typeOptions}
                    onRefresh={handleScroll}
                />
            </CardHeader>
            <CardContent className={cn('px-0 gap-0', className)}>
                <Table
                    key={'table'}
                    ref={tableRef}
                    onScroll={handleScroll}
                    className={cn(
                        'border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b'
                    )}
                >
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow
                                key={headerGroup.id}
                                className={cn('hover:bg-transparent')}
                            >
                                {headerGroup.headers.map(header => {
                                    const { column } = header;
                                    const isPinned = column.getIsPinned();
                                    const isLastLeftPinned =
                                        isPinned === 'left' &&
                                        column.getIsLastColumn('left');
                                    const isFirstRightPinned =
                                        isPinned === 'right' &&
                                        column.getIsFirstColumn('right');

                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cn(
                                                'relative h-9 px-3 select-none border-y text-nowrap bg-table-header',
                                                {
                                                    'shadow-l-fixed':
                                                        isFirstRightPinned &&
                                                        !isRightEnd,
                                                    'shadow-r-fixed':
                                                        isLastLeftPinned &&
                                                        !isLeftStart
                                                }
                                            )}
                                            style={{
                                                ...getPinningStyles(
                                                    column as Column<
                                                        TData,
                                                        TValue
                                                    >
                                                )
                                            }}
                                            data-pinned={isPinned || undefined}
                                            data-last-col={
                                                isLastLeftPinned
                                                    ? 'left'
                                                    : isFirstRightPinned
                                                      ? 'right'
                                                      : undefined
                                            }
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody key={'table-body'}>
                        {!loading && table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    className={cn('hover:bg-transparent')}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        const { column } = cell;
                                        const isPinned = column.getIsPinned();
                                        const isLastLeftPinned =
                                            isPinned === 'left' &&
                                            column.getIsLastColumn('left');
                                        const isFirstRightPinned =
                                            isPinned === 'right' &&
                                            column.getIsFirstColumn('right');

                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    'text-nowrap p-3 bg-background',
                                                    {
                                                        'shadow-l-fixed':
                                                            isFirstRightPinned &&
                                                            !isRightEnd,
                                                        'shadow-r-fixed':
                                                            isLastLeftPinned &&
                                                            !isLeftStart
                                                    }
                                                )}
                                                style={{
                                                    ...getPinningStyles(
                                                        column as Column<
                                                            TData,
                                                            TValue
                                                        >
                                                    )
                                                }}
                                                data-pinned={
                                                    isPinned || undefined
                                                }
                                                data-last-col={
                                                    isLastLeftPinned
                                                        ? 'left'
                                                        : isFirstRightPinned
                                                          ? 'right'
                                                          : undefined
                                                }
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className={cn('hover:bg-transparent')}>
                                <TableCell
                                    colSpan={columns.length}
                                    className={cn(
                                        'h-96 text-center bg-background'
                                    )}
                                >
                                    {loading ? (
                                        <Loading
                                            size={28}
                                            className={cn('flex relative')}
                                        />
                                    ) : (
                                        '暂无数据'
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {!!total && (
                    <div className={cn('pt-4')}>
                        <DataTablePagination
                            {...{
                                table: table,
                                total: total,
                                sizes: sizes
                            }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DataTable;
