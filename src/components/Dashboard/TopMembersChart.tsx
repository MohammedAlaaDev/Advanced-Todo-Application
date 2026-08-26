import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useSelector } from 'react-redux'
import { selectTodosArr } from '@/features/todos/todosSlice'
import type { TodoObject } from "@/features/todos/types"
import { useThemeContext } from "@/contexts/theme/ThemeProvider"

const chartConfig = {
    tasks: {
        label: "Tasks",
    },
} satisfies ChartConfig

const TopMembersChart = () => {
    const completedTodosCount = useSelector(selectTodosArr).filter((todo: TodoObject) => todo.isCompleted).length;

    const { theme } = useThemeContext();

    const colorsObject = {
        first: "#546fff",
        second: "#00bc7d",
        third: "#fe9a00",
        fourth: "#faa4f6",
        fifth: "#ee95ac",
        sixth: "#3cb0fd"
    }

    const chartData = [
        { member: "Emad", tasks: 10, color: colorsObject[theme] },
        { member: "Omar", tasks: 6, color: colorsObject[theme] },
        { member: "Ahmed", tasks: 4, color: colorsObject[theme] },
        { member: "Ali (You)", tasks: completedTodosCount, color: colorsObject[theme] }
    ]

    return (
        <Card className="col-span-1 border-0 shadow-none bg-white dark:bg-card rounded-3xl p-6 xl:px-4 xl:py-4 h-full flex flex-col">
            <CardHeader className="p-0 pb-6 xl:pb-4 xl:px-2">
                <CardTitle className="text-base font-semibold">Top Members Tasks</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 w-full p-0 relative min-h-62.5">
                <ChartContainer config={chartConfig} className="absolute inset-0 w-full h-full pb-0 pr-6">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 0, bottom: 20, left: -20 }}
                        barSize={32}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="member"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                            ticks={[0, 5, 10]}
                            domain={[0, 10]}
                        />
                        <ChartTooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent hideLabel />} />
                        <Bar
                            dataKey="tasks"
                            radius={[6, 6, 6, 6]}
                        >
                            {chartData.map((entry, index) => {
                                return (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                )
                            })}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default TopMembersChart;
