// components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "@/components/InputError";

// hooks
import { useEffect } from "react";
import { useValidate } from "@/hooks/useValidate";
import { useInput } from "@/hooks/useInput";

// redux
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTodo, editTodo, selectTodosArr } from "@/features/todos/todosSlice";
import { todoSchema, type TodoFormError } from "@/features/todos/schemas/todoSchema";

// types & interfaces
import type { TodoObject } from "@/features/todos/types"
import { useQueryParam } from "@/hooks/useQueryParam";
import type { PreventableEvent } from "@/types";

interface InputsData {
    title: string;
    category1: string;
    category2: string;
}

interface ValidationType {
    error: TodoFormError | null;
    shakeKey: number;
    setError: (error: TodoFormError | null) => void;
    validate: (data: InputsData, schema: typeof todoSchema, onSuccess: () => void) => boolean;
}

const TodoModal = () => {


    const { id, modalKey, openModal, closeModal, openItemModal, closeItemModal } = useQueryParam();

    const todos = useSelector(selectTodosArr);

    const editedTodo = todos.find(todo => todo.id === id);

    const open = modalKey === "todo";

    const setOpen = (open: boolean) => {
        if (open) {
            if (editedTodo) {
                openItemModal(editedTodo.id, "todo");
            } else {
                openModal("todo");
            }
        } else {
            if (editedTodo) {
                closeItemModal();
            } else {
                closeModal();
            }
        }
    }

    // redux dispatch to trigger actions
    const dispatch = useDispatch();

    // custom hook to validate data
    const { error, shakeKey, setError, validate } = useValidate() as ValidationType;

    const resetErrors = () => {
        if (error) {
            setError(null);
        }
    }

    // controlled inputs
    const titleInput = useInput(editedTodo?.title || "", resetErrors);
    const category1Input = useInput(editedTodo?.category?.[0] || "", resetErrors);
    const category2Input = useInput(editedTodo?.category?.[1] || "", resetErrors);

    useEffect(() => {
        if (open) {
            titleInput.setValue(editedTodo?.title || "");
            category1Input.setValue(editedTodo?.category?.[0] || "");
            category2Input.setValue(editedTodo?.category?.[1] || "");
        }
    }, [open])

    // crud handlers
    const handleEditTodo = (data: InputsData) => {
        if (editedTodo) {
            const updatedTodo: TodoObject = {
                ...editedTodo,
                title: data.title,
                category: [data.category1, data.category2],
                editedAt: new Date().toISOString(),
                edited: true,
            }
            dispatch(editTodo({ data: updatedTodo }));
        }
    }

    const handleAddTodo = (data: InputsData) => {
        const addedTodo: TodoObject = {
            id: nanoid(),
            title: data.title,
            category: [data.category1, data.category2],
            isCompleted: false,
            createdAt: new Date().toISOString(),
            editedAt: new Date().toISOString(),
            edited: false,
        }
        dispatch(addTodo({ data: addedTodo }));
    }

    const handleSubmit = (e?: PreventableEvent) => {
        e?.preventDefault();

        const data = {
            title: titleInput.value.trim(),
            category1: category1Input.value.trim(),
            category2: category2Input.value.trim(),
        }

        validate(data, todoSchema, () => {
            if (editedTodo) {
                handleEditTodo(data);
            } else {
                handleAddTodo(data);
            }
            setOpen?.(false);
        })
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>{editedTodo ? "Edit Todo" : "Add New Todo"}</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="todo-form grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter todo title"
                            {...titleInput.bind}
                        />
                        <InputError message={error?.title?._errors?.[0]} key={shakeKey} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-start">
                        <div className="grid gap-2">
                            <Label htmlFor="category1">Category 1</Label>
                            <Input
                                id="category1"
                                placeholder="e.g. Backend"
                                {...category1Input.bind}
                            />
                            <InputError message={error?.category1?._errors?.[0]} key={shakeKey} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category2">Category 2</Label>
                            <Input
                                id="category2"
                                placeholder="e.g. Design"
                                {...category2Input.bind}
                            />
                            <InputError message={error?.category2?._errors?.[0]} key={shakeKey} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            className="text-white"
                        >
                            {editedTodo ? "Edit Todo" : "Add Todo"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TodoModal;
