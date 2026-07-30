// React & React Router
import { useNavigate } from 'react-router';

// State Management & Utilities
import { useSelector } from 'react-redux';
import { selectAllTasks } from '@/features/tasks/tasksSlice';
import { format } from 'date-fns';
import { useQueryParam, type QueryParam } from '@/hooks/useQueryParam';

// UI & Icons
import { MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Components
import TasksList from '@/components/Tasks/TasksList';
import TasksSearchBar from '@/components/Tasks/TasksSearchBar';

const Tasks = () => {
    const { openModal, openItemModal } = useQueryParam() as QueryParam;
    const tasks = useSelector(selectAllTasks);
    const navigate = useNavigate();

    const recentTasks = tasks.length ? tasks.slice(-3) : [];

    const handleViewTask = (taskId: string) => {
        navigate(`/tasks/${taskId}`);
    };

    const handleDeleteTask = (taskId: string) => {
        if (!taskId) return;
        openItemModal?.(taskId, "delete-task");
    };

    return (
        <div className="space-y-12 animate-page relative">
            {/* Search Header */}
            <TasksSearchBar tasks={tasks} />

            {/* Recent Tasks */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827] dark:text-slate-200">Recent Tasks</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {
                        recentTasks.map((folder) => {
                            const createdDate = format(folder.createdAt, "MMM dd, yyyy");
                            return (
                                <div key={folder.id} className="relative group folder-shape overflow-hidden">
                                    <div
                                        className="bg-white dark:bg-card p-6 pt-10 shadow-sm dark:border-slate-700 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-inner`}>
                                                    <div className="w-3.5 h-3.5 bg-white/40 dark:bg-gray-800/40 rounded-sm" />
                                                </div>
                                                <span className="font-semibold text-slate-700 dark:text-slate-200">{folder.title}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">
                                            <span>created at {createdDate}</span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="border-0 outline-0">
                                                    <MoreHorizontal className="h-5 w-5 cursor-pointer text-slate-300 dark:text-slate-400" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="bg-white dark:bg-card mr-9">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem onClick={() => handleViewTask(folder.id)} className="cursor-pointer">
                                                            View Task
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem variant="destructive" onClick={() => handleDeleteTask(folder.id)} className="cursor-pointer">
                                                            Delete Task
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <div className="glow transition-all group-hover:shadow-[0_0_320px_50px] group-hover:shadow-primary bg-transparent absolute right-0 bottom-0"></div>
                                </div>
                            )
                        })
                    }
                    {
                        Array.from({ length: 3 - recentTasks.length }).map((_, idx) => (
                            <div key={idx} className="relative pt-4">
                                <Button onClick={() => openModal?.("add-task")} className="w-full folder-shape p-8 shadow-sm bg-primary/30 hover:bg-primary/50 transition-all flex items-center justify-center h-full rounded-3xl">
                                    <div className="h-11 w-11 rounded-full bg-white text-primary shadow-sm flex items-center justify-center hover:bg-slate-100">
                                        <Plus className="h-5 w-5" />
                                    </div>
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* Main Projects Section */}
            <TasksList title="All Tasks" />

            <Button
                onClick={() => {
                    openModal?.("add-task");
                }}
                className="sticky bottom-4 left-4 z-40 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
            </Button>
        </div>
    );
};

export default Tasks;
