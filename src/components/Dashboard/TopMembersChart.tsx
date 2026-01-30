import { ResponsiveBar } from '@nivo/bar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    {
        "member": "Ali",
        "tasks": 30,
        "tasksColor": "#60A5FA"
    },
    {
        "member": "Emad",
        "tasks": 45,
        "tasksColor": "#34D399"
    },
    {
        "member": "Omar",
        "tasks": 20,
        "tasksColor": "#818CF8"
    },
    {
        "member": "Ahmed",
        "tasks": 40,
        "tasksColor": "#34D399"
    }
]

export function TopMembersChart() {
    return (
        <Card className="col-span-1 border-0 shadow-none bg-white rounded-3xl h-[340px]">
            <CardHeader className="pb-2 pt-6 px-6">
                <CardTitle className="text-base font-semibold">Top Members Tasks</CardTitle>
            </CardHeader>
            <CardContent className="h-[240px] w-full p-0">
                <ResponsiveBar
                    data={data}
                    keys={['tasks']}
                    indexBy="member"
                    margin={{ top: 10, right: 10, bottom: 40, left: 30 }}
                    padding={0.6}
                    colors={({ data }) => String(data.tasksColor)}
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fill: '#94a3b8',
                                    fontSize: 11
                                }
                            }
                        }
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 12,
                        tickRotation: 0,
                    }}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 10,
                        tickRotation: 0,
                        tickValues: [0, 10, 20, 30, 40],
                    }}
                    enableGridY={false}
                    enableLabel={false}
                    role="application"
                    borderRadius={6}
                />
            </CardContent>
        </Card>
    )
}
