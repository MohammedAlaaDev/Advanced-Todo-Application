import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { taskObject } from "@/features/tasks/types";

const SearchTaskItem = (task: taskObject) => {
    return <>
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
    </>
}

export default SearchTaskItem;