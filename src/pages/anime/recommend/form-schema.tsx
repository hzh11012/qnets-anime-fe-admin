import Zod from 'zod';

const optionSchema = Zod.object({
    label: Zod.string().trim(),
    value: Zod.string().trim()
});

const formSchema = {
    name: Zod.string({
        required_error: '推荐名称不能为空',
        invalid_type_error: '推荐名称类型错误'
    })
        .trim()
        .max(50, '长度不能超过50')
        .min(1, '推荐名称不能为空'),
    status: Zod.enum(['0', '1'], {
        message: '推荐状态参数错误'
    }),
    animes: Zod.array(optionSchema, {
        invalid_type_error: '动漫参数错误'
    }).optional()
};

const recommendCreateSchema = Zod.object({
    ...formSchema
});

const recommendEditSchema = Zod.object({
    ...formSchema
});

export { recommendCreateSchema, recommendEditSchema };
