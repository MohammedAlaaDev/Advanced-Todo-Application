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
import { deleteNote } from "@/features/notes/notesSlice";
import { useQueryParam } from "@/hooks/useQueryParam";

const DeleteNoteModal = () => {

    const { modalKey, id, openItemModal, closeItemModal } = useQueryParam();

    const open = modalKey === "delete-note";
    const setOpen = (open: boolean) => {
        if (open) {
            openItemModal(id, "delete-note");
        } else {
            closeItemModal();
        }
    }

    const dispatch = useDispatch();

    const handleDeleteTodo = () => {
        if (id) dispatch(deleteNote(id));
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Delete Note</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this Note? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteTodo}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteNoteModal;
