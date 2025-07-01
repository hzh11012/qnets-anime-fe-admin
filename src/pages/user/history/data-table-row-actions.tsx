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
    HistoryListItem,
    DataTableRowActionsProps,
    DeleteDialogProps
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { historyDelete } from '@/apis';
import { Button } from '@/components/ui/button';
import { CircleAlertIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DeleteDialog: React.FC<DeleteDialogProps> = ({ id, onRefresh }) => {
    const tip = '确认删除';
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const { run } = useRequest(historyDelete, {
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
    DataTableRowActionsProps<HistoryListItem>
> = ({ row, onRefresh }) => {
    const { id } = row;

    return (
        <div className={cn('space-x-4')}>
            <DeleteDialog id={id} onRefresh={onRefresh} />
        </div>
    );
};

export { DataTableRowActions };
