import Zod from 'zod';

const formSchema = {
    content: Zod.string({
        required_error: '动漫评分内容不能为空',
        invalid_type_error: '动漫评分内容类型错误'
    })
        .trim()
        .max(1000, '长度不能超过1000')
        .min(1, '动漫评分内容不能为空'),
    score: Zod.enum(['1', '2', '3', '4', '5'], {
        message: '动漫评分参数错误'
    })
};

const ratingEditSchema = Zod.object({
    ...formSchema
});

export { ratingEditSchema };
