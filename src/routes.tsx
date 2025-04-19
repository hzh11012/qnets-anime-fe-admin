import { createBrowserRouter, redirect, RouteObject } from 'react-router-dom';
import Loading from '@/components/custom/loading';
import Error from '@/components/custom/error';
import { getUserInfo } from '@/apis/auth';
import { userStore } from '@/store/user';
import Layout from '@/layout';
import Exception from '@/components/custom/exception';

// 认证 loader
const authLoader = async () => {
    const { data } = await getUserInfo();

    if (data.status === 0) {
        return redirect('/ban');
    }

    userStore.setState({ userInfo: data });

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
                path: '',
                lazy: async () => ({
                    Component: (await import('@/pages/dashboard/index')).default
                })
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
