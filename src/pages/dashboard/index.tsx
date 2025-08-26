import React from 'react';
import { cn } from '@/lib/utils';
import UserChart from '@/pages/dashboard/user-chart';
import AnimeChart from '@/pages/dashboard/anime-chart';
import MessageChart from '@/pages/dashboard/message-chart';
import RatingChart from '@/pages/dashboard/rating-chart';
import CollectionChart from '@/pages/dashboard/collection-chart';
import PlayChart from '@/pages/dashboard/play-chart';
import DanmakuChart from '@/pages/dashboard/danmaku-chart';

const Index: React.FC = () => {
    return (
        <div className={cn('flex flex-col gap-y-6')}>
            <div className={cn('grid gap-6 xl:grid-cols-2 grid-cols-1')}>
                <UserChart />
                <AnimeChart />
            </div>
            <div className={cn('grid gap-6 xl:grid-cols-2 grid-cols-1')}>
                <RatingChart />
                <CollectionChart />
            </div>
            <div className={cn('grid gap-6 xl:grid-cols-2 grid-cols-1')}>
                <PlayChart />
                <DanmakuChart />
            </div>
            <div className={cn('grid gap-6 xl:grid-cols-2 grid-cols-1')}>
                <MessageChart />
            </div>
        </div>
    );
};

export default Index;
