import Zod from 'zod';

const formSchema = {
    animeId: Zod.string({
        required_error: '动漫不能为空',
        invalid_type_error: '动漫类型错误'
    })
        .trim()
        .max(255, '长度不能超过255')
        .min(1, '动漫不能为空'),
    updateDay: Zod.enum(['0', '1', '2', '3', '4', '5', '6'], {
        message: '更新日期参数错误'
    }),
    updateTime: Zod.string({
        required_error: '更新时间不能为空',
        invalid_type_error: '更新时间类型错误'
    }).time({
        message: '更新时间格式错误'
    })
};

const guideCreateSchema = Zod.object({
    ...formSchema
});

const guideEditSchema = Zod.object({
    ...formSchema
});

export { guideCreateSchema, guideEditSchema };
