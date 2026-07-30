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
import { deleteAllTodos } from "../todosSlice";
import { useQueryParam } from "@/hooks/useQueryParam";

const DeleteAllTodosModal = () => {
    const dispatch = useDispatch();

    const { modalKey, closeModal } = useQueryParam();

    const open = modalKey === "delete-all-todos";

    const handleDeleteAll = () => {
        dispatch(deleteAllTodos());
        closeModal();
    }

    const setOpen = (open: boolean) => {
        if (!open) {
            closeModal();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Delete All Todos</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete all todos? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={closeModal}>Cancel</Button>
                    <Button variant="destructive" onClick={() => handleDeleteAll()}>Delete All</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteAllTodosModal;
