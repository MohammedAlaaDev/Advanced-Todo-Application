import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { deleteMember } from "@/features/members/membersSlice";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useDispatch } from "react-redux";

function DeleteMemberModal() {

    const { modalKey, id, openItemModal, closeItemModal } = useQueryParam();

    const open = modalKey === "delete-member";
    const setOpen = (open: boolean) => {
        if (open) {
            openItemModal(id, "delete-member");
        } else {
            closeItemModal();
        }
    }

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (id) {
            dispatch(deleteMember(id));
        }
        closeItemModal();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Member?</DialogTitle>
                        <DialogDescription>
                            This Action will permanently delete the member. Are you sure you want to proceed?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={handleSubmit}
                            className="text-white">Delete Permanently</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default DeleteMemberModal;