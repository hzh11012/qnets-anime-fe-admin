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
    RatingListItem,
    DataTableRowActionsProps,
    DeleteDialogProps,
    EditDialogProps,
    ZodFormValues
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { ratingEdit, ratingDelete } from '@/apis';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormTextarea from '@/components/custom/form/fomr-textarea';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ratingEditSchema } from '@/pages/user/rating/form-schema';
import FormSelect from '@/components/custom/form/form-select';
import { CircleAlertIcon } from 'lucide-react';
import { scores } from '@/pages/user/rating/columns';
import { Input } from '@/components/ui/input';

type RatingFormValues = ZodFormValues<typeof ratingEditSchema>;

interface EditFormProps {
    form: UseFormReturn<RatingFormValues>;
    onSubmit: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ form, onSubmit }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')} onSubmit={onSubmit}>
                <FormSelect
                    control={form.control}
                    name="score"
                    label="动漫评分"
                    required
                    options={scores}
                />
                <FormTextarea
                    control={form.control}
                    name="content"
                    label="动漫评论内容"
                    required
                />
            </form>
        </Form>
    );
};

const EditDialog: React.FC<EditDialogProps<RatingListItem>> = ({
    row,
    onRefresh
}) => {
    const { id, score, content } = row;
    const [open, setOpen] = useState(false);

    const form = useForm<RatingFormValues>({
        resolver: zodResolver(ratingEditSchema),
        defaultValues: {
            score: `${score}`,
            content
        }
    });

    const { run } = useRequest(ratingEdit, {
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

    const handleEdit = (values: RatingFormValues) => {
        run({ id, ...values });
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

    const { run } = useRequest(ratingDelete, {
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
    DataTableRowActionsProps<RatingListItem>
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
