
import TodosList from "@/features/todos/components/TodosList"
import { useSelector } from "react-redux"
import { selectTodosArr } from "@/features/todos/todosSlice"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import { useQueryParam } from "@/hooks/useQueryParam"

const TodosSection = () => {

    const { openModal } = useQueryParam();

    const todos = useSelector(selectTodosArr);

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-foreground underline decoration-2 decoration-gray-300 dark:decoration-gray-600 underline-offset-4">My Todos</h2>
                <div className="flex justify-center items-center gap-2">
                    {
                        todos && todos.length > 0 ?
                            <Button onClick={() => openModal("delete-all-todos")} size="icon" variant="secondary" className="h-6 w-6 rounded bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 shadow-none">
                                <Trash className="h-4 w-4" />
                            </Button>
                            :
                            null
                    }
                    <Button onClick={() => {
                        openModal("todo");
                    }} size="icon" className="h-6 w-6 rounded bg-primary text-white hover:bg-primary/80 shadow-none">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <TodosList />
            </div>

        </section>
    )
}

export default TodosSection