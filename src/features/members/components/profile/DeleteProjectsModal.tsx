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
import { deleteAllMemberProjects } from "@/features/members/membersSlice";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const DeleteProjectsModal = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { modalKey, closeItemModal, openItemModal } = useQueryParam() as QueryParam;

  const open = modalKey === "delete-projects";

  const setOpen = (open: boolean) => {
    if (open && id) {
      openItemModal?.(id, "delete-projects");
    } else {
      closeItemModal?.();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete All Projects ?</DialogTitle>
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
              dispatch(deleteAllMemberProjects(id));
              setOpen(false);
            }}
          >Delete All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteProjectsModal