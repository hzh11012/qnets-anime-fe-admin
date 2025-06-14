import type { ColumnDef } from '@tanstack/react-table';
import Zod, { ZodType } from 'zod';

interface CustomToolsProps {
    onRefresh: () => void;
}

interface DataTableRowActionsProps<T> extends CustomToolsProps {
    row: T;
}

interface DeleteDialogProps extends CustomToolsProps {
    id: string;
    disabled?: boolean;
}

interface AddDialogProps extends CustomToolsProps {}

interface EditDialogProps<T> extends DataTableRowActionsProps<T> {}

interface Option {
    value: string;
    label: string;
    disable?: boolean;
    fixed?: boolean;
    [key: string]: string | boolean | undefined;
}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        title?: string;
    }
}

type ZodFormValues<T extends ZodType> = Zod.infer<T>;

export {
    CustomToolsProps,
    AddDialogProps,
    DataTableRowActionsProps,
    DeleteDialogProps,
    EditDialogProps,
    ZodFormValues,
    Option
};
