import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { editTaskDeadline, selectAllTasks } from "@/features/tasks/tasksSlice";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const EditDeadlineModal = () => {
    const dispatch = useDispatch();
    const { modalKey, id: queryId, openModal, closeModal } = useQueryParam() as QueryParam;
    const routeParams = useParams();
    const taskId = queryId || routeParams.id;

    const open = modalKey === "edit-deadline";
    const setOpen = (open: boolean) => {
        if (open) {
            openModal?.("edit-deadline");
        } else {
            closeModal?.();
        }
    };

    const tasks = useSelector(selectAllTasks);
    const task = tasks.find((t) => t.id === taskId);

    const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (open && task) {
            setDeadlineDate(task.deadline ? new Date(task.deadline) : new Date());
        }
    }, [open, task]);

    const handleUpdateDeadline = () => {
        if (!task) return;
        dispatch(editTaskDeadline({ taskId: task.id, deadline: deadlineDate ? deadlineDate.toISOString() : "" }));
        closeModal?.();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-120 max-h-148 overflow-y-auto custom-scrollbar rounded-[2rem] border-none p-0">
                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
                            Choose Deadline
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <Calendar
                            mode="single"
                            selected={deadlineDate}
                            onSelect={(date) => {
                                if (date) setDeadlineDate(date);
                            }}
                            captionLayout="dropdown"
                            startMonth={new Date()}
                            endMonth={new Date(new Date().getFullYear() + 3, 11)}
                            disabled={{ before: new Date() }}
                            className="w-full rounded-3xl border border-border"
                        />
                    </div>
                    <DialogFooter className="mt-8 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => closeModal?.()}>
                            Close
                        </Button>
                        <Button
                            type="button"
                            className="text-white"
                            onClick={() => {
                                handleUpdateDeadline();
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditDeadlineModal;