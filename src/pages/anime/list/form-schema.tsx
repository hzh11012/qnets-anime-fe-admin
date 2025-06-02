import Zod from 'zod';

const optionSchema = Zod.object({
    label: Zod.string().trim(),
    value: Zod.string().trim()
});

const IMAGE_REG = /^(https?:)?\/\/.*\.(jpe?g|png|webp)$/;

const formSchema = {
    series: Zod.string({
        required_error: '动漫系列不能为空',
        invalid_type_error: '动漫系列类型错误'
    })
        .trim()
        .max(255, '长度不能超过255')
        .min(1, '动漫系列不能为空'),
    name: Zod.string({
        required_error: '动漫名称不能为空',
        invalid_type_error: '动漫名称类型错误'
    })
        .trim()
        .max(25, '长度不能超过25')
        .min(1, '角色名称不能为空'),
    description: Zod.string({
        required_error: '动漫简介不能为空',
        invalid_type_error: '动漫简介类型错误'
    })
        .trim()
        .max(1000, {
            message: '长度不能超过1000'
        })
        .min(1, '动漫简介不能为空'),
    coverUrl: Zod.string({
        required_error: '动漫封面不能为空',
        invalid_type_error: '动漫封面类型错误'
    })
        .max(255, {
            message: '长度不能超过255'
        })
        .min(1, '动漫封面不能为空')
        .regex(IMAGE_REG, {
            message: '动漫封面格式错误'
        }),
    bannerUrl: Zod.string({
        required_error: '动漫横幅不能为空',
        invalid_type_error: '动漫横幅类型错误'
    })
        .max(255, {
            message: '长度不能超过255'
        })
        .min(1, '不能为空')
        .regex(IMAGE_REG, {
            message: '动漫横幅格式错误'
        }),
    status: Zod.enum(['0', '1', '2'], {
        message: '动漫状态参数错误'
    }),
    type: Zod.enum(['0', '1', '2', '3', '4'], {
        message: '动漫类型参数错误'
    }),
    director: Zod.string({
        invalid_type_error: '动漫导演类型错误'
    })
        .max(25, {
            message: '长度不能超过25'
        })
        .optional(),
    cv: Zod.string({
        invalid_type_error: '动漫声优类型错误'
    })
        .max(255, {
            message: '长度不能超过255'
        })
        .optional(),
    year: Zod.enum(
        [
            '1990',
            ...Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) =>
                String(1991 + i)
            )
        ],
        {
            message: '动漫发行年份参数错误'
        }
    ),
    month: Zod.enum(['0', '1', '2', '3'], {
        message: '动漫发行月份参数错误'
    }),
    season: Zod.enum(
        ['0', ...Array.from({ length: 998 }, (_, i) => String(1 + i))],
        {
            message: '动漫所属季参数错误'
        }
    ),
    seasonName: Zod.string({
        invalid_type_error: '动漫所属季名称类型错误'
    })
        .max(10, {
            message: '长度不能超过10'
        })
        .optional(),
    tags: Zod.array(optionSchema, {
        invalid_type_error: '动漫分类参数错误'
    }).optional()
};

const animeCreateSchema = Zod.object({
    ...formSchema
});

const animeEditSchema = Zod.object({
    ...formSchema
});

export { animeCreateSchema, animeEditSchema };
