import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { links } from '@/links';
import { DateTime } from 'luxon';

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

const getTitleByPath = (items: typeof links, path: string) => {
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
    return search(items, '');
};

const filterLinksByPermissions = (
    items: typeof links,
    permissions: string[]
) => {
    const filterItems = (items: any[]) => {
        if (!items) return [];
        return items.filter(item => {
            // 如果项目有子项目，递归过滤
            if (item.items) {
                const filteredItems = filterItems(item.items);
                // 如果过滤后还有子项目，保留该项目
                if (filteredItems.length > 0) {
                    item.items = filteredItems;
                    return true;
                }
                return false;
            }
            // 检查权限
            return !item.perm || permissions.some(perm => item.perm === perm);
        });
    };

    return filterItems(items);
};

const formatDate = (date: string) => {
    return DateTime.fromISO(date).toFormat('DD tt');
};

const formatChartDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
        month: 'numeric',
        day: 'numeric'
    });
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

const formateNumber = (x: number) => {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};

function formatVideoTime(time: number) {
    // 处理无效输入，确保为非负数
    const _time = Math.max(0, Math.floor(time));

    // 计算时间分量
    const hours = Math.floor(_time / 3600);
    const minutes = Math.floor((_time % 3600) / 60);
    const seconds = _time % 60;

    // 格式化所有部分为两位数
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    if (hours > 0) {
        // 格式化小时为两位数
        const formattedHours = hours.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        // 分钟部分也补零
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}

export {
    cn,
    getTitleByPath,
    filterLinksByPermissions,
    formatDate,
    formatChartDate,
    createMap,
    formateNumber,
    formatVideoTime
};
