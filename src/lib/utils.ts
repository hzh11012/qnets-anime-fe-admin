import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { links } from '@/links';
import { DateTime } from 'luxon';

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

const getTitleByPath = (path: string) => {
    const search = (items: typeof links, basePath: string): string => {
        for (const item of items) {
            // 拼接当前项的完整路径，并处理多余的斜杠
            const currentPath = `${basePath}${item.url}`.replace(/\/+/g, '/');
            // 匹配成功则返回标题
            if (currentPath === path) {
                return item.title;
            }
            // 递归搜索子项，传入新的基础路径（当前路径末尾添加斜杠）
            if (item.items) {
                const result = search(item.items, `${currentPath}/`);
                if (result) {
                    return result;
                }
            }
        }
        return '';
    };
    return search(links, '');
};

const formatDate = (date: string) => {
    return DateTime.fromISO(date).toFormat('DD tt');
};

const createMap = (arr: { label: string; value: string }[]) => {
    return arr.reduce(
        (map, item) => {
            const { label, value } = item;
            map[parseInt(value, 10)] = label;
            return map;
        },
        {} as { [key: number]: string }
    );
};

export { cn, getTitleByPath, formatDate, createMap };
