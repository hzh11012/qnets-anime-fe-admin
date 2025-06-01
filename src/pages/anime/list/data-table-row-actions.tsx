import React, { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type {
    AnimeListItem,
    DataTableRowActionsProps,
    DeleteDialogProps,
    EditDialogProps,
    ZodFormValues,
    Option
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { animeEdit, animeDelete } from '@/apis';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormTextarea from '@/components/custom/form/fomr-textarea';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { animeEditSchema } from '@/pages/anime/list/form-schema';
import FormSelect from '@/components/custom/form/form-select';
import {
    seasons,
    types,
    status,
    months,
    years
} from '@/pages/anime/list/columns';
import { CircleAlertIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FormVirtualized from '@/components/custom/form/form-virtualized';
import FormInput from '@/components/custom/form/form-input';
import { useAnimeTableStore } from '@/store';
import FormMultiSelect from '@/components/custom/form/form-multiple-select';
import { ScrollArea } from '@/components/ui/scroll-area';

type AnimeFormValues = ZodFormValues<typeof animeEditSchema>;

interface EditFormProps {
    form: UseFormReturn<AnimeFormValues>;
    onSubmit: () => void;
    tags: Option[];
    series: Option[];
}

const EditForm: React.FC<EditFormProps> = ({
    form,
    tags,
    series,
    onSubmit
}) => {
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
                <FormTextarea
                    control={form.control}
                    name="description"
                    label="动漫简介"
                    required
                />
                <FormInput
                    control={form.control}
                    name="coverUrl"
                    label="动漫封面"
                    required
                />
                <FormInput
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

const EditDialog: React.FC<EditDialogProps<AnimeListItem>> = ({
    row,
    onRefresh
}) => {
    const {
        id,
        animeSeriesId,
        status,
        type,
        year,
        month,
        season,
        animeTags,
        seasonName,
        director,
        cv,
        ...rest
    } = row;
    const [open, setOpen] = useState(false);
    const tagsList = useAnimeTableStore(state => state.allTags);
    const seriesList = useAnimeTableStore(state => state.allSeries);

    const form = useForm<AnimeFormValues>({
        resolver: zodResolver(animeEditSchema),
        defaultValues: {
            series: animeSeriesId,
            status: `${status}`,
            type: `${type}`,
            year: `${year}`,
            season: `${season}`,
            month: `${month}`,
            tags: animeTags.map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            }),
            seasonName: seasonName || '',
            director: director || '',
            cv: cv || '',
            ...rest
        }
    });

    const { run } = useRequest(animeEdit, {
        manual: true,
        debounceWait: 300,
        onSuccess({ code, msg }) {
            if (code === 200) {
                onRefresh();
                toast(msg);
                setOpen(false);
            }
        }
    });

    const handleEdit = (values: AnimeFormValues) => {
        const { tags, ...args } = values;
        const _tags = tags?.map(item => item.value);
        run({ ...args, id, tags: _tags });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className={cn('h-8 p-0 text-blue-500')}>
                    编辑
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className={cn('px-0')}>
                <DialogHeader className={cn('px-6')}>
                    <DialogTitle className={cn('sm:text-left')}>
                        编辑
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea
                    className={cn(
                        'max-h-[calc(100vh-10rem)] sm:max-h-[calc(26rem)]'
                    )}
                >
                    <div className={cn('px-6 pb-1')}>
                        <EditForm
                            form={form}
                            tags={tagsList}
                            series={seriesList}
                            onSubmit={form.handleSubmit(handleEdit)}
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
                        onClick={form.handleSubmit(handleEdit)}
                    >
                        确认
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({ id, onRefresh }) => {
    const tip = '确认删除';
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const { run } = useRequest(animeDelete, {
        manual: true,
        debounceWait: 300,
        onSuccess({ code, msg }) {
            if (code === 200) {
                onRefresh();
                toast(msg);
                setOpen(false);
            }
        }
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className={cn('h-8 p-0 text-red-500')}>
                    删除
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className={cn('flex flex-col items-center gap-2')}>
                    <div
                        className={cn(
                            'flex size-9 shrink-0 items-center justify-center rounded-full border'
                        )}
                        aria-hidden="true"
                    >
                        <CircleAlertIcon
                            className={cn('opacity-80 text-red-500')}
                            size={18}
                        />
                    </div>
                    <DialogHeader>
                        <DialogTitle className={cn('sm:text-center')}>
                            确认删除
                        </DialogTitle>
                        <DialogDescription className={cn('sm:text-center')}>
                            此操作无法撤销。 若删除, 请输入：
                            <span className={cn('text-theme')}>{tip}</span>
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form
                    className={cn('space-y-6')}
                    onSubmit={e => e.preventDefault()}
                >
                    <div className={cn('*:not-first:mt-2')}>
                        <Input
                            type="text"
                            placeholder={`请输入 ${tip} 确认`}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
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
                            disabled={value !== tip}
                            onClick={() => run({ id })}
                        >
                            删除
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const DataTableRowActions: React.FC<
    DataTableRowActionsProps<AnimeListItem>
> = ({ row, onRefresh }) => {
    const { id } = row;

    return (
        <div className={cn('space-x-4')}>
            <EditDialog row={row} onRefresh={onRefresh} />
            <DeleteDialog id={id} onRefresh={onRefresh} />
        </div>
    );
};

export { DataTableRowActions };
