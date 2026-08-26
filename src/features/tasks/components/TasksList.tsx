import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"
import { useSelector } from "react-redux"
import { selectMembersArr } from "@/features/members/membersSlice"
import { selectTasksArr } from "@/features/tasks/tasksSlice"
import { differenceInDays, differenceInHours, differenceInMinutes, parseISO } from "date-fns"
import noTasks from '@/assets/images/noTasks.png'
import { Clock, EyeIcon, X } from 'lucide-react'
import { useNavigate } from "react-router"
import type { TaskObject } from "@/features/tasks/types";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam"

interface TasksListProps {
    title?: string;
}

const TasksList = ({ title = "Tasks" }: TasksListProps) => {
    const { openModal, openItemModal } = useQueryParam() as QueryParam;

    const now = new Date();

    const members = useSelector(selectMembersArr);

    const tasks = useSelector(selectTasksArr);
    const usersImgs = tasks.map((task: TaskObject) => {
        return task.associatedMembersIDs.map((memberID) => {
            return members.find((mem) => mem.id === memberID)?.avatar;
        })
    })

    const navigate = useNavigate();

    return (
        <div className="col-span-3 mt-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">{title}</h3>
            </div>

            {tasks.length === 0 ? (
                <div
                    onClick={() => openModal?.("add-task")}
                    className="cursor-pointer w-full h-64 relative overflow-hidden flex items-center justify-center bg-primary/10 rounded-3xl border-primary border-2 border-dotted"
                >
                    <img src={noTasks} alt="No Tasks" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                    <div className="relative z-10 flex flex-col items-center justify-center gap-4 p-6 text-center">
                        <p className="text-primary text-sm md:text-xl font-bold">No Tasks? Start Adding.</p>
                    </div>
                </div>
            ) : (
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <div className="absolute right-12 -top-12 flex gap-1">
                        <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-8 w-8 border-none hover:bg-slate-100 dark:hover:bg-slate-800 text-primary/70 hover:text-primary" />
                        <CarouselNext className="relative right-0 bottom-0 top-0 translate-y-0 h-8 w-8 border-none hover:bg-slate-100 dark:hover:bg-slate-800 text-primary/70 hover:text-primary" />
                    </div>

                    <CarouselContent className="-ml-6">
                        {tasks.map((task, taskIdx) => {

                            const daysLeft = differenceInDays(parseISO(task.deadline), now);
                            const hoursLeft = differenceInHours(parseISO(task.deadline), now);
                            const minutesLeft = differenceInMinutes(parseISO(task.deadline), now);

                            return (
                                <CarouselItem key={task.id} className="pl-6 md:basis-1/2 lg:basis-1/2">
                                    <Card
                                        className="border-0 shadow-none relative bg-white dark:bg-card rounded-3xl p-4 select-none overflow-hidden group h-85 flex flex-col justify-center">
                                        <div className="deleteTask opacity-30 group-hover:opacity-100 transition-all bg-primary absolute top-0 left-0 size-7 rounded-br-lg rounded-tl-sm cursor-pointer flex justify-center items-center">
                                            <X
                                                onClick={() => {
                                                    openItemModal?.(task.id, "delete-task");
                                                }}
                                                className="size-5 text-white" />
                                        </div>
                                        <div className="p-4">
                                            <div
                                                onClick={() => {
                                                    navigate(`/tasks/${task.id}`);
                                                }}
                                                className="h-32 flex items-center justify-center w-full cursor-pointer bg-primary/20 rounded-xl mb-4 relative overflow-hidden">
                                                {
                                                    task.thumbnail ?
                                                        <>
                                                            <img
                                                                src={task.thumbnail}
                                                                alt={task.title}
                                                                className="object-cover w-full h-full opacity-90 cursor-pointer"
                                                            />
                                                            <div className="absolute bg-black/50 right-2 top-2 rounded-full p-2 overflow-hidden border-2 border-primary">
                                                                <EyeIcon className="text-primary size-4 ">
                                                                </EyeIcon>
                                                            </div>
                                                        </>
                                                        :
                                                        <div className="absolute right-2 top-2 rounded-full p-2 overflow-hidden border-2 border-white">
                                                            <EyeIcon className="text-white size-4 ">
                                                            </EyeIcon>
                                                        </div>
                                                }
                                            </div>

                                            <h4 className="font-bold text-base text-primary line-clamp-1">{task.title}</h4>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">{task.categories.length === 0 ? "No categories" : task.categories[0]}</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm font-semibold">
                                                    <span>Progress</span>
                                                    <span className={cn("text-primary")}>{task.progress}%</span>
                                                </div>
                                                <Progress value={task.progress} className={cn("bg-slate-100 dark:bg-slate-700 h-2")} />

                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex -space-x-2">
                                                        {usersImgs[taskIdx].map((imageSrc, idx) => {
                                                            return (
                                                                <img key={idx} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-700" src={imageSrc} />
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium">
                                                        <span className="h-3 w-3 rounded-full border border-slate-400 flex items-center justify-center pt-1px">
                                                            <Clock />
                                                        </span>
                                                        {daysLeft > 0 ? `${daysLeft} Days Left` : hoursLeft > 0 ? `${hoursLeft} Hours Left` : minutesLeft > 0 ? `${minutesLeft} Minutes Left` : "Deadline Passed"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="glow transition-all group-hover:shadow-[0_0_320px_40px] group-hover:shadow-primary bg-transparent absolute left-1/2 bottom-0 -translate-x-1/2"></div>
                                    </Card>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                </Carousel>
            )}
        </div>
    )
}
export default TasksList;
