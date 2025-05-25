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
import { useBannerTableStore } from '@/store';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bannerCreateSchema } from '@/pages/anime/banner/form-schema';
import { bannerCreate } from '@/apis';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormVirtualized from '@/components/custom/form/form-virtualized';

type BannerFormValues = ZodFormValues<typeof bannerCreateSchema>;

interface AddFormProps {
    form: UseFormReturn<BannerFormValues>;
    animes: Option[];
}

const AddForm: React.FC<AddFormProps> = ({ form, animes }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')}>
                <FormVirtualized
                    control={form.control}
                    name="animeId"
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
    const animesList = useBannerTableStore(state => state.allAnimes);

    const form = useForm<BannerFormValues>({
        resolver: zodResolver(bannerCreateSchema),
        defaultValues: {
            animeId: ''
        }
    });

    const { run } = useRequest(bannerCreate, {
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

    const handleCreate = (values: BannerFormValues) => {
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
                <AddForm form={form} animes={animesList} />
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
