import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { VirtualizedCommand } from '@/components/ui/virtualized-combobox';
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface FormVirtualizedProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    required?: boolean;
    placeholder?: string;
    options: {
        label: string;
        value: string;
    }[];
}

const FormVirtualized = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    required,
    placeholder = '请选择',
    options
}: FormVirtualizedProps<TFieldValues>) => {
    const [open, setOpen] = useState(false);

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
                            htmlFor=""
                        >
                            {label}
                        </FormLabel>
                    )}

                    <Popover open={open} onOpenChange={setOpen}>
                        <FormControl>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                        'w-full justify-between h-9 hover:bg-transparent cursor-default'
                                    )}
                                >
                                    {!!field.value ? (
                                        <span>
                                            {
                                                options.find(
                                                    item =>
                                                        item.value ===
                                                        field.value
                                                )?.label
                                            }
                                        </span>
                                    ) : (
                                        <span
                                            className={cn(
                                                'text-muted-foreground'
                                            )}
                                        >
                                            {placeholder}
                                        </span>
                                    )}

                                    <ChevronsUpDown
                                        className={cn('shrink-0 opacity-30')}
                                        aria-hidden="true"
                                    />
                                </Button>
                            </PopoverTrigger>
                        </FormControl>
                        <PopoverContent
                            className={cn(
                                'w-[var(--radix-popper-anchor-width)] p-0'
                            )}
                        >
                            <VirtualizedCommand
                                options={options}
                                height="10rem"
                                placeholder="请输入"
                                selectedOption={field.value}
                                onSelectOption={currentValue => {
                                    field.onChange(currentValue);
                                    setOpen(false);
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormVirtualized;
