import Zod from 'zod';

const optionSchema = Zod.object({
    label: Zod.string().trim(),
    value: Zod.string().trim()
});

const formSchema = {
    name: Zod.string({
        required_error: '角色名称不能为空',
        invalid_type_error: '角色名称类型错误'
    })
        .trim()
        .max(10, '长度不能超过10')
        .min(1, '角色名称不能为空'),
    role: Zod.string({
        required_error: '角色编码不能为空',
        invalid_type_error: '角色编码类型错误'
    })
        .trim()
        .max(50, '长度不能超过50')
        .min(1, '角色编码不能为空'),
    permissions: Zod.array(optionSchema, {
        invalid_type_error: '权限参数错误'
    }).optional()
};

const roleEditSchema = Zod.object({
    ...formSchema
});

const roleCreateSchema = Zod.object({
    ...formSchema
});

export { roleEditSchema, roleCreateSchema };
