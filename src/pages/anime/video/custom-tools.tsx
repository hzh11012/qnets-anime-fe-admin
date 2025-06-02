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
import { useVideoTableStore } from '@/store';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { videoCreateSchema } from '@/pages/anime/video/form-schema';
import { videoCreate } from '@/apis';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormVirtualized from '@/components/custom/form/form-virtualized';
import FormTextarea from '@/components/custom/form/fomr-textarea';
import FormInput from '@/components/custom/form/form-input';
import FormNumber from '@/components/custom/form/form-number';

type VideoFormValues = ZodFormValues<typeof videoCreateSchema>;

interface AddFormProps {
    form: UseFormReturn<VideoFormValues>;
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
                        <FormInput
                            control={form.control}
                            name="title"
                            label="视频标题"
                            required
                        />
                    </div>
                    <div className={cn('flex-1')}>
                        <FormNumber
                            control={form.control}
                            name="episode"
                            label="集数编号"
                            required
                        />
                    </div>
                </div>
                <FormTextarea
                    control={form.control}
                    name="url"
                    label="视频链接"
                    required
                />
            </form>
        </Form>
    );
};

const AddDialog: React.FC<AddDialogProps> = ({ onRefresh }) => {
    const [open, setOpen] = useState(false);
    const animesList = useVideoTableStore(state => state.allAnimes);

    const form = useForm<VideoFormValues>({
        resolver: zodResolver(videoCreateSchema),
        defaultValues: {
            animeId: '',
            title: '',
            url: ''
        }
    });

    const { run } = useRequest(videoCreate, {
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

    const handleCreate = (values: VideoFormValues) => {
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
