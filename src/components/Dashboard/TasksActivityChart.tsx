import { ResponsiveLine } from '@nivo/line'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



export function TasksActivityChart() {
    return (
        <Card className="col-span-2 border-0 shadow-none bg-white rounded-3xl p-6 xl:px-1 xl:py-2 xl:gap-1">
            <CardHeader className="p-0 pb-6 xl:pb-2 xl:px-6">
                <CardTitle className="text-base font-semibold">Tasks Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] w-full p-0 relative">
                <ResponsiveLine
                    data={[
                        {
                            id: "tasks",
                            color: "#818CF8",
                            data: [
                                { x: "Sun", y: 2 },
                                { x: "Mon", y: 3 },
                                { x: "Tue", y: 2 },
                                { x: "Wed", y: 3.5 },
                                { x: "Thu", y: 2.5 },
                                { x: "Fri", y: 2.8 },
                                { x: "Sat", y: 2.4 },
                            ]
                        }
                    ]}
                    margin={{ top: 20, right: 20, bottom: 40, left: 30 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 1,
                        max: 4,
                        stacked: true,
                        reverse: false
                    }}
                    curve="natural"
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fill: '#94a3b8',
                                    fontSize: 12
                                }
                            }
                        },
                        grid: {
                            line: {
                                stroke: '#e2e8f0',
                                strokeWidth: 1
                            }
                        }
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 16,
                        tickRotation: 0,
                    }}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 16,
                        tickRotation: 0,
                        tickValues: [1, 2, 3],
                    }}
                    enableGridX={true}
                    enableGridY={false}
                    gridXValues={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                    colors={['#1e293b']}
                    lineWidth={3}
                    enablePoints={true}
                    pointSize={8}
                    pointColor="white"
                    pointBorderWidth={3}
                    pointBorderColor="#1e293b"
                    enableArea={false}
                    useMesh={true}
                    crosshairType="x"
                />
            </CardContent>
        </Card>
    )
}
