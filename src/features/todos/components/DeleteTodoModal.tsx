import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux";
import { deleteTodo } from "@/features/todos/todosSlice";
import { useQueryParam } from "@/hooks/useQueryParam";

const DeleteTodoModal = () => {

    const dispatch = useDispatch();

    const { modalKey, closeItemModal, id } = useQueryParam();

    const open = modalKey === "delete-todo";

    const handleDeleteTodo = () => {
        if (id) dispatch(deleteTodo(id));
        closeItemModal();
    }

    const setOpen = (open: boolean) => {
        if (!open) {
            closeItemModal();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Delete Todo</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this todo? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={closeItemModal}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteTodo}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteTodoModal;
