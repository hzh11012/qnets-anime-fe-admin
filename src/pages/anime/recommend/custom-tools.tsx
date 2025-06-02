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
import { useRecommendTableStore } from '@/store';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recommendCreateSchema } from '@/pages/anime/recommend/form-schema';
import { recommendCreate } from '@/apis';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormSelect from '@/components/custom/form/form-select';
import FormMultiSelect from '@/components/custom/form/form-multiple-select';
import FormInput from '@/components/custom/form/form-input';
import { status } from '@/pages/anime/recommend/columns';

type RecommendFormValues = ZodFormValues<typeof recommendCreateSchema>;

interface AddFormProps {
    form: UseFormReturn<RecommendFormValues>;
    onSubmit: () => void;
    animes: Option[];
}

const AddForm: React.FC<AddFormProps> = ({ form, animes, onSubmit }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')} onSubmit={onSubmit}>
                <div className={cn('flex gap-6')}>
                    <div className={cn('flex-1')}>
                        <FormInput
                            control={form.control}
                            name="name"
                            label="推荐名称"
                            required
                        />
                    </div>
                    <div className={cn('flex-1')}>
                        <FormSelect
                            control={form.control}
                            name="status"
                            label="推荐状态"
                            required
                            options={status}
                        />
                    </div>
                </div>
                <FormMultiSelect
                    control={form.control}
                    name="animes"
                    label="动漫"
                    required
                    options={animes}
                />
            </form>
        </Form>
    );
};

const AddDialog: React.FC<AddDialogProps> = ({ onRefresh }) => {
    const [open, setOpen] = useState(false);
    const animesList = useRecommendTableStore(state => state.allAnimes);

    const form = useForm<RecommendFormValues>({
        resolver: zodResolver(recommendCreateSchema),
        defaultValues: {
            name: '',
            status: '1',
            animes: []
        }
    });

    const { run } = useRequest(recommendCreate, {
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

    const handleCreate = (values: RecommendFormValues) => {
        const { animes, ...args } = values;
        const _animes = animes?.map(item => item.value);
        run({ ...args, animes: _animes });
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
