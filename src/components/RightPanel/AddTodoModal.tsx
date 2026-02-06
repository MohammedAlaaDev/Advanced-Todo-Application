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
import { useInput } from "@/hooks/useInput";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTodo } from "@/features/todos/todosSlice";

interface AddTodoModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function AddTodoModal({ open, onOpenChange }: AddTodoModalProps) {

    const dispatch = useDispatch();

    const titleInput = useInput("");
    const category1Input = useInput("");
    const category2Input = useInput("");

    const resetAll = () => {
        titleInput.reset();
        category1Input.reset();
        category2Input.reset();
    }

    useEffect(() => {
        if (open) {
            resetAll();
        }
    }, [open, onOpenChange])

    const handleAddTodo = () => {
        const todo = {
            id: nanoid(),
            title: titleInput.value,
            category: [category1Input?.value, category2Input?.value],
            isCompleted: false,
            createdAt: new Date().toISOString()
        }

        dispatch(addTodo(todo));
        resetAll();
        onOpenChange?.(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Todo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter todo title"
                            {...titleInput}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="category1">Category 1</Label>
                            <Input
                                id="category1"
                                placeholder="e.g. Backend"
                                {...category1Input}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category2">Category 2</Label>
                            <Input
                                id="category2"
                                placeholder="e.g. Design"
                                {...category2Input}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddTodo}>Add Todo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
