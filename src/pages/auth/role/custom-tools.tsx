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
import { useRoleTableStore } from '@/store';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleCreateSchema } from '@/pages/auth/role/form-schema';
import { roleCreate } from '@/apis';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/custom/form/form-input';
import FormMultiSelect from '@/components/custom/form/form-multiple-select';

type RoleFormValues = ZodFormValues<typeof roleCreateSchema>;

interface AddFormProps {
    form: UseFormReturn<RoleFormValues>;
    permissions: Option[];
}

const AddForm: React.FC<AddFormProps> = ({ form, permissions }) => {
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

const AddDialog: React.FC<AddDialogProps> = ({ onRefresh }) => {
    const [open, setOpen] = useState(false);
    const permissionsList = useRoleTableStore(state => state.permissions);

    const form = useForm<RoleFormValues>({
        resolver: zodResolver(roleCreateSchema),
        defaultValues: {
            name: '',
            role: '',
            permissions: []
        }
    });

    const { run } = useRequest(roleCreate, {
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
        const { permissions, ...args } = values;
        const _permissions = permissions?.map(item => item.value);
        run({ ...args, permissions: _permissions });
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
                <AddForm form={form} permissions={permissionsList} />
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
