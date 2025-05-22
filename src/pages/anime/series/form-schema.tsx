import Zod from 'zod';

const formSchema = {
    name: Zod.string({
        required_error: '系列名称不能为空',
        invalid_type_error: '类型错误'
    })

        .trim()
        .max(50, '长度不能超过50')
        .min(1, '系列名称不能为空')
};

const seriesCreateSchema = Zod.object({
    ...formSchema
});

export { seriesCreateSchema };
