import type { ColumnDef } from '@tanstack/react-table';
import Zod, { ZodType } from 'zod';

interface DataTableRowActionsProps<T> {
    row: T;
    onRefresh: () => void;
}

interface DeleteDialogProps {
    id: string;
    onRefresh: () => void;
}

interface EditDialogProps<T> extends DataTableRowActionsProps<T> {}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        title?: string;
    }
}

type ZodFormValues<T extends ZodType> = Zod.infer<T>;

export {
    DataTableRowActionsProps,
    DeleteDialogProps,
    EditDialogProps,
    ZodFormValues
};
