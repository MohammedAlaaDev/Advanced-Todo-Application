// components & icons
import NoData from "@/components/NoData";
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { PencilIcon, TrashIcon } from "lucide-react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "@/features/todos/todosSlice";
import { toggleTodo } from "@/features/todos/todosSlice";

// date fns
import { formatDistanceToNow } from 'date-fns';

// lottie animations (6 colors)
import sadSwingBlue from "@/assets/lottie/sadSwingBlue.json";
import sadSwingGreen from "@/assets/lottie/sadSwingGreen.json";
import sadSwingOrange from "@/assets/lottie/sadSwingOrange.json";
import sadSwingPink from "@/assets/lottie/sadSwingPink.json";
import sadSwingRed from "@/assets/lottie/sadSwingRed.json";
import sadSwingCyan from "@/assets/lottie/sadSwingCyan.json";

// global theme color
import { useThemeContext } from "@/contexts/theme/ThemeProvider";

// types & interfaces
import Dropdown, { type DropdownOption } from "@/components/Dropdown";
import { useQueryParam } from "@/hooks/useQueryParam";

const TodosList = () => {

    const { openModal, openItemModal } = useQueryParam();

    // redux
    const dispatch = useDispatch();

    // show the most recent and uncompleted todos first
    const todos = [...useSelector(selectTodos)].reverse();
    const sortedTodos = todos.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

    // depending on specific key, take a certain action
    const handleAction = (actionKey: string, todoId: string) => {

        if (actionKey === "edit") {
            openItemModal(todoId, "todo");
        }

        if (actionKey === "delete") {
            openItemModal(todoId, "delete-todo");
        }

    }

    // for drop down
    const options: DropdownOption[] = [
        {
            key: "edit",
            text: "Edit",
            icon: <PencilIcon />
        },
        {
            key: "delete",
            text: "Delete",
            icon: <TrashIcon />
        }
    ]

    // changed theme color
    const { theme } = useThemeContext();

    const lottieSrc = {
        first: sadSwingBlue,
        second: sadSwingGreen,
        third: sadSwingOrange,
        fourth: sadSwingPink,
        fifth: sadSwingRed,
        sixth: sadSwingCyan
    }

    return (
        <>
            {
                sortedTodos && sortedTodos.length > 0 ?
                    sortedTodos.map((todo) => (
                        <div key={todo.id} className="transition-all bg-primary/10 p-3 rounded-xl border border-primary/50">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                    <Checkbox id={todo.id} checked={todo.isCompleted} onCheckedChange={() => dispatch(toggleTodo(todo.id))} className="cursor-pointer mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded text-white" />
                                    <label htmlFor={todo.id} className={`cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary ${todo.isCompleted ? "opacity-60 line-through dark:decoration-gray-50 decoration-gray-500" : ""}`}>
                                        {todo.title}
                                    </label>
                                </div>
                                <Dropdown options={options} handleChoose={(key: string) => {
                                    handleAction(key, todo.id);
                                }} />
                            </div>
                            <div className="flex items-center justify-between pl-7">
                                <div className="flex gap-1">
                                    {todo.category.map((cat, idx) => (
                                        cat &&
                                        <Badge key={cat + idx} variant="secondary" className="bg-primary text-primary-foreground h-5 px-1.5 text-[10px] rounded">{cat}</Badge>
                                    ))}
                                </div>
                            </div>
                            <span className="pl-7 text-[10px] w-18 text-muted-foreground">{(todo.edited ? "Edited " : "Created ") + formatDistanceToNow(new Date(todo.editedAt), { addSuffix: true })}</span>
                        </div>
                    ))
                    :
                    <div onClick={() => {
                        openModal("todo")
                    }}>
                        <NoData
                            animationData={lottieSrc[theme]}
                            message="No Todos yet? start grinding."
                        />
                    </div>
            }
        </>
    )
}

export default TodosList