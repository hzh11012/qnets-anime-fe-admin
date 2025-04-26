import Zod from 'zod';

const formSchema = {
    name: Zod.string({
        required_error: '角色名称不能为空',
        invalid_type_error: '类型错误'
    })
        .max(10, '长度不能超过10')
        .min(1, '角色名称不能为空'),
    role: Zod.string({
        required_error: '角色编码不能为空',
        invalid_type_error: '类型错误'
    })
        .max(50, '长度不能超过50')
        .min(1, '角色编码不能为空'),
    permissions: Zod.array(
        Zod.string({
            invalid_type_error: '类型错误'
        }),
        {
            invalid_type_error: '类型错误'
        }
    ).optional()
};

const roleEditSchema = Zod.object({
    ...formSchema
});

export { roleEditSchema };
