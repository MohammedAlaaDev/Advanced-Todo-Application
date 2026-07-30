import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const StatusCalendar = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date())

    const getDaysInWeek = (date: Date) => {
        const result = []
        const current = new Date(date)
        current.setDate(current.getDate() - current.getDay())

        for (let i = 0; i < 7; i++) {
            result.push(new Date(current))
            current.setDate(current.getDate() + 1)
        }
        return result
    }

    const weekDays = getDaysInWeek(currentDate)

    const nextWeek = () => {
        const next = new Date(currentDate)
        next.setDate(next.getDate() + 7)
        setCurrentDate(next)
    }

    const prevWeek = () => {
        const prev = new Date(currentDate)
        prev.setDate(prev.getDate() - 7)
        setCurrentDate(prev)
    }

    const isToday = (date: Date) => {
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    const monthYearString = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

    return (
        <div className="bg-white dark:bg-card rounded-3xl p-6 xl:px-4 xl:py-4 flex flex-col h-full min-h-62.5">
            <h3 className="text-lg font-bold mb-3 text-primary">Status</h3>

            <div className="flex flex-col justify-center flex-1">
                <div className="bg-white dark:bg-card rounded-2xl px-3 py-10 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-center">

                    <div className="flex items-center justify-between mb-4">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400" onClick={prevWeek}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold text-sm">{monthYearString}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400" onClick={nextWeek}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex justify-between items-center px-1">
                        {weekDays.map((date, index) => {
                            const dayName = date.toLocaleDateString("en-US", { weekday: 'narrow' })
                            const dayNumber = date.getDate()
                            const active = isToday(date)

                            return (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{dayName}</span>
                                    <div className={cn(
                                        "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer",
                                        active
                                            ? "bg-primary text-white shadow-lg scale-110"
                                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    )}>
                                        {dayNumber}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusCalendar;
