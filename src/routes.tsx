import { createBrowserRouter, redirect, RouteObject } from 'react-router-dom';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';
import { getUserInfo } from '@/apis';
import { useUserStore } from '@/store';
import Layout from '@/layout';
import Exception from '@/components/custom/exception';

// 认证 loader
const authLoader = async () => {
    const { data } = await getUserInfo();

    if (data.status === 0) {
        return redirect('/ban');
    }

    useUserStore.setState({ userInfo: data });

    return data;
};

const staticRoutes: RouteObject[] = [
    {
        path: '/',
        loader: authLoader,
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
                children: [
                    {
                        path: 'banner',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/banner/index')
                            ).default
                        })
                    },
                    {
                        path: 'guide',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/guide/index')
                            ).default
                        })
                    },
                    {
                        path: 'recommend',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/recommend/index')
                            ).default
                        })
                    },
                    {
                        path: 'list',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/list/index')
                            ).default
                        })
                    },
                    {
                        path: 'video',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/video/index')
                            ).default
                        })
                    },
                    {
                        path: 'series',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/anime/series/index')
                            ).default
                        })
                    },
                    {
                        path: 'tag',
                        lazy: async () => ({
                            Component: (await import('@/pages/anime/tag/index'))
                                .default
                        })
                    }
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: 'list',
                        lazy: async () => ({
                            Component: (await import('@/pages/user/list/index'))
                                .default
                        })
                    },
                    {
                        path: 'message',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/user/message/index')
                            ).default
                        })
                    },
                    {
                        path: 'rating',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/user/rating/index')
                            ).default
                        })
                    }
                ]
            },
            {
                path: 'auth',
                children: [
                    {
                        path: 'role',
                        lazy: async () => ({
                            Component: (await import('@/pages/auth/role/index'))
                                .default
                        })
                    },
                    {
                        path: 'permission',
                        lazy: async () => ({
                            Component: (
                                await import('@/pages/auth/permission/index')
                            ).default
                        })
                    }
                ]
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

const router = createBrowserRouter(staticRoutes);

export default router;
