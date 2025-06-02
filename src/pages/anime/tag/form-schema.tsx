import Zod from 'zod';

const formSchema = {
    name: Zod.string({
        required_error: '分类名称不能为空',
        invalid_type_error: '分类名称类型错误'
    })
        .trim()
        .max(50, '长度不能超过50')
        .min(1, '分类名称不能为空')
};

const tagCreateSchema = Zod.object({
    ...formSchema
});

export { tagCreateSchema };
