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
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { useRequest } from 'ahooks';
import { getCommentChartList } from '@/apis';
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
                <CardTitle>最近7天评论统计</CardTitle>
                <CardDescription>总数: {formateNumber(total)}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className={cn('aspect-auto h-[17.5rem] w-full')}
                >
                    <LineChart accessibilityLayer data={list}>
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
                        <Line
                            dataKey="0"
                            type="linear"
                            stroke="var(--color-purple-300)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="1"
                            type="linear"
                            stroke="var(--color-amber-300)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="2"
                            type="linear"
                            stroke="var(--color-lime-300)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="3"
                            type="linear"
                            stroke="var(--color-teal-300)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="4"
                            type="linear"
                            stroke="var(--color-blue-300)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
});

const CommentChart: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const total = useDashboardStore(state => state.commentChartTotal);
    const setTotal = useDashboardStore(state => state.setCommentChartTotal);
    const list = useDashboardStore(state => state.commentChartList);
    const setList = useDashboardStore(state => state.setCommentChartList);

    const { cancel } = useRequest(getCommentChartList, {
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

export default CommentChart;
