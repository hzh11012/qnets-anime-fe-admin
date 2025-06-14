import Zod from 'zod';

const formSchema = {
    content: Zod.string({
        required_error: '评论内容不能为空',
        invalid_type_error: '评论内容类型错误'
    })
        .trim()
        .max(2500, '长度不能超过2500')
        .min(1, '评论内容不能为空')
};

const commentEditSchema = Zod.object({
    ...formSchema
});

export { commentEditSchema };
