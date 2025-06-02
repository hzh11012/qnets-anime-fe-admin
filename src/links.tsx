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
    MessagesSquare,
    Star,
    Tags,
    Tv,
    Tv2,
    Users2,
    MonitorPlay
} from 'lucide-react';
import Logo from '@/components/custom/logo';

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
                url: '/banner'
            },
            {
                title: '新番导视',
                icon: LayoutList,
                url: '/guide'
            },
            {
                title: '每周推荐',
                icon: Command,
                url: '/recommend'
            },
            {
                title: '系列',
                icon: BookOpenText,
                url: '/series'
            },
            {
                title: '动漫',
                icon: ListVideo,
                url: '/list'
            },
            {
                title: '视频',
                icon: MonitorPlay,
                url: '/video'
            },
            {
                title: '分类',
                icon: Tags,
                url: '/tag'
            },
            {
                title: '弹幕',
                icon: Tv,
                url: '/danmaku'
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
                url: '/list'
            },
            {
                title: '收藏',
                icon: ChartColumnStacked,
                url: '/collection'
            },
            {
                title: '评分',
                icon: Star,
                url: '/rating'
            },
            {
                title: '评论',
                icon: MessagesSquare,
                url: '/comment'
            },
            {
                title: '平台留言',
                icon: MessageCircleQuestion,
                url: '/message'
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
                url: '/role'
            },
            {
                title: '权限',
                icon: KeyRound,
                url: '/permission'
            }
        ]
    },
    {
        title: '系统通知',
        icon: Mails,
        url: '/notify'
    }
];

const platform = {
    logo: Logo,
    title: 'Qnets 轻动漫',
    subTitle: '后台管理中心 '
};

export { links, platform };
