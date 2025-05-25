import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    required?: boolean;
    startIcon?: React.ReactNode;
    placeholder?: string;
    maxLength?: number;
}

const FormInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    required,
    placeholder = '请输入',
    startIcon,
    maxLength
}: FormInputProps<TFieldValues>) => {
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
                    <FormControl>
                        {startIcon ? (
                            <div className={cn('relative')}>
                                <Input
                                    className={cn('peer ps-9')}
                                    type="text"
                                    autoComplete="off"
                                    value={field.value}
                                    maxLength={maxLength}
                                    onChange={field.onChange}
                                    placeholder={placeholder}
                                />
                                <div
                                    className={cn(
                                        'text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'
                                    )}
                                >
                                    {startIcon}
                                </div>
                            </div>
                        ) : (
                            <Input
                                type="text"
                                autoComplete="off"
                                value={field.value}
                                maxLength={maxLength}
                                onChange={field.onChange}
                                placeholder={placeholder}
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInput;
