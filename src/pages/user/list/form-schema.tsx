import Zod from 'zod';

const optionSchema = Zod.object({
    label: Zod.string().trim(),
    value: Zod.string().trim()
});

const formSchema = {
    nickname: Zod.string({
        required_error: '用户名称不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .max(25, '长度不能超过25')
        .min(1, '用户名称不能为空'),
    status: Zod.enum(['0', '1'], {
        message: '用户状态参数错误'
    }),
    roles: Zod.array(optionSchema, {
        invalid_type_error: '角色参数错误'
    }).optional()
};

const userEditSchema = Zod.object({
    ...formSchema
});

export { userEditSchema };
