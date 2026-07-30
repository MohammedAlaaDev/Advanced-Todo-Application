import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { day: "Sun", tasks: 2 },
    { day: "Mon", tasks: 3 },
    { day: "Tue", tasks: 2 },
    { day: "Wed", tasks: 3.5 },
    { day: "Thu", tasks: 2.5 },
    { day: "Fri", tasks: 2.8 },
    { day: "Sat", tasks: 2.4 },
]

const chartConfig = {
    tasks: {
        label: "Tasks",
        color: "hsl(var(--foreground))",
    },
} satisfies ChartConfig

const TasksActivityChart = () => {
    return (
        <Card className="col-span-2 border-0 shadow-none bg-white dark:bg-card rounded-3xl p-6 xl:px-4 xl:py-4 h-full flex flex-col">
            <CardHeader className="p-0 pb-6 xl:pb-4 xl:px-2">
                <CardTitle className="text-base font-semibold">Tasks Activity</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 w-full p-0 relative min-h-62.5">
                <ChartContainer config={chartConfig} className="absolute inset-0 w-full h-full pb-0 pr-6">
                    <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 0, bottom: 20, left: -20 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            domain={[1, 4]}
                            ticks={[1, 2, 3]}
                        />
                        <ChartTooltip cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }} content={<ChartTooltipContent hideLabel />} />
                        <Line
                            type="linear"
                            dataKey="tasks"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "var(--color-primary)",
                                stroke: "var(--color-primary)",
                                strokeWidth: 3,
                            }}
                            activeDot={{
                                r: 6,
                                fill: "var(--color-primary)",
                                stroke: "var(--color-primary)",
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default TasksActivityChart;
