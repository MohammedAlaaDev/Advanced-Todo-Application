import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    type ChartConfig,
} from "@/components/ui/chart"
import { format } from "date-fns"
import { useSelector } from "react-redux"
import { selectTodos } from "@/features/todos/todosSlice"

const chartConfig = {
    Todos: {
        label: "Todos",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

const TodoProgressChart = () => {
    const currentDate = format(new Date().toISOString(), "eeee - d MMMM yyyy");

    const todosCount = useSelector(selectTodos).length;
    const completedTodosCount = useSelector(selectTodos).filter((todo) => todo.isCompleted).length;
    const chartData = [
        { browser: "safari", Todos: completedTodosCount, fill: "var(--color-safari)" },
    ]

    return (
        <Card className="border-0 shadow-none bg-white dark:bg-card rounded-3xl p-6 xl:px-4 xl:py-4 h-full flex flex-col">
            <CardHeader className="p-0 pb-6 xl:pb-4 xl:px-2 items-center text-center">
                <CardTitle className="text-base font-semibold">Todo Progress</CardTitle>
                <CardDescription className="text-xs">{currentDate}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 w-full p-0 relative min-h-62.5">
                <ChartContainer
                    config={chartConfig}
                    className="absolute inset-0 w-full h-full pb-6"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={90}
                        endAngle={90 - 360 * (completedTodosCount / (todosCount || 1))}
                        innerRadius={60}
                        outerRadius={80}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[66, 54]}
                        />
                        <RadialBar dataKey="Todos" background cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {chartData[0].Todos.toLocaleString()}/{todosCount}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Todos
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card >
    )
}

export default TodoProgressChart;
