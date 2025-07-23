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
import { useAnimeTableStore } from '@/store';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { animeCreateSchema } from '@/pages/anime/list/form-schema';
import { animeCreate } from '@/apis';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/custom/form/form-input';
import FormMultiSelect from '@/components/custom/form/form-multiple-select';
import FormSelect from '@/components/custom/form/form-select';
import {
    seasons,
    types,
    status,
    months,
    years
} from '@/pages/anime/list/columns';
import FormVirtualized from '@/components/custom/form/form-virtualized';
import FormTextarea from '@/components/custom/form/form-textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

type RoleFormValues = ZodFormValues<typeof animeCreateSchema>;

interface AddFormProps {
    form: UseFormReturn<RoleFormValues>;
    onSubmit: () => void;
    tags: Option[];
    series: Option[];
}

const AddForm: React.FC<AddFormProps> = ({ form, tags, series, onSubmit }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')} onSubmit={onSubmit}>
                <FormVirtualized
                    control={form.control}
                    name="series"
                    label="动漫系列"
                    required
                    options={series}
                />
                <FormInput
                    control={form.control}
                    name="name"
                    label="动漫名称"
                    required
                />
                <div className={cn('flex gap-6')}>
                    <div className={cn('flex-1')}>
                        <FormVirtualized
                            control={form.control}
                            name="season"
                            label="动漫所属季"
                            required
                            options={seasons}
                        />
                    </div>
                    <div className={cn('flex-1')}>
                        <FormInput
                            control={form.control}
                            name="seasonName"
                            label="动漫所属季名称"
                        />
                    </div>
                </div>
                <FormInput
                    control={form.control}
                    name="remark"
                    label="动漫简评"
                    required
                />
                <FormTextarea
                    control={form.control}
                    name="description"
                    label="动漫简介"
                    required
                />
                <FormTextarea
                    control={form.control}
                    name="coverUrl"
                    label="动漫封面"
                    required
                />
                <FormTextarea
                    control={form.control}
                    name="bannerUrl"
                    label="动漫横幅"
                    required
                />
                <div className={cn('flex gap-6')}>
                    <div className={cn('flex-1')}>
                        <FormSelect
                            control={form.control}
                            name="status"
                            label="动漫状态"
                            required
                            options={status}
                        />
                    </div>
                    <div className={cn('flex-1')}>
                        <FormSelect
                            control={form.control}
                            name="type"
                            label="动漫类型"
                            required
                            options={types}
                        />
                    </div>
                </div>
                <div className={cn('flex gap-6')}>
                    <div className={cn('flex-1')}>
                        <FormVirtualized
                            control={form.control}
                            name="year"
                            label="动漫发行年份"
                            required
                            options={years}
                        />
                    </div>
                    <div className={cn('flex-1')}>
                        <FormSelect
                            control={form.control}
                            name="month"
                            label="动漫发行月份"
                            required
                            options={months}
                        />
                    </div>
                </div>
                <FormMultiSelect
                    control={form.control}
                    name="tags"
                    label="动漫分类"
                    required
                    options={tags}
                />
                <FormInput
                    control={form.control}
                    name="director"
                    label="动漫导演"
                />
                <FormTextarea
                    control={form.control}
                    name="cv"
                    label="动漫声优"
                />
            </form>
        </Form>
    );
};

const AddDialog: React.FC<AddDialogProps> = ({ onRefresh }) => {
    const [open, setOpen] = useState(false);
    const tagsList = useAnimeTableStore(state => state.allTags);
    const seriesList = useAnimeTableStore(state => state.allSeries);

    const form = useForm<RoleFormValues>({
        resolver: zodResolver(animeCreateSchema),
        defaultValues: {
            series: '',
            name: '',
            remark: '',
            description: '',
            coverUrl: '',
            bannerUrl: '',
            status: '0',
            type: '0',
            director: '',
            cv: '',
            year: String(new Date().getFullYear()),
            month: '0',
            season: '1',
            seasonName: '',
            tags: []
        }
    });

    const { run } = useRequest(animeCreate, {
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

    const handleCreate = (values: RoleFormValues) => {
        const { tags, ...args } = values;
        const _tags = tags?.map(item => item.value);
        run({ ...args, tags: _tags });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={cn('h-9 bg-theme')}>新增</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className={cn('px-0')}>
                <DialogHeader className={cn('px-6')}>
                    <DialogTitle className={cn('sm:text-left')}>
                        新增
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea
                    className={cn(
                        'max-h-[calc(100vh-10rem)] sm:max-h-[calc(26rem)]'
                    )}
                >
                    <div className={cn('px-6 pb-1')}>
                        <AddForm
                            form={form}
                            tags={tagsList}
                            series={seriesList}
                            onSubmit={form.handleSubmit(handleCreate)}
                        />
                    </div>
                </ScrollArea>
                <DialogFooter className={cn('flex-row gap-5 px-6')}>
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
