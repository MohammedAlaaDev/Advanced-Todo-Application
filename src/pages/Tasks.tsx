// React & React Router

// State Management & Utilities
import { useSelector } from 'react-redux';
import { selectAllTasks } from '@/features/tasks/tasksSlice';
import { useQueryParam, type QueryParam } from '@/hooks/useQueryParam';

// UI & Icons
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';


// Components
import TasksList from '@/features/tasks/components/TasksList';
import type { taskObject } from '@/features/tasks/types';
import Searchbar from '@/components/Searchbar';
import RecentCards from '@/components/RecentCards';
import type { DropdownOption } from '@/components/Dropdown';
import SearchTaskItem from '@/features/tasks/components/SearchTaskItem';
import RecentTaskItem from '@/features/tasks/components/RecentTaskItem';

const dropdownOptions: DropdownOption[] = [
    {
        key: "view",
        text: "View Task",
    },
    {
        key: "delete",
        text: "Delete Task",
        color: "text-red-500",
    }
]

const Tasks = () => {
    const { openModal } = useQueryParam() as QueryParam;
    const tasks = useSelector(selectAllTasks);

    const recentTasks = tasks.length ? tasks.slice(-3) : [];

    const filterFunction = (data: taskObject[], debouncedQuery: string) => {
        return data.filter((item) => {
            return item.title?.toLowerCase().includes(debouncedQuery.toLowerCase());
        })
    }

    const getId = (task: taskObject) => task.id;

    return (
        <div className="space-y-12 animate-page relative">
            {/* Search Header */}
            <Searchbar
                filterFunction={filterFunction}
                data={tasks}
                renderItem={SearchTaskItem}
                getId={getId}
                dataType="tasks"
            />

            {/* Recent Tasks */}
            <section className="space-y-6">
                <RecentCards
                    recentData={recentTasks}
                    title="Recent Tasks"
                    dataType="tasks"
                    openModalKey="add-task"
                    shape="folder-shape"
                    deleteModalKey="delete-task"
                    dropdownOptions={dropdownOptions}
                    renderItem={RecentTaskItem}
                />
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
