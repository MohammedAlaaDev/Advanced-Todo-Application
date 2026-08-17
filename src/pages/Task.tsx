import {
    Users,
    Clock,
    PenLine,
    Edit,
    X,
    Plus,
    SearchAlert,
    ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTasks, editTaskTitle, editTaskCategories, editTaskDescription } from "@/features/tasks/tasksSlice";
import { selectMembers } from "@/features/members/membersSlice";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { taskCategoriesSchema, taskDescriptionSchema, taskTitleSchema } from "@/features/tasks/schemas/taskDetailsSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import type { TaskCategoriesError, TaskDescriptionError, taskObject, TaskTitleError } from "@/features/tasks/types";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";
import Searchbar from "@/components/Searchbar";
import SearchTaskItem from "@/features/tasks/components/SearchTaskItem";
import { useErrorNavigation } from "@/hooks/useErrorNavigation";
import type { PreventableEvent } from "@/types";
import { useValidate } from "@/hooks/useValidate";

const Task = () => {
    const { openModal, openItemModal } = useQueryParam() as QueryParam;
    const { id } = useParams();
    const dispatch = useDispatch();
    const members = useSelector(selectMembers);
    const tasks = useSelector(selectAllTasks)
    const task = tasks.find((task: taskObject) => task.id === id);

    const tasksByUserIdArr = Object.entries(task?.tasksByUserId || {});

    const [titleEditMode, setTitleEditMode] = useState<boolean>(false);
    const [categoriesEditMode, setCategoriesEditMode] = useState<boolean>(false);
    const [descriptionEditMode, setDescriptionEditMode] = useState<boolean>(false);

    const [titleValue, setTitleValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [categoriesValue, setCategoriesValue] = useState<string[]>([""]);

    const titleValidation = useValidate<TaskTitleError>();
    const categoriesValidation = useValidate<TaskCategoriesError>();
    const descriptionValidation = useValidate<TaskDescriptionError>();

    const titleError = titleValidation.error?.title?._errors[0];
    const categoriesError = categoriesValidation.error?.categories;
    const descriptionError = descriptionValidation.error?.description?._errors[0];

    const titleFormRef = useErrorNavigation(titleValidation.shakeKey);
    const categoriesFormRef = useErrorNavigation(categoriesValidation.shakeKey);
    const descriptionFormRef = useErrorNavigation(descriptionValidation.shakeKey);

    useEffect(() => {
        if (!task) return;
        setTitleValue(task.title);
        setDescriptionValue(task.description);
        setCategoriesValue(task.categories.length > 0 ? task.categories : [""]);
    }, [task]);

    const existingFilteredCategories = task?.categories.filter((cat) => cat.trim() !== "") || [];

    const resetEditModes = () => {
        setTitleEditMode(false);
        setCategoriesEditMode(false);
        setDescriptionEditMode(false);
        if (task) setTitleValue(task.title);
    };


    const handleTitleEdit = (e?: PreventableEvent) => {
        e?.preventDefault();
        if (!task) return;

        const data = {
            title: titleValue.trim(),
            categories: task.categories,
            description: task.description,
            deadline: task.deadline,
        };

        titleValidation.validate(data, taskTitleSchema, () => {
            dispatch(editTaskTitle({ taskId: task.id, title: data.title }));
            setTitleEditMode(false);
        })
    };


    const handleCategoriesEdit = (e?: PreventableEvent) => {
        e?.preventDefault();

        if (!task) return;

        const trimmedCategories = categoriesValue.map((cat) => cat.trim());

        const data = {
            title: task.title,
            categories: trimmedCategories,
            description: task.description,
            deadline: task.deadline,
        };

        categoriesValidation.validate(data, taskCategoriesSchema, () => {
            const filteredCategories = trimmedCategories.filter((cat) => cat !== "");
            dispatch(editTaskCategories({ taskId: task.id, categories: filteredCategories }));
            setCategoriesEditMode(false);
        })

    };

    const handleDescriptionEdit = (e?: PreventableEvent) => {
        e?.preventDefault();

        if (!task) return;

        const data = {
            title: task.title,
            categories: task.categories,
            description: descriptionValue.trim(),
            deadline: task.deadline,
        };

        descriptionValidation.validate(data, taskDescriptionSchema, () => {
            dispatch(editTaskDescription({ taskId: task.id, description: data.description }));
            setDescriptionEditMode(false);
        })

    };

    const handleAddCategory = () => {
        if (categoriesValue.length >= 6) {
            return;
        }

        setCategoriesValue((prev) => [...prev, ""]);
    };

    const handleRemoveCategory = (index: number) => {
        if (categoriesValue.length <= 1) return;
        setCategoriesValue((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleOpenAssignTaskModal = (memberId: string) => {
        resetEditModes();
        openItemModal?.(memberId, "assign-member-task");
    };

    const navigate = useNavigate();

    const openCategoriesInputs = () => {
        categoriesValidation.setError(null);
        resetEditModes();
        setCategoriesValue(existingFilteredCategories.length > 0 ? existingFilteredCategories : [""]);
        setCategoriesEditMode(true);
    }

    const openTitleInput = () => {
        resetEditModes();
        titleValidation.setError(null);
        setTitleEditMode(true);
    }

    const openThumbnailModal = () => {
        resetEditModes();
        openModal?.("task-thumbnail");
    }

    const openDeadlineModal = () => {
        resetEditModes();
        openModal?.("edit-deadline");
    }

    const openDetailsInput = () => {
        descriptionValidation.setError(null);
        setDescriptionValue(task?.description || "");
        resetEditModes();
        setDescriptionEditMode(true);
    }

    if (!task) return (
        <div className="animate-page flex flex-col items-center justify-center min-h-[calc(100vh-170px)]">
            <SearchAlert className="text-primary animate-up-down m-0" size={200} strokeWidth={1} />
            <p className="text-primary mb-4">The selected task doesn't exist</p>
            <Button
                onClick={() => navigate("../", { replace: true })}
                variant="outline"
            >
                <ArrowLeft /> Back to tasks
            </Button>
        </div>
    );
    const filterFunction = (data: taskObject[], debouncedQuery: string) => {
        return data.filter((item) => {
            return item.title?.toLowerCase().includes(debouncedQuery.toLowerCase());
        })
    }

    const getId = (task: taskObject) => task.id;
    return (
        <div className="animate-page space-y-8">
            {/* Search Header */}
            <Searchbar
                filterFunction={filterFunction}
                data={tasks}
                renderItem={SearchTaskItem}
                getId={getId}
                dataType="tasks"
            />

            {/* Main content card */}
            <div className="bg-white dark:bg-card rounded-2xl shadow-sm overflow-hidden">
                {task?.thumbnail ? (
                    <div className="relative">
                        <img src={task.thumbnail} className="w-full h-88 object-cover" draggable="false" />
                        <div
                            onClick={() => {
                                openThumbnailModal();
                            }}
                            className="overlay cursor-pointer bg-black opacity-50 absolute inset-0 size-full"
                        />
                        <Button
                            onClick={() => {
                                openThumbnailModal();

                            }}
                            className="absolute right-0 bottom-0 rounded-tl-4xl! text-white rounded-none"
                        >
                            <Edit />
                        </Button>
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            openThumbnailModal();
                        }}
                        className="h-88 p-4 w-full bg-primary/10 hover:bg-primary/20 transition-all shadow-md flex items-center justify-center cursor-pointer"
                    >
                        <div className="border-2 gap-2 rounded-2xl border-primary border-dashed h-40 w-64 flex flex-col items-center justify-center">
                            <Edit className="text-primary size-10" />
                            <span className="text-primary">Add a thumbnail</span>
                        </div>
                    </div>
                )}

                <div className="p-5 sm:p-6 space-y-5">
                    <div className="flex flex-col gap-4">
                        <div>

                            <div className="flex items-end gap-4 flex-wrap">
                                <div>
                                    {titleEditMode ? (
                                        <form ref={titleFormRef} onSubmit={handleTitleEdit} className="space-y-3">
                                            <Label htmlFor="task-title">Title</Label>
                                            <Input
                                                id="task-title"
                                                placeholder="Enter task title"
                                                value={titleValue}
                                                onChange={(e) => setTitleValue(e.target.value)}
                                                className="md:w-60 lg:w-80 transition-all m-0"
                                            />
                                            <Button className="hidden" />
                                        </form>
                                    ) : (
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                                            {task?.title}
                                        </h2>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    {titleEditMode ? (
                                        <>
                                            <Button type="button" variant="outline" onClick={() => setTitleEditMode(false)}>
                                                Close
                                            </Button>
                                            <Button className="text-white" type="button" onClick={handleTitleEdit}>
                                                Save
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                openTitleInput();
                                            }}
                                            className="text-xs"
                                        >
                                            <PenLine className="size-4 text-white" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {titleEditMode && <InputError key={titleValidation.shakeKey} message={titleError} />}
                        </div>



                        <div className="space-y-4">
                            {categoriesEditMode ?
                                <form ref={categoriesFormRef} onSubmit={handleCategoriesEdit}>
                                    <div className="grid grid-cols-3 gap-3">
                                        {categoriesValue.map((category, index) => {
                                            return (
                                                <div key={index} className="relative min-w-24">
                                                    <div className="relative">
                                                        <Input
                                                            placeholder={`Category ${index + 1}`}
                                                            value={category}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                setCategoriesValue((prev) => {
                                                                    const next = [...prev];
                                                                    next[index] = value;
                                                                    return next;
                                                                });

                                                            }}
                                                            className="pr-8 transition-all h-8 w-full "
                                                        />

                                                        {categoriesValue.length > 1 ? (
                                                            <Button
                                                                type="button"
                                                                className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-transparent text-destructive hover:bg-destructive/10"
                                                                onClick={() => handleRemoveCategory(index)}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        ) : null}
                                                    </div>

                                                    <InputError key={categoriesValidation.shakeKey + index} message={categoriesError?.[index]?._errors[0]} />
                                                </div>
                                            )
                                        })}
                                        {
                                            categoriesValue.length < 6 && (
                                                <Button type="button" size="sm" className="text-white bg-primary/50 border-2 border-dotted border-primary" onClick={handleAddCategory}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            )
                                        }
                                    </div>
                                    <div className="flex items-center gap-2 my-3">
                                        <Button type="button" variant="outline" onClick={() => {
                                            setCategoriesEditMode(false);
                                        }}>
                                            Close
                                        </Button>
                                        <Button className="text-white" type="button" onClick={handleCategoriesEdit}>
                                            Save
                                        </Button>
                                    </div>
                                </form>
                                :
                                <div className="flex flex-wrap items-center gap-2">
                                    <>
                                        {task?.categories.map((cat, idx) => (
                                            cat ? (
                                                <Badge
                                                    key={idx}
                                                    variant="secondary"
                                                    className="text-xs font-medium px-2.5 py-0.5 rounded-md"
                                                >
                                                    {cat}
                                                </Badge>
                                            ) : null
                                        ))}
                                        <Button
                                            type="button"
                                            className="text-xs font-semibold text-white transition-all"
                                            onClick={() => {
                                                openCategoriesInputs();
                                            }}
                                        >
                                            {existingFilteredCategories.length === 0 ? (
                                                <>
                                                    <Plus className="h-4 w-4" />
                                                    <span className="ml-2">Add tags</span>
                                                </>
                                            ) : (
                                                <>
                                                    <PenLine className="size-4" />
                                                    <span className="ml-2">Edit tags</span>
                                                </>
                                            )}
                                        </Button>
                                    </>
                                </div>
                            }

                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span>{tasksByUserIdArr.length} {tasksByUserIdArr.length === 1 ? "Member" : "Members"} Involved</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <div className="flex items-center gap-2">
                                <span>{task?.deadline ? "Due " + format(new Date(task.deadline), "dd-MMM-yy") : "No deadline"}</span>
                                <Button
                                    type="button"
                                    className="text-xs"
                                    onClick={() => {
                                        openDeadlineModal();

                                    }}
                                >
                                    <PenLine className="size-4 text-white" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <hr className="border-border" />

                    <section className="space-y-2">
                        <div className="flex items-center gap-4">
                            <h2 className="text-base sm:text-lg font-bold text-foreground">Description</h2>
                            {!descriptionEditMode && (
                                <Button
                                    type="button"
                                    className="text-xs"
                                    onClick={() => {
                                        openDetailsInput();
                                    }}
                                >
                                    <PenLine className="text-white size-4" />
                                </Button>
                            )}
                        </div>
                        {descriptionEditMode ? (
                            <form ref={descriptionFormRef} onSubmit={handleDescriptionEdit} className="space-y-3">
                                <Textarea
                                    value={descriptionValue}
                                    onChange={(e) => setDescriptionValue(e.target.value)}
                                    className="min-h-32 max-h-64 transition-all"
                                    placeholder="Describe your task requirements"
                                />
                                <InputError key={descriptionValidation.shakeKey} message={descriptionError} />
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setDescriptionEditMode(false);
                                        }}
                                    >
                                        Close
                                    </Button>
                                    <Button className="text-white" type="button" onClick={handleDescriptionEdit}>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <p className="text-sm text-muted-foreground leading-relaxed">{task?.description || "No Description"}</p>
                        )}
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">Members tasks</h2>
                        <div className="grid gap-3">
                            {task ? (
                                tasksByUserIdArr.map(([memberId, memberTasks]) => {
                                    const member = members.find((mem) => mem.id === memberId);
                                    return (
                                        <button
                                            key={memberId}
                                            type="button"
                                            onClick={() => handleOpenAssignTaskModal(memberId)}
                                            className="cursor-pointer group w-full rounded-3xl border border-border p-4 text-left transition hover:border-primary hover:bg-primary/10"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={member?.avatar}
                                                    alt={member?.personalDetails.name || "Member avatar"}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-foreground truncate">{member?.personalDetails.name || "Unnamed member"}</p>
                                                    <p className="text-xs text-muted-foreground">{memberTasks.length ? `${memberTasks.length} task${memberTasks.length === 1 ? "" : "s"}` : "No tasks yet"}</p>
                                                </div>
                                            </div>
                                            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                                {memberTasks.length ? (
                                                    [...memberTasks].map((taskItem, idx) => (
                                                        <p key={idx}>- {taskItem}</p>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">No tasks assigned</p>
                                                )}
                                            </ul>
                                        </button>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                    </section>
                </div>
            </div >
        </div >
    );
};

export default Task;