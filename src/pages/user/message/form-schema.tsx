import Zod from 'zod';

const formSchema = {
    reply: Zod.string({
        required_error: '回复内容不能为空',
        invalid_type_error: '类型错误'
    })
        .max(1000, '长度不能超过1000')
        .min(1, '回复内容不能为空'),
    status: Zod.string({
        required_error: '留言状态不能为空',
        invalid_type_error: '类型错误'
    }).min(1, '留言状态不能为空'),
    type: Zod.string({
        required_error: '留言类型不能为空',
        invalid_type_error: '类型错误'
    }).min(1, '留言类型不能为空')
};

const messageEditSchema = Zod.object({
    ...formSchema
});

export { messageEditSchema };
