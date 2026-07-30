import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { taskObject } from "@/types";
import { useNavigate } from "react-router";

type Props = {
    tasks: taskObject[];
    query: string;
}

const TasksSearchDropdown = ({ tasks, query }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="absolute left-0 right-0 top-full mt-2 z-50">
            <Card className="overflow-hidden p-2 bg-white dark:bg-card border border-slate-100 dark:border-slate-700 shadow-lg">
                {tasks.length === 0 ? (
                    <div className="py-4 px-3 text-center text-sm text-slate-500 dark:text-slate-400">No Tasks found for "{query}"</div>
                ) : (
                    <div className="max-h-64 overflow-auto">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                role="button"
                                tabIndex={0}
                                className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer"
                                onClick={() => navigate(`/tasks/${task.id}`)}
                                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/tasks/${task.id}`); }}
                            >
                                <Avatar className="h-10 w-10 ring-2 ring-slate-100 dark:ring-slate-700">
                                    <AvatarImage src={task.thumbnail} alt={task.title[0]} />
                                    <AvatarFallback>{task.title[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">{task.title}</span>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                                Includes {task.associatedMembersIDs.length} {task.associatedMembersIDs.length === 1 ? "Member" : "Members"}
                                            </p>
                                        </div>
                                        <span className="ml-2 text-sm font-bold text-slate-800 dark:text-slate-200">{task.progress}%</span>
                                    </div>
                                </div>

                                <div className="ml-3 p-1 bg-amber-50 rounded-full">
                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

export default TasksSearchDropdown;
