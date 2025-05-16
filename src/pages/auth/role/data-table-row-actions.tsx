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
    RoleListItem,
    DataTableRowActionsProps,
    DeleteDialogProps,
    EditDialogProps,
    ZodFormValues,
    Option
} from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { roleEdit, roleDelete } from '@/apis';
import { Button } from '@/components/ui/button';
import { CircleAlertIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/custom/form/form-input';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleEditSchema } from '@/pages/auth/role/form-schema';
import { useRoleTableStore } from '@/store';
import FormMultiSelect from '@/components/custom/form/form-multiple-select';

type RoleFormValues = ZodFormValues<typeof roleEditSchema>;

interface EditFormProps {
    form: UseFormReturn<RoleFormValues>;
    permissions: Option[];
}

const EditForm: React.FC<EditFormProps> = ({ form, permissions }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')}>
                <FormInput
                    control={form.control}
                    name="name"
                    label="角色名称"
                    required
                />
                <FormInput
                    control={form.control}
                    name="role"
                    label="角色编码"
                    required
                />
                <FormMultiSelect
                    control={form.control}
                    name="permissions"
                    label="权限"
                    placeholder="请输入"
                    options={permissions}
                />
            </form>
        </Form>
    );
};

const EditDialog: React.FC<EditDialogProps<RoleListItem>> = ({
    row,
    onRefresh
}) => {
    const { id, name, role, permissions } = row;
    const [open, setOpen] = useState(false);
    const permissionsList = useRoleTableStore(state => state.permissions);

    const form = useForm<RoleFormValues>({
        resolver: zodResolver(roleEditSchema),
        defaultValues: {
            name,
            role,
            permissions: permissions.map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            })
        }
    });

    const { run } = useRequest(roleEdit, {
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

    const handleEdit = (values: RoleFormValues) => {
        const { permissions, ...args } = values;
        const _permissions = permissions?.map(item => item.value);
        run({ ...args, id, permissions: _permissions });
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
                <EditForm form={form} permissions={permissionsList} />
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

const DeleteDialog: React.FC<DeleteDialogProps & { name: string }> = ({
    id,
    name,
    onRefresh
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const { run } = useRequest(roleDelete, {
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
                            此操作无法撤销。 若删除, 请输入角色名称：
                            <span className={cn('text-theme')}>{name}</span>
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className={cn('space-y-5')}>
                    <div className={cn('*:not-first:mt-2')}>
                        <Input
                            type="text"
                            placeholder={`请输入 ${name} 确认`}
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
                            disabled={value !== name}
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

const DataTableRowActions: React.FC<DataTableRowActionsProps<RoleListItem>> = ({
    row,
    onRefresh
}) => {
    const { id, name } = row;

    return (
        <div className={cn('space-x-4')}>
            <EditDialog row={row} onRefresh={onRefresh} />
            <DeleteDialog id={id} name={name} onRefresh={onRefresh} />
        </div>
    );
};

export { DataTableRowActions };
