import { createBrowserRouter, redirect, RouteObject } from 'react-router-dom';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';
import { getUserInfo } from '@/apis';
import { useUserStore } from '@/store';
import Layout from '@/layout';
import Exception from '@/components/custom/exception';

const ADMIN = import.meta.env.VITE_ADMIN;
const SERVER_PREFIX = import.meta.env.VITE_SERVER_PREFIX;

// 认证 loader
const authLoader = async () => {
    const { data } = await getUserInfo();
    useUserStore.setState({ userInfo: data });
    return data;
};

const WithLayout = ({ children }: { children: React.ReactNode }) => {
    const userInfo = useUserStore(state => state.userInfo);
    if (userInfo?.status === 0) {
        return <Exception code="43" msg="账号已封禁" />;
    }
    return <>{children}</>;
};

// 权限检查的包装组件
const WithPermission = ({
    children,
    perm
}: {
    children: React.ReactNode;
    perm?: string;
}) => {
    const userInfo = useUserStore(state => state.userInfo);

    if (!perm || userInfo?.permissions?.includes(ADMIN)) {
        return <>{children}</>;
    }

    if (!userInfo?.permissions?.includes(perm)) {
        return <Exception code="43" />;
    }

    return <>{children}</>;
};

const staticRoutes: RouteObject[] = [
    {
        path: '/',
        loader: authLoader,
        Component: () => (
            <WithLayout>
                <Layout />
            </WithLayout>
        ),
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
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/anime/banner/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:banner`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'guide',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/anime/guide/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:guide`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'recommend',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/anime/recommend/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:recommend`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'series',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/anime/series/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:series`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'list',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/anime/list/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:anime`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'video',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/anime/video/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:video`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'tag',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/anime/tag/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:tag`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'danmaku',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/anime/danmaku/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:danmaku`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
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
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/user/list/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:user`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'collection',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/user/collection/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:collection`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'rating',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/user/rating/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:rating`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'comment',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/user/comment/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:comment`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'message',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/user/message/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:message`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
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
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/auth/role/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:role`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    },
                    {
                        path: 'permission',
                        lazy: async () => {
                            const Component = (
                                await import('@/pages/auth/permission/index')
                            ).default;
                            return {
                                Component: () => (
                                    <WithPermission
                                        perm={`${SERVER_PREFIX}:permission`}
                                    >
                                        <Component />
                                    </WithPermission>
                                )
                            };
                        }
                    }
                ]
            },
            {
                path: 'notice',
                lazy: async () => {
                    const Component = (await import('@/pages/notice/index'))
                        .default;
                    return {
                        Component: () => (
                            <WithPermission perm={`${SERVER_PREFIX}:notice`}>
                                <Component />
                            </WithPermission>
                        )
                    };
                }
            },
            {
                path: '*',
                element: <Exception code="44" />
            }
        ]
    }
];

const router = createBrowserRouter(staticRoutes as RouteObject[]);

export default router;
