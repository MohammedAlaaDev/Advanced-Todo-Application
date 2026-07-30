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
import { deleteAllNotes } from "@/features/notes/notesSlice";
import { useQueryParam } from "@/hooks/useQueryParam";

const DeleteAllNotesModal = () => {

    const { modalKey, openModal, closeModal } = useQueryParam();

    const open = modalKey === "delete-notes";
    const setOpen = (open: boolean) => {
        if (open) {
            openModal("delete-notes");
        } else {
            closeModal();
        }
    }

    const dispatch = useDispatch();

    const handleDeleteAll = () => {
        dispatch(deleteAllNotes());
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Delete All Notes</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete all notes? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={() => handleDeleteAll()}>Delete All</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteAllNotesModal;
