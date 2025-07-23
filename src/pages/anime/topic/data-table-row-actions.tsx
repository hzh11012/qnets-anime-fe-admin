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
    TopicListItem,
    DataTableRowActionsProps,
    DeleteDialogProps,
    EditDialogProps,
    ZodFormValues,
    Option
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { topicEdit, topicDelete } from '@/apis';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { topicEditSchema } from '@/pages/anime/topic/form-schema';
import FormSelect from '@/components/custom/form/form-select';
import { CircleAlertIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useGuideTableStore } from '@/store';
import FormInput from '@/components/custom/form/form-input';
import FormMultiSelect from '@/components/custom/form/form-multiple-select';
import { status } from '@/pages/anime/topic/columns';
import FormTextarea from '@/components/custom/form/form-textarea';

type TopicFormValues = ZodFormValues<typeof topicEditSchema>;

interface EditFormProps {
    form: UseFormReturn<TopicFormValues>;
    onSubmit: () => void;
    animes: Option[];
}

const EditForm: React.FC<EditFormProps> = ({ form, animes, onSubmit }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')} onSubmit={onSubmit}>
                <div className={cn('flex gap-6')}>
                    <div className={cn('flex-1')}>
                        <FormInput
                            control={form.control}
                            name="name"
                            label="专题名称"
                            required
                        />
                    </div>
                    <div className={cn('flex-1')}>
                        <FormSelect
                            control={form.control}
                            name="status"
                            label="专题状态"
                            required
                            options={status}
                        />
                    </div>
                </div>
                <FormTextarea
                    control={form.control}
                    name="description"
                    label="专题简介"
                    required
                />
                <FormTextarea
                    control={form.control}
                    name="coverUrl"
                    label="专题封面"
                    required
                />
                <FormMultiSelect
                    control={form.control}
                    name="animes"
                    label="关联动漫"
                    required
                    options={animes}
                />
            </form>
        </Form>
    );
};

const EditDialog: React.FC<EditDialogProps<TopicListItem>> = ({
    row,
    onRefresh
}) => {
    const { id, name, description, coverUrl, status, animes } = row;
    const [open, setOpen] = useState(false);
    const animesList = useGuideTableStore(state => state.allAnimes);

    const form = useForm<TopicFormValues>({
        resolver: zodResolver(topicEditSchema),
        defaultValues: {
            name,
            description,
            coverUrl,
            status: `${status}`,
            animes: animes.map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            })
        }
    });

    const { run } = useRequest(topicEdit, {
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

    const handleEdit = (values: TopicFormValues) => {
        const { animes, ...args } = values;
        const _animes = animes?.map(item => item.value);
        run({ ...args, id, animes: _animes });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className={cn('h-8 p-0 text-blue-500')}>
                    编辑
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className={cn('sm:text-left')}>
                        编辑
                    </DialogTitle>
                </DialogHeader>
                <EditForm
                    form={form}
                    animes={animesList}
                    onSubmit={form.handleSubmit(handleEdit)}
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

    const { run } = useRequest(topicDelete, {
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
    DataTableRowActionsProps<TopicListItem>
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
