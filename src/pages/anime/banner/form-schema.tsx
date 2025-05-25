import Zod from 'zod';

const formSchema = {
    animeId: Zod.string({
        required_error: '动漫不能为空',
        invalid_type_error: '动漫类型错误'
    })
        .trim()
        .max(255, '长度不能超过255')
        .min(1, '动漫不能为空')
};

const bannerCreateSchema = Zod.object({
    ...formSchema
});

export { bannerCreateSchema };
