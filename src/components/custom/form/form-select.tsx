import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { Option } from '@/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    required?: boolean;
    placeholder?: string;
    options: Option[];
}

const FormSelect = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    required,
    placeholder = '请选择',
    options
}: FormSelectProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabel
                            className={cn({
                                required: required
                            })}
                        >
                            {label}
                        </FormLabel>
                    )}
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={`${field.value}`}
                    >
                        <FormControl>
                            <SelectTrigger className={cn('w-full')}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map(item => (
                                <SelectItem
                                    key={item.value}
                                    value={`${item.value}`}
                                >
                                    <span
                                        className={cn(
                                            'flex items-center gap-2'
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormSelect;
