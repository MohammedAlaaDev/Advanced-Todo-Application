import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { selectTodos } from "./todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "@/features/todos/todosSlice";

const TodosList = () => {

    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    return (
        <>
            {
                todos.map((todo) => (
                    <div key={todo.id} className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                        <div className="flex items-start gap-3 mb-2">
                            <Checkbox id={todo.id} checked={todo.isCompleted} onCheckedChange={() => dispatch(toggleTodo(todo.id))} className="mt-1 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 rounded text-white" />
                            <label htmlFor={todo.id} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${todo.isCompleted ? "line-through decoration-gray-800 text-indigo-500" : "text-indigo-900"}`}>
                                {todo.title}
                            </label>
                        </div>
                        <div className="flex items-center justify-between pl-7">
                            <div className="flex gap-1">
                                {todo.category.map((cat, idx) => (
                                    cat &&
                                    <Badge key={idx} variant="secondary" className="bg-primary text-primary-foreground h-5 px-1.5 text-[10px] rounded">{cat}</Badge>
                                ))
                                }
                            </div>
                            <span className="text-[10px] text-muted-foreground">May 20, 2020{/* todo.createdAt */}</span>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default TodosList