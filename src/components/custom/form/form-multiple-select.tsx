import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { cn } from '@/lib/utils';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface FormMultiSelectProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    required?: boolean;
    placeholder?: string;
    options: Option[];
}

const FormMultiSelect = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    required,
    placeholder = '请选择',
    options
}: FormMultiSelectProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel
                        className={cn({
                            required: required
                        })}
                    >
                        {label}
                    </FormLabel>
                    <FormControl>
                        <MultipleSelector
                            {...field}
                            commandProps={{
                                label: placeholder
                            }}
                            defaultOptions={options}
                            placeholder={placeholder}
                            hidePlaceholderWhenSelected
                            emptyIndicator={
                                <p className={cn('text-center text-sm')}>
                                    暂无数据
                                </p>
                            }
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export default FormMultiSelect;
