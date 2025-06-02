import Zod from 'zod';

const formSchema = {
    reply: Zod.string({
        required_error: '回复内容不能为空',
        invalid_type_error: '回复内容类型错误'
    })
        .trim()
        .max(1000, '长度不能超过1000')
        .min(1, '回复内容不能为空'),
    status: Zod.enum(['0', '1', '2', '3'], {
        message: '留言状态参数错误'
    }),
    type: Zod.enum(['0', '1', '2', '3'], {
        message: '留言类型参数错误'
    })
};

const messageEditSchema = Zod.object({
    ...formSchema
});

export { messageEditSchema };
