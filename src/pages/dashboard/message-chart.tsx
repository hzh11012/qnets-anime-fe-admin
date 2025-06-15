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
import { getMessageChartList } from '@/apis';
import { useDashboardStore } from '@/store';

const chartConfig = {
    0: {
        label: '咨询'
    },
    1: {
        label: '建议'
    },
    2: {
        label: '投诉'
    },
    3: {
        label: '其他'
    }
} satisfies ChartConfig;

const RenderChart: React.FC<{ total: number; list: any[] }> = memo(props => {
    const { total, list } = props;
    return (
        <Card className={cn('bg-sidebar shadow-accent border-sidebar-border')}>
            <CardHeader>
                <CardTitle>最近7天留言统计</CardTitle>
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
                            fill="var(--color-pink-300)"
                            radius={4}
                        />
                        <Bar
                            dataKey="1"
                            fill="var(--color-rose-300)"
                            radius={4}
                        />
                        <Bar
                            dataKey="2"
                            fill="var(--color-purple-300)"
                            radius={4}
                        />
                        <Bar
                            dataKey="3"
                            fill="var(--color-violet-300)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
});

const MessageChart: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const total = useDashboardStore(state => state.messageChartTotal);
    const setTotal = useDashboardStore(state => state.setMessageChartTotal);
    const list = useDashboardStore(state => state.messageChartList);
    const setList = useDashboardStore(state => state.setMessageChartList);

    const { cancel } = useRequest(getMessageChartList, {
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

export default MessageChart;
