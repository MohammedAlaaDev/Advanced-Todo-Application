import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import { Plus, Trash, X } from "lucide-react";
import { selectMembers } from "@/features/members/membersSlice";
import { selectAllTasks, editTaskMemberTasks } from "@/features/tasks/tasksSlice";
import type { MemberObject } from "@/features/members/types";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";
import { useParams } from "react-router";
import { useErrorNavigation } from "@/hooks/useErrorNavigation";
import type { PreventableEvent } from "@/types";

const AssignMemberTaskModal = () => {
    const dispatch = useDispatch();
    const { modalKey, id: memberId, openItemModal, closeItemModal } = useQueryParam() as QueryParam;
    const routeParams = useParams();
    const taskId = routeParams.id;

    const open = modalKey === "assign-member-task";
    const setOpen = (open: boolean) => {
        if (open && memberId) {
            openItemModal?.(memberId, "assign-member-task");
        } else {
            closeItemModal?.();
        }
    };

    const members = useSelector(selectMembers);
    const task = useSelector(selectAllTasks).find((task) => task.id === taskId);
    const member = members.find((m: MemberObject) => m.id === memberId);
    const memberName = member?.personalDetails.name;
    const [tasks, setTasks] = useState<string[]>([""]);
    const [taskErrors, setTaskErrors] = useState<(string | undefined)[]>([undefined]);
    const [errorKey, setErrorKey] = useState<number>(0);
    const [schemaError, setSchemaError] = useState<string | undefined>(undefined);
    const formRef = useErrorNavigation(errorKey);

    useEffect(() => {
        if (!open || !memberId) return;

        const memberTasksEntry = { ...task?.tasksByUserId };

        const existingTasks = memberTasksEntry ? memberTasksEntry[memberId] : [];
        const normalizedTasks = existingTasks && existingTasks.length > 0 ? existingTasks : [""];

        setTasks(normalizedTasks.slice(0, 6));
        setTaskErrors(normalizedTasks.slice(0, 6).map(() => undefined));
        setSchemaError(undefined);
        setErrorKey((pre) => pre + 1);
    }, [open, memberId, task]);

    const handleAddTaskInput = () => {
        if (tasks.length >= 6) {
            setSchemaError("Max 6 tasks");
            setErrorKey((pre) => pre + 1);
            return;
        }
        setTasks((prev) => [...prev, ""]);
        setTaskErrors((prev) => [...prev, undefined]);
        setSchemaError(undefined);
    };

    const handleRemoveTaskInput = (index: number) => {
        if (tasks.length <= 1) return;
        setTasks((prev) => prev.filter((_, idx) => idx !== index));
        setTaskErrors((prev) => prev.filter((_, idx) => idx !== index));
        setSchemaError(undefined);
    };

    const handleTaskChange = (index: number, value: string) => {
        setTasks((prev) => {
            const newTasks = [...prev];
            newTasks[index] = value;
            return newTasks;
        });
        setTaskErrors((prev) => {
            const newTasks = [...prev];
            newTasks[index] = undefined;
            return newTasks;
        });
        setSchemaError(undefined);
    };



    const handleSubmit = (e?: PreventableEvent) => {
        e?.preventDefault();
        const errors = tasks.map((taskValue) => {
            const trimmed = taskValue.trim();
            if (!trimmed) return undefined;
            if (trimmed.length > 30) return "max 30 chars";
            return undefined;
        });

        const hasErrors = errors.some((error) => Boolean(error));
        const cleanedTasks = tasks.map((taskValue) => taskValue.trim()).filter((taskValue) => taskValue !== "");

        if (hasErrors) {
            setTaskErrors(errors);
            setSchemaError(undefined);
            setErrorKey((pre) => pre + 1);
            return;
        }

        if (memberId && taskId) {
            dispatch(editTaskMemberTasks({ taskId, memberId, tasks: cleanedTasks }));
        }
        closeItemModal?.();
    };

    return (
        <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
            <DialogContent className="sm:max-w-120 rounded-[2rem] border-none">
                <div>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
                            Assign Tasks to {memberName}
                        </DialogTitle>
                    </DialogHeader>

                    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label>Member</Label>
                            <div className="flex items-center gap-3 rounded-2xl border border-border p-3">
                                <img
                                    src={member?.avatar}
                                    alt={member?.personalDetails.name || "Member avatar"}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">{member?.personalDetails.name || memberName}</p>
                                    <p className="text-xs text-muted-foreground">Assigned member</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between gap-4">
                                <Label>Tasks</Label>
                                <div className="flex items-center gap-2">
                                    {tasks.length > 1 && (
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="text-white"
                                            onClick={() => {
                                                setTasks([""]);
                                                setSchemaError(undefined);
                                            }}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button type="button" size="sm" className="text-white" onClick={handleAddTaskInput}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <InputError key={errorKey} message={schemaError} />
                        </div>

                        <div className="grid gap-3 pr-2 max-h-64 overflow-y-auto custom-scrollbar">
                            {tasks.map((task, index) => (
                                <div key={index} className="relative">
                                    <div className="relative">
                                        <Input
                                            placeholder={`Task ${index + 1}`}
                                            value={task}
                                            onChange={(e) => handleTaskChange(index, e.target.value)}
                                            className="pr-12 transition-all focus-visible:ring-0 focus-visible:outline-none"
                                        />
                                        {tasks.length > 1 && (
                                            <Button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-transparent text-destructive hover:bg-destructive/10"
                                                onClick={() => handleRemoveTaskInput(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <InputError key={errorKey + index} message={taskErrors[index]} />
                                </div>
                            ))}
                        </div>

                        <DialogFooter className="mt-4">
                            <Button type="button" onClick={() => closeItemModal?.()} variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit" onClick={handleSubmit} className="text-white">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AssignMemberTaskModal;
