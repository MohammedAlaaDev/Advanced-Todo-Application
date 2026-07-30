import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskDetailsForm, { type TaskDetailsRefType } from "@/components/Tasks/TaskDetailsForm";
import MembersChoose from "@/components/Tasks/MembersChoose";
import TaskMedia, { type MediaRefType } from "@/components/Tasks/TaskMedia";
import { selectMembers } from "@/features/members/membersSlice";
import type { MemberObject } from "@/types";
import { addAssociatedMembers, addNewTask, resetTempTask } from "@/features/tasks/tasksSlice";
import InputError from "@/components/custom/InputError";
import TaskThumbnail, { type TaskThumbnailRef } from "@/components/Tasks/TaskThumbnail";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";

type DivElementType = HTMLDivElement | null;

type ModifiedMember = MemberObject & { selected: boolean };

const AddTaskModal = () => {
    const { modalKey, openModal, closeModal } = useQueryParam() as QueryParam;

    const open = modalKey === "add-task";
    const setOpen = (open: boolean) => {
        if (open) {
            openModal?.("add-task");
        } else {
            closeModal?.();
        }
    };

    const members = useSelector(selectMembers);
    const [progress, setProgress] = useState(1);
    const [modifiedMembers, setModifiedMembers] = useState<ModifiedMember[]>([]);

    const selectedCount = modifiedMembers.filter((member) => member.selected).length;

    const progressWidth = `${(progress / 4) * 100}%`;

    const taskDetailsFormRef = useRef<TaskDetailsRefType | null>(null);

    const mediaRef = useRef<MediaRefType | null>(null);
    const taskThumbnailRef = useRef<TaskThumbnailRef | null>(null);

    const dispatch = useDispatch();

    const resetOnOpen = () => {
        setProgress(1);
        setModifiedMembers(members.map((member) => ({ ...member, selected: false })));
    };

    const resetForm = () => {
        dispatch(resetTempTask());
    };

    useEffect(() => {
        resetOnOpen();
        resetForm();
    }, [open]);

    const [selectedMembersError,setSelectedMembersError] = useState<string | undefined>(undefined);
    const [errorKey, setErrorKey] = useState<number>(0);

    useEffect(() => {
        if (progress === 2) {
            setSelectedMembersError(undefined);
        }
    }, [progress])

    const handleStepTwo = () => {
        const selected = modifiedMembers.filter((member) => member.selected).map((mem) => mem.id);

        if (selected.length === 0) {
            setSelectedMembersError("choose at least one member");
            setErrorKey(p => p + 1);
            return false;
        }

        setSelectedMembersError(undefined);

        dispatch(addAssociatedMembers({ selected }));
        return true;
    };

    const handleNext = () => {
        if (progress === 1) {
            if (!taskDetailsFormRef.current?.handleStepOne()) return;
            setProgress(p => p + 1);
            return;
        }

        if (progress === 2) {
            if (!handleStepTwo()) return;
            setProgress(p => p + 1);
            return;
        }

        if (progress === 3) {
            if (!taskThumbnailRef.current?.handleStepThree()) return;
            setProgress(p => p + 1);
            return;
        }


        if (progress === 4) {
            if (!mediaRef.current?.handleStepFour()) return;
        }

        dispatch(addNewTask());

        setOpen(false);
    };

    const handlePrevious = () => {
        if (progress > 1) {
            setProgress((prev) => prev - 1);
            return;
        }
        setOpen(false);
    };

    const modalRef = useRef<DivElementType>(null);
    const closeRef = useRef<DivElementType>(null);

    const playModalRefAnimation = () => {
        modalRef?.current?.classList.remove("animate-shake!");
        closeRef?.current?.classList.remove("bg-primary/90");
        setTimeout(() => {
            modalRef?.current?.classList.add("animate-shake!");
            closeRef?.current?.classList.add("bg-primary/90");
        }, 10);

        setTimeout(() => {
            closeRef?.current?.classList.remove("bg-primary/90");
        }, 1000);
    }

    return (
        <Dialog open={open} onOpenChange={(value) => {
            setOpen(value);
        }}>
            <DialogContent
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                    playModalRefAnimation();
                }}
                onPointerDownOutside={(e) => {
                    e.preventDefault();
                    playModalRefAnimation();
                }}
                ref={modalRef}
                className={`w-full max-w-75 md:max-w-xl lg:max-w-2xl shadow-2xl p-2 md:p-6`}>
                <div className="space-y-4">
                    <div className="flex mt-4 items-center justify-between text-xs font-medium text-muted-foreground">
                        <span>Step {progress} of 4</span>
                        <div className="flex-1 mx-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="h-full rounded-full bg-primary transition-all" style={{ width: progressWidth }} />
                        </div>
                    </div>
                    <DialogHeader>
                        <DialogTitle>Add Task</DialogTitle>
                    </DialogHeader>
                    {
                        progress === 2 &&
                        <>
                            <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Choose teammates</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Pick team members by tapping their card.</p>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-primary shadow-sm dark:bg-slate-900/80">
                                    <span className="font-semibold">{selectedCount}</span>
                                    selected
                                </div>
                            </div>
                            <InputError key={errorKey} message={selectedMembersError} />
                        </>
                    }
                    <form className={`grid ${progress === 2 ? "max-h-100" : "max-h-128"} gap-5 p-2 custom-scrollbar overflow-y-auto`} onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                        {progress === 1 ? (
                            <TaskDetailsForm ref={taskDetailsFormRef} />
                        ) : progress === 2 ? (
                            <MembersChoose
                                modifiedMembers={modifiedMembers}
                                setModifiedMembers={setModifiedMembers}
                            />
                        ) : progress === 3 ? (
                            <TaskThumbnail ref={taskThumbnailRef} />
                        ) : <TaskMedia ref={mediaRef} />
                        }
                        <div ref={closeRef} className="absolute right-3 top-3 transition-all rounded-2xl w-6 h-6" />
                    </form>
                    <DialogFooter className="flex items-center justify-between gap-3">
                        <Button type="button" variant="outline" onClick={handlePrevious}>
                            {progress === 1 ? "Cancel" : (
                                <>
                                    <ArrowLeft className="h-4 w-4" />
                                    Previous
                                </>
                            )}
                        </Button>
                        <Button type="button" className="gap-2 text-white" onClick={handleNext}>
                            {progress < 4 ? "Next Step" : "Submit"}
                            {progress < 4 ? <ChevronRight className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddTaskModal;