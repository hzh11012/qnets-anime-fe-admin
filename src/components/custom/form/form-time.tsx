import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { parseTime } from '@internationalized/date';
import { Clock } from 'lucide-react';
import { DateInput, DateSegment, TimeField } from 'react-aria-components';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface FormTimeProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    required?: boolean;
}

const FormTime = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    required
}: FormTimeProps<TFieldValues>) => {
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
                        <TimeField
                            aria-label={label}
                            hourCycle={24}
                            name={field.name}
                            defaultValue={
                                field.value
                                    ? parseTime(field.value)
                                    : field.value
                            }
                            hideTimeZone
                            shouldForceLeadingZeros
                            onChange={value => {
                                field.onChange(value?.toString());
                            }}
                        >
                            <div className={cn('relative')}>
                                <DateInput
                                    ref={field.ref}
                                    className={cn(
                                        'relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border dark:bg-input/30 px-3 py-2 pe-9 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20'
                                    )}
                                >
                                    {segment => (
                                        <DateSegment
                                            segment={segment}
                                            className={cn(
                                                'inline rounded p-0.5 text-foreground caret-transparent outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50'
                                            )}
                                        />
                                    )}
                                </DateInput>
                                <div
                                    className={cn(
                                        'pointer-events-none absolute inset-y-0 end-0 z-10 flex items-center justify-center pe-3 text-muted-foreground/50'
                                    )}
                                >
                                    <Clock
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </TimeField>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormTime;
