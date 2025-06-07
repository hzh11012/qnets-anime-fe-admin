import { createBrowserRouter, redirect, RouteObject } from 'react-router-dom';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';
import { getUserInfo } from '@/apis';
import { useUserStore } from '@/store';
import Layout from '@/layout';
import Exception from '@/components/custom/exception';

const ADMIN = import.meta.env.VITE_ADMIN;
const SERVER_PREFIX = import.meta.env.VITE_SERVER_PREFIX;

interface CustomRouteProps {
    perm?: string;
}

type CustomRouteObject = Omit<RouteObject, 'children'> &
    CustomRouteProps & {
        children?: CustomRouteObject[];
    };

// 认证 loader
const authLoader = async () => {
    const { data } = await getUserInfo();

    if (data.status === 0) {
        return redirect('/ban');
    }

    useUserStore.setState({ userInfo: data });

    return data;
};

// 路由权限检查 loader
const permissionLoader = async ({ request }: { request: Request }) => {
    const { userInfo } = useUserStore.getState();
    const url = new URL(request.url);
    const path = url.pathname;

    if (userInfo?.permissions?.includes(ADMIN)) {
        return null;
    }

    // 获取当前路由配置
    const currentRoute = staticRoutes[0].children?.find(route => {
        if (route.path === path) return true;
        if (route.children) {
            return route.children.some(
                child => `${route.path}/${child.path}` === path
            );
        }
        return false;
    });

    // 如果路由需要权限检查
    if (currentRoute?.perm) {
        // 检查用户是否有权限
        if (!userInfo?.permissions?.includes(currentRoute.perm)) {
            return redirect('/');
        }
    }

    return null;
};

const staticRoutes: CustomRouteObject[] = [
    {
        path: '/',
        loader: async args => {
            // 认证检查
            await authLoader();
            // 权限检查
            return permissionLoader(args);
        },
        element: <Layout />,
        hydrateFallbackElement: <Loading />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import('@/pages/dashboard/index')).default
                })
            },
            {
                path: 'anime',
                loader: ({ request }) => {
                    const url = new URL(request.url);
                    if (/^\/anime\/?$/.test(url.pathname)) {
                        return redirect('/anime/banner');
                    }
                    return null;
                },
                children: [
                    {
                        path: 'banner',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/banner/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:banner`
                    },
                    {
                        path: 'guide',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/guide/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:guide`
                    },
                    {
                        path: 'recommend',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/recommend/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:recommend`
                    },
                    {
                        path: 'series',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/series/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:series`
                    },
                    {
                        path: 'list',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/list/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:anime`
                    },
                    {
                        path: 'video',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/video/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:video`
                    },
                    {
                        path: 'tag',
                        lazy: async () => ({
                            Component: (await import('@/pages/anime/tag/index'))
                                .default
                        }),
                        perm: `${SERVER_PREFIX}:tag`
                    }
                ]
            },
            {
                path: 'user',
                loader: ({ request }) => {
                    const url = new URL(request.url);
                    if (/^\/user\/?$/.test(url.pathname)) {
                        return redirect('/user/list');
                    }
                    return null;
                },
                children: [
                    {
                        path: 'list',
                        lazy: async () => ({
                            Component: (await import('@/pages/user/list/index'))
                                .default
                        }),
                        perm: `${SERVER_PREFIX}:user`
                    },
                    {
                        path: 'collection',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/user/collection/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:collection`
                    },
                    {
                        path: 'rating',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/user/rating/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:rating`
                    },
                    {
                        path: 'message',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/user/message/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:message`
                    }
                ]
            },
            {
                path: 'auth',
                loader: ({ request }) => {
                    const url = new URL(request.url);
                    if (/^\/auth\/?$/.test(url.pathname)) {
                        return redirect('/auth/role');
                    }
                    return null;
                },
                children: [
                    {
                        path: 'role',
                        lazy: async () => ({
                            Component: (await import('@/pages/auth/role/index'))
                                .default
                        }),
                        perm: `${SERVER_PREFIX}:role`
                    },
                    {
                        path: 'permission',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/auth/permission/index')
                            ).default
                        }),
                        perm: `${SERVER_PREFIX}:permission`
                    }
                ]
            },
            {
                path: 'notice',
                lazy: async () => ({
                    Component: (await import('@/pages/notice/index')).default
                }),
                perm: `${SERVER_PREFIX}:notice`
            },
            {
                path: '*',
                element: <Exception code="44" />
            }
        ]
    },
    {
        path: '/ban',
        element: <Exception code="43" msg="您的账户已被封禁" />
    }
];

const router = createBrowserRouter(staticRoutes as RouteObject[]);

export default router;
