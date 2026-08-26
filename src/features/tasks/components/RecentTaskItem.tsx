import type { DropdownOption } from '@/components/Dropdown';
import type {TaskObject } from '@/features/tasks/types';
import Dropdown from '@/components/Dropdown';
import { format } from 'date-fns';


const RecentTaskItem = (
    task: TaskObject,
    options: DropdownOption[],
    handleAction: (id: string, action: string) => void,
    shape?: string
) => {
    const createdDate = format(task.createdAt, "MMM dd, yyyy");
    return (
        <div key={task.id}>
            <div className={`relative group ${shape} overflow-hidden`}>
                <div
                    className="bg-white dark:bg-card p-6 pt-10 shadow-sm dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-inner`}>
                                <div className="w-3.5 h-3.5 bg-white/40 dark:bg-gray-800/40 rounded-sm" />
                            </div>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">{task.title}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider">
                        <span>Created at {createdDate}</span>
                        <Dropdown
                            options={options}
                            handleChoose={(key) => {
                                handleAction(task.id, key);
                            }}
                        />
                    </div>
                </div>
                <div className="glow transition-all group-hover:shadow-[0_0_320px_50px] group-hover:shadow-primary bg-transparent absolute right-0 bottom-0"></div>
            </div>
        </div>
    )
}

export default RecentTaskItem

