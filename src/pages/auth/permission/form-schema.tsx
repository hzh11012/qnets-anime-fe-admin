import Zod from 'zod';

const formSchema = {
    name: Zod.string({
        required_error: '权限名称不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .max(10, '长度不能超过10')
        .min(1, '权限名称不能为空'),
    permission: Zod.string({
        required_error: '权限编码不能为空',
        invalid_type_error: '类型错误'
    })
        .trim()
        .max(50, '长度不能超过50')
        .min(1, '权限编码不能为空')
};

const permissionCreateSchema = Zod.object({
    ...formSchema
});

export { permissionCreateSchema };
