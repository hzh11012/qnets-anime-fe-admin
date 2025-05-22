import Zod from 'zod';

const optionSchema = Zod.object({
    label: Zod.string().trim(),
    value: Zod.string().trim(),
    disable: Zod.boolean().optional()
});

const formSchema = {
    nickname: Zod.string({
        required_error: '用户名称不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .max(25, '长度不能超过25')
        .min(1, '用户名称不能为空'),
    status: Zod.string({
        required_error: '用户状态不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .min(1, '用户状态不能为空'),
    roles: Zod.array(optionSchema, {
        invalid_type_error: '类型错误'
    }).optional()
};

const userEditSchema = Zod.object({
    ...formSchema
});

export { userEditSchema };
