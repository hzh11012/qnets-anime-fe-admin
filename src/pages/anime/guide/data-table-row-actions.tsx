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
    GuideListItem,
    DataTableRowActionsProps,
    DeleteDialogProps,
    EditDialogProps,
    ZodFormValues,
    Option
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { guideEdit, guideDelete } from '@/apis';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { guideEditSchema } from '@/pages/anime/guide/form-schema';
import FormSelect from '@/components/custom/form/form-select';
import { CircleAlertIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FormVirtualized from '@/components/custom/form/form-virtualized';
import { useGuideTableStore } from '@/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateDays } from '@/pages/anime/guide/columns';
import FormTime from '@/components/custom/form/form-time';

type GuideFormValues = ZodFormValues<typeof guideEditSchema>;

interface EditFormProps {
    form: UseFormReturn<GuideFormValues>;
    onSubmit: () => void;
    animes: Option[];
}

const EditForm: React.FC<EditFormProps> = ({ form, animes, onSubmit }) => {
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

const EditDialog: React.FC<EditDialogProps<GuideListItem>> = ({
    row,
    onRefresh
}) => {
    const { id, animeId, updateDay, updateTime } = row;
    const [open, setOpen] = useState(false);
    const animesList = useGuideTableStore(state => state.allAnimes);

    const form = useForm<GuideFormValues>({
        resolver: zodResolver(guideEditSchema),
        defaultValues: {
            animeId,
            updateDay: `${updateDay}`,
            updateTime
        }
    });

    const { run } = useRequest(guideEdit, {
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

    const handleEdit = (values: GuideFormValues) => {
        run({ id, ...values });
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
                            animes={animesList}
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

    const { run } = useRequest(guideDelete, {
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
    DataTableRowActionsProps<GuideListItem>
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
