import type { RootState } from "@/app/store";
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
import { deleteMemberProject, selectMember } from "@/features/members/membersSlice";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const DeleteOneProjectModal = () => {
    const dispatch = useDispatch();

    const { modalKey, id: itemId, openItemModal, closeItemModal } = useQueryParam() as QueryParam;

    const memberId = useParams().id;
    const member = useSelector((state: RootState) => memberId ? selectMember(state, memberId) : undefined);

    const open = modalKey === "delete-project";
    const setOpen = (open: boolean) => {
        if (open && itemId) {
            openItemModal?.(itemId, "delete-project");
        } else {
            closeItemModal?.();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Delete This Project ?</DialogTitle>
                    <DialogDescription>
                        This action can't be undone
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={() => {
                            if (member) dispatch(deleteMemberProject({ memberId: member.id, projects: member.projects.filter((project) => project.id !== itemId) }));
                            closeItemModal?.();
                        }}
                    >Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteOneProjectModal