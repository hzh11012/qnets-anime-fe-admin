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
import type {
    UserListItem,
    DataTableRowActionsProps,
    EditDialogProps,
    ZodFormValues,
    Option
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { userEdit } from '@/apis';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/custom/form/form-input';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userEditSchema } from '@/pages/user/list/form-schema';
import { useUserTableStore } from '@/store';
import FormMultiSelect from '@/components/custom/form/form-multiple-select';
import FormSelect from '@/components/custom/form/form-select';
import { status } from '@/pages/user/list/columns';

type UserFormValues = ZodFormValues<typeof userEditSchema>;

interface EditFormProps {
    form: UseFormReturn<UserFormValues>;
    onSubmit: () => void;
    roles: Option[];
}

const EditForm: React.FC<EditFormProps> = ({ form, roles, onSubmit }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')} onSubmit={onSubmit}>
                <FormInput
                    control={form.control}
                    name="nickname"
                    label="用户昵称"
                    required
                />
                <FormSelect
                    control={form.control}
                    name="status"
                    label="用户状态"
                    required
                    options={status}
                />
                <FormMultiSelect
                    control={form.control}
                    name="roles"
                    label="角色"
                    placeholder="请输入"
                    options={roles}
                />
            </form>
        </Form>
    );
};

const EditDialog: React.FC<EditDialogProps<UserListItem>> = ({
    row,
    onRefresh
}) => {
    const { id, nickname, status, roles } = row;
    const [open, setOpen] = useState(false);
    const rolesList = useUserTableStore(state => state.roles);

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userEditSchema),
        defaultValues: {
            nickname,
            status: `${status}`,
            roles: roles.map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            })
        }
    });

    const { run } = useRequest(userEdit, {
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

    const handleEdit = (values: UserFormValues) => {
        const { roles, ...args } = values;
        const _roles = roles?.map(item => item.value);
        run({ ...args, id, roles: _roles });
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
                    roles={rolesList}
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

const DataTableRowActions: React.FC<DataTableRowActionsProps<UserListItem>> = ({
    row,
    onRefresh
}) => {
    return (
        <div className={cn('space-x-4')}>
            <EditDialog row={row} onRefresh={onRefresh} />
        </div>
    );
};

export { DataTableRowActions };
