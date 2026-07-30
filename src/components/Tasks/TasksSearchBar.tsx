import { Search } from 'lucide-react';
import TasksSearchDropdown from "@/components/Tasks/TasksSearchDropdown";
import { useEffect, useState } from 'react';
import type { taskObject } from '@/types';
import { useInput } from '@/hooks/useInput';

interface TasksSearchProps {
    tasks: taskObject[];
}

const TasksSearchBar = ({ tasks }: TasksSearchProps) => {

    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const searchQuery = useInput("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    const filteredTasks = tasks.filter((task) => {
        return task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    })

    useEffect(() => {

        const id = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery.value);
        }, 500);

        return () => clearTimeout(id);

    }, [searchQuery.value])
    
    return (
        <div className="relative bg-white dark:bg-card rounded-xl border border-slate-100 dark:border-slate-700 px-4 py-2.5 flex items-center shadow-sm">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-300 mr-2" />
            <input
                {...searchQuery.bind}
                type="text"
                placeholder="Search Tasks"
                className="bg-transparent outline-none w-full text-sm text-slate-600 dark:text-slate-300"
                onFocus={() => {
                    setTimeout(() => {
                        setShowDropDown(true);
                    }, 100);
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setShowDropDown(false);
                    }, 100);
                }}
            />
            {
                showDropDown &&
                <TasksSearchDropdown tasks={filteredTasks} query={debouncedSearchQuery} />
            }
        </div>
    )
}

export default TasksSearchBar