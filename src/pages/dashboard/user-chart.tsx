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
import { getUserChartList } from '@/apis';
import { useDashboardStore } from '@/store';

const chartConfig = {
    count: {
        label: '注册数'
    }
} satisfies ChartConfig;

const RenderChart: React.FC<{ total: number; list: any[] }> = memo(props => {
    const { total, list } = props;
    return (
        <Card className={cn('bg-sidebar shadow-accent border-sidebar-border')}>
            <CardHeader>
                <CardTitle>最近7天用户统计</CardTitle>
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
                            dataKey="count"
                            type="linear"
                            stroke="var(--color-red-300)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
});

const UserChart: React.FC = () => {
    // 将状态和函数分开订阅，避免触发不必要的渲染
    const total: number = useDashboardStore(state => state.userChartTotal);
    const setTotal = useDashboardStore(state => state.setUserChartTotal);
    const list = useDashboardStore(state => state.userChartList);
    const setList = useDashboardStore(state => state.setUserChartList);

    const { cancel } = useRequest(getUserChartList, {
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

export default UserChart;
