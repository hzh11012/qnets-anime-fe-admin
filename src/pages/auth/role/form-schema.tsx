import Zod from 'zod';

const optionSchema = Zod.object({
    label: Zod.string().trim(),
    value: Zod.string().trim(),
    disable: Zod.boolean().optional()
});

const formSchema = {
    name: Zod.string({
        required_error: '角色名称不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .max(10, '长度不能超过10')
        .min(1, '角色名称不能为空'),
    role: Zod.string({
        required_error: '角色编码不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .max(50, '长度不能超过50')
        .min(1, '角色编码不能为空'),
    permissions: Zod.array(optionSchema, {
        invalid_type_error: '类型错误'
    }).optional()
};

const roleEditSchema = Zod.object({
    ...formSchema
});

const roleCreateSchema = Zod.object({
    ...formSchema
});

export { roleEditSchema, roleCreateSchema };
