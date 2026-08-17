import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { deleteTask } from "@/features/tasks/tasksSlice";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";
import { useDispatch } from "react-redux";

function DeleteTaskModal() {
    const dispatch = useDispatch();
    const { modalKey, id: deletedId, openItemModal, closeItemModal } = useQueryParam() as QueryParam;

    const open = modalKey === "delete-task";
    const setOpen = (open: boolean) => {
        if (open && deletedId) {
            openItemModal?.(deletedId, "delete-task");
        } else {
            closeItemModal?.();
        }
    };

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Delete Task?</DialogTitle>
                    <DialogDescription>
                        This action will permanently delete the task. Are you sure you want to proceed?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={() => {
                            if (deletedId) {
                                dispatch(deleteTask(deletedId));
                            }
                            closeItemModal?.();
                        }}
                        className="text-white"
                    >
                        Delete Permanently
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteTaskModal;
