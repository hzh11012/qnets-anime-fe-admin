import {
    BookOpenText,
    ChartColumnStacked,
    Command,
    ContactRound,
    Fingerprint,
    IdCard,
    Images,
    KeyRound,
    LayoutDashboard,
    LayoutList,
    ListVideo,
    Mails,
    MessageCircleQuestion,
    Star,
    Tags,
    Tv,
    Tv2,
    Users2,
    MonitorPlay,
    History
} from 'lucide-react';
import Logo from '@/components/custom/logo';

const SERVER_PREFIX = import.meta.env.VITE_SERVER_PREFIX;

const links = [
    {
        title: '仪表盘',
        icon: LayoutDashboard,
        url: '/'
    },
    {
        title: '番剧管理',
        icon: Tv2,
        isActive: true,
        url: '/anime',
        items: [
            {
                title: '站点轮播',
                icon: Images,
                url: '/banner',
                perm: `${SERVER_PREFIX}:banner`
            },
            {
                title: '新番导视',
                icon: LayoutList,
                url: '/guide',
                perm: `${SERVER_PREFIX}:guide`
            },
            {
                title: '推荐专题',
                icon: Command,
                url: '/topic',
                perm: `${SERVER_PREFIX}:topic`
            },
            {
                title: '系列',
                icon: BookOpenText,
                url: '/series',
                perm: `${SERVER_PREFIX}:series`
            },
            {
                title: '动漫',
                icon: ListVideo,
                url: '/list',
                perm: `${SERVER_PREFIX}:anime`
            },
            {
                title: '视频',
                icon: MonitorPlay,
                url: '/video',
                perm: `${SERVER_PREFIX}:video`
            },
            {
                title: '分类',
                icon: Tags,
                url: '/tag',
                perm: `${SERVER_PREFIX}:tag`
            },
            {
                title: '弹幕',
                icon: Tv,
                url: '/danmaku',
                perm: `${SERVER_PREFIX}:danmaku`
            }
        ]
    },
    {
        title: '用户管理',
        icon: Users2,
        isActive: true,
        url: '/user',
        items: [
            {
                title: '用户',
                icon: ContactRound,
                url: '/list',
                perm: `${SERVER_PREFIX}:user`
            },
            {
                title: '收藏',
                icon: ChartColumnStacked,
                url: '/collection',
                perm: `${SERVER_PREFIX}:collection`
            },
            {
                title: '评分',
                icon: Star,
                url: '/rating',
                perm: `${SERVER_PREFIX}:rating`
            },
            {
                title: '平台留言',
                icon: MessageCircleQuestion,
                url: '/message',
                perm: `${SERVER_PREFIX}:message`
            },
            {
                title: '历史播放',
                icon: History,
                url: '/history',
                perm: `${SERVER_PREFIX}:history`
            }
        ]
    },
    {
        title: '权限管理',
        icon: Fingerprint,
        isActive: true,
        url: '/auth',
        items: [
            {
                title: '角色',
                icon: IdCard,
                url: '/role',
                perm: `${SERVER_PREFIX}:role`
            },
            {
                title: '权限',
                icon: KeyRound,
                url: '/permission',
                perm: `${SERVER_PREFIX}:permission`
            }
        ]
    },
    {
        title: '系统公告',
        icon: Mails,
        url: '/notice',
        perm: `${SERVER_PREFIX}:notice`
    }
];

const platform = {
    logo: Logo,
    title: 'Qnets 轻动漫',
    subTitle: '后台管理中心 '
};

export { links, platform };
