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
import { CustomToolsProps, AddDialogProps, ZodFormValues } from '@/types';
import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { permissionCreateSchema } from '@/pages/auth/permission/form-schema';
import { permissionCreate } from '@/apis';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/custom/form/form-input';

type PermissionFormValues = ZodFormValues<typeof permissionCreateSchema>;

interface AddFormProps {
    form: UseFormReturn<PermissionFormValues>;
    onSubmit: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ form, onSubmit }) => {
    return (
        <Form {...form}>
            <form className={cn('space-y-6')} onSubmit={onSubmit}>
                <FormInput
                    control={form.control}
                    name="name"
                    label="权限名称"
                    required
                />
                <FormInput
                    control={form.control}
                    name="permission"
                    label="权限编码"
                    required
                />
            </form>
        </Form>
    );
};

const AddDialog: React.FC<AddDialogProps> = ({ onRefresh }) => {
    const [open, setOpen] = useState(false);

    const form = useForm<PermissionFormValues>({
        resolver: zodResolver(permissionCreateSchema),
        defaultValues: {
            name: '',
            permission: ''
        }
    });

    const { run } = useRequest(permissionCreate, {
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

    const handleCreate = (values: PermissionFormValues) => {
        run(values);
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
                <AddForm
                    form={form}
                    onSubmit={form.handleSubmit(handleCreate)}
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
