import Zod from 'zod';

const VIDEO_REG = /^(https?:)?\/\/.*\/index\.m3u8$/;

const formSchema = {
    animeId: Zod.string({
        required_error: '动漫不能为空',
        invalid_type_error: '动漫类型错误'
    })
        .trim()
        .max(255, '长度不能超过255')
        .min(1, '动漫不能为空'),
    title: Zod.string({
        invalid_type_error: '视频标题类型错误'
    })
        .trim()
        .max(50, '长度不能超过50')
        .optional(),
    url: Zod.string({
        required_error: '视频链接不能为空',
        invalid_type_error: '视频链接类型错误'
    })
        .trim()
        .max(255, '长度不能超过255')
        .min(1, '视频链接不能为空')
        .regex(VIDEO_REG, {
            message: '视频链接格式错误'
        }),
    episode: Zod.number({
        required_error: '集数编号不能为空',
        invalid_type_error: '集数编号类型错误'
    })
        .int('集数编号必须为整数')
        .max(65535, '集数编号最大为65535')
        .min(0, '集数编号最小为0')
};

const videoCreateSchema = Zod.object({
    ...formSchema
});

const videoEditSchema = Zod.object({
    ...formSchema
});

export { videoCreateSchema, videoEditSchema };
