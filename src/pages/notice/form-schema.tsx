import Zod from 'zod';

const formSchema = {
    title: Zod.string({
        required_error: '公告标题不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .max(50, '长度不能超过50')
        .min(1, '公告标题不能为空'),
    content: Zod.string({
        required_error: '公告内容不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .max(2500, '长度不能超过2500')
        .min(1, '公告内容不能为空'),
    status: Zod.enum(['0', '1'], {
        message: '公告状态参数错误'
    })
};

const noticeCreateSchema = Zod.object({
    ...formSchema
});

const noticeEditSchema = Zod.object({
    ...formSchema
});

export { noticeCreateSchema, noticeEditSchema };
