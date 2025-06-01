import React, { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
    CustomToolsProps,
    AddDialogProps,
    ZodFormValues,
    Option
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { useGuideTableStore } from '@/store';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { guideCreateSchema } from '@/pages/anime/guide/form-schema';
import { guideCreate } from '@/apis';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormVirtualized from '@/components/custom/form/form-virtualized';
import FormTime from '@/components/custom/form/form-time';
import FormSelect from '@/components/custom/form/form-select';
import { updateDays } from '@/pages/anime/guide/columns';

type GuideFormValues = ZodFormValues<typeof guideCreateSchema>;

interface AddFormProps {
    form: UseFormReturn<GuideFormValues>;
    onSubmit: () => void;
    animes: Option[];
}

const AddForm: React.FC<AddFormProps> = ({ form, animes, onSubmit }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')} onSubmit={onSubmit}>
                <FormVirtualized
                    control={form.control}
                    name="animeId"
                    label="动漫"
                    required
                    options={animes}
                />
                <div className={cn('flex gap-6')}>
                    <div className={cn('flex-1')}>
                        <FormSelect
                            control={form.control}
                            name="updateDay"
                            label="更新日期"
                            required
                            options={updateDays}
                        />
                    </div>
                    <div className={cn('flex-1')}>
                        <FormTime
                            control={form.control}
                            name="updateTime"
                            label="更新时间"
                            required
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};

const AddDialog: React.FC<AddDialogProps> = ({ onRefresh }) => {
    const [open, setOpen] = useState(false);
    const animesList = useGuideTableStore(state => state.allAnimes);

    const form = useForm<GuideFormValues>({
        resolver: zodResolver(guideCreateSchema),
        defaultValues: {
            animeId: '',
            updateDay: new Date().getDay().toString() as
                | '0'
                | '1'
                | '2'
                | '3'
                | '4'
                | '5'
                | '6',
            updateTime: ''
        }
    });

    const { run } = useRequest(guideCreate, {
        manual: true,
        debounceWait: 300,
        onSuccess({ code, msg }) {
            if (code === 200) {
                onRefresh();
                toast(msg);
                setOpen(false);
                form.reset();
            }
        }
    });

    const handleCreate = (values: GuideFormValues) => {
        run({ ...values });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={cn('h-9 bg-theme')}>新增</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className={cn('sm:text-left')}>
                        新增
                    </DialogTitle>
                </DialogHeader>
                <AddForm
                    form={form}
                    animes={animesList}
                    onSubmit={form.handleSubmit(handleCreate)}
                />
                <DialogFooter className={cn('flex-row gap-5')}>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            className={cn('h-9 flex-1')}
                            variant="outline"
                            aria-label="取消"
                        >
                            取消
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        className={'h-9 flex-1 bg-theme'}
                        onClick={form.handleSubmit(handleCreate)}
                    >
                        确认
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const CustomTools: React.FC<CustomToolsProps> = ({ onRefresh }) => {
    return (
        <div className={cn('space-x-4')}>
            <AddDialog onRefresh={onRefresh} />
        </div>
    );
};

export default CustomTools;
