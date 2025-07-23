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
    NoticeListItem,
    DataTableRowActionsProps,
    DeleteDialogProps,
    EditDialogProps,
    ZodFormValues
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { noticeEdit, noticeDelete } from '@/apis';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { noticeEditSchema } from '@/pages/notice/form-schema';
import FormSelect from '@/components/custom/form/form-select';
import { CircleAlertIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FormInput from '@/components/custom/form/form-input';
import { status } from '@/pages/notice/columns';
import FormTextarea from '@/components/custom/form/form-textarea';

type NoticeFormValues = ZodFormValues<typeof noticeEditSchema>;

interface EditFormProps {
    form: UseFormReturn<NoticeFormValues>;
    onSubmit: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ form, onSubmit }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')} onSubmit={onSubmit}>
                <FormInput
                    control={form.control}
                    name="title"
                    label="公告名称"
                    required
                />
                <FormSelect
                    control={form.control}
                    name="status"
                    label="公告状态"
                    required
                    options={status}
                />
                <FormTextarea
                    control={form.control}
                    name="content"
                    label="公告内容"
                    required
                />
            </form>
        </Form>
    );
};

const EditDialog: React.FC<EditDialogProps<NoticeListItem>> = ({
    row,
    onRefresh
}) => {
    const { id, title, content, status } = row;
    const [open, setOpen] = useState(false);

    const form = useForm<NoticeFormValues>({
        resolver: zodResolver(noticeEditSchema),
        defaultValues: {
            title,
            content,
            status: `${status}`
        }
    });

    const { run } = useRequest(noticeEdit, {
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

    const handleEdit = (values: NoticeFormValues) => {
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

    const { run } = useRequest(noticeDelete, {
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
    DataTableRowActionsProps<NoticeListItem>
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
