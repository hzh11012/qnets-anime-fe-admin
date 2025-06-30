import Zod from 'zod';

const optionSchema = Zod.object({
    label: Zod.string().trim(),
    value: Zod.string().trim()
});

const IMAGE_REG = /^(https?:)?\/\/.*\.(jpe?g|png|webp|avif)$/;

const formSchema = {
    name: Zod.string({
        required_error: '推荐名称不能为空',
        invalid_type_error: '推荐名称类型错误'
    })
        .trim()
        .max(50, '长度不能超过50')
        .min(1, '推荐名称不能为空'),
    description: Zod.string({
        required_error: '推荐简介不能为空',
        invalid_type_error: '推荐简介类型错误'
    })
        .trim()
        .max(1000, {
            message: '长度不能超过1000'
        })
        .min(1, '推荐简介不能为空'),
    coverUrl: Zod.string({
        required_error: '推荐封面不能为空',
        invalid_type_error: '推荐封面类型错误'
    })
        .max(255, {
            message: '长度不能超过255'
        })
        .min(1, '推荐封面不能为空')
        .regex(IMAGE_REG, {
            message: '推荐封面格式错误'
        }),
    status: Zod.enum(['0', '1'], {
        message: '推荐状态参数错误'
    }),
    animes: Zod.array(optionSchema, {
        invalid_type_error: '动漫参数错误'
    }).optional()
};

const topicCreateSchema = Zod.object({
    ...formSchema
});

const topicEditSchema = Zod.object({
    ...formSchema
});

export { topicCreateSchema, topicEditSchema };
