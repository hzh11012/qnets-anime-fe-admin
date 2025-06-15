import React, { memo, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';
import { cn, formatChartDate, formateNumber } from '@/lib/utils';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useRequest } from 'ahooks';
import { getDanmakuChartList } from '@/apis';
import { useDashboardStore } from '@/store';

const chartConfig = {
    0: {
        label: '剧场版'
    },
    1: {
        label: '日番'
    },
    2: {
        label: '美番'
    },
    3: {
        label: '国番'
    },
    4: {
        label: '里番'
    }
} satisfies ChartConfig;

const RenderChart: React.FC<{ total: number; list: any[] }> = memo(props => {
    const { total, list } = props;
    return (
        <Card className={cn('bg-sidebar shadow-accent border-sidebar-border')}>
            <CardHeader>
                <CardTitle>最近7天弹幕统计</CardTitle>
                <CardDescription>总数: {formateNumber(total)}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className={cn('aspect-auto h-[17.5rem] w-full')}
                >
                    <BarChart accessibilityLayer data={list}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={16}
                            tickFormatter={formatChartDate}
                            interval="preserveStartEnd"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={formatChartDate}
                                />
                            }
                        />
                        <Bar
                            dataKey="0"
                            fill="var(--color-purple-300)"
                            radius={4}
                        />
                        <Bar
                            dataKey="1"
                            fill="var(--color-amber-300)"
                            radius={4}
                        />
                        <Bar
                            dataKey="2"
                            fill="var(--color-lime-300)"
                            radius={4}
                        />
                        <Bar
                            dataKey="3"
                            fill="var(--color-teal-300)"
                            radius={4}
                        />
                        <Bar
                            dataKey="4"
                            fill="var(--color-blue-300)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
});

const DanmakuChart: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const total = useDashboardStore(state => state.danmakuChartTotal);
    const setTotal = useDashboardStore(state => state.setDanmakuChartTotal);
    const list = useDashboardStore(state => state.danmakuChartList);
    const setList = useDashboardStore(state => state.setDanmakuChartList);

    const { cancel } = useRequest(getDanmakuChartList, {
        debounceWait: 250,
        onSuccess: data => {
            const { rows, total } = data.data;
            setTotal(total);
            setList(rows);
        }
    });

    useEffect(() => {
        return () => {
            cancel();
        };
    }, [cancel]);

    return <RenderChart total={total} list={list} />;
};

export default DanmakuChart;
