import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/custom/InputError";
import { Plus, Trash, X } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { useInput } from "@/hooks/useInput";
import type { taskDetailsObject, TaskError } from "@/types";
import { taskDetailsSchema } from "@/features/tasks/schemas/taskSchema";
import { Calendar } from "@/components/ui/calendar";
import { useDispatch, useSelector } from "react-redux";
import { addTempTaskDetails, selectTempTaskDetails } from "@/features/tasks/tasksSlice";

export interface TaskDetailsRefType {
    handleStepOne: () => boolean;
}

const TaskDetailsForm = forwardRef<TaskDetailsRefType, {}>((_, ref) => {

    const tempTaskDetails = useSelector(selectTempTaskDetails);

    const [renderKey, setRenderKey] = useState(0);

    const titleInput = useInput(tempTaskDetails.title);
    const descriptionInput = useInput(tempTaskDetails.description);

    const [categoryLengthError, setCategoryLengthError] = useState<string | undefined>(undefined);
    const [zodError, setZodError] = useState<TaskError | null>(null);

    const [categories, setCategories] = useState<string[]>(tempTaskDetails.categories);

    const initialDate = new Date(tempTaskDetails.deadline ? tempTaskDetails.deadline : Date.now());

    const [deadlineDate, setDeadlineDate] = useState<Date>(initialDate);

    const dispatch = useDispatch();


    useImperativeHandle(ref, () => {
        return {
            handleStepOne,
        }
    })

    const handleAddCategory = () => {
        if (categories.length >= 6) {
            setRenderKey((prev) => prev + 1);
            setCategoryLengthError("Max 6 categories");
            return;
        }
        setCategories((prev) => [...prev, ""]);
        setCategoryLengthError(undefined);
    };

    const handleRemoveCategory = (index: number) => {
        if (categories.length <= 1) return;
        setCategories((prev) => prev.filter((_, idx) => idx !== index));
        setCategoryLengthError(undefined);
    };

    const handleCategoryChange = (index: number, value: string) => {
        setCategories((prev) => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    };

    const handleStepOne = () => {
        const data: taskDetailsObject = {
            title: titleInput.value.trim(),
            categories: categories,
            description: descriptionInput.value.trim(),
            deadline: deadlineDate.toISOString(),
        };

        const validationResult = taskDetailsSchema.safeParse(data);

        if (!validationResult.success) {
            const error: TaskError = validationResult.error.format();
            setRenderKey((prev) => prev + 1);
            setZodError(error);
            setCategoryLengthError(error.categories?._errors[0]);
            return false;
        }

        data.categories = data.categories.filter((cat) => cat.trim());

        dispatch(addTempTaskDetails({ data }));

        setCategoryLengthError(undefined);
        setZodError(null);
        return true;
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="task-title">Title</Label>
                <Input
                    id="task-title"
                    placeholder="Enter task title"
                    {...titleInput.bind}
                    className="transition-all focus-visible:ring-0 focus-visible:outline-none"
                />
                <InputError message={zodError?.title?._errors[0]} key={renderKey} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                    id="task-description"
                    placeholder="Enter task description"
                    {...descriptionInput.bind}
                    className="max-h-64 custom-scrollbar transition-all focus-visible:ring-0 focus-visible:outline-none"
                />
                <InputError message={zodError?.description?._errors[0]} key={renderKey} />
            </div>

            <div className="grid gap-3">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <Label>Categories</Label>
                        <InputError message={categoryLengthError} key={renderKey} className="mt-1" />
                    </div>
                    <div className="flex items-center gap-2">
                        {categories.length > 1 && (
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setCategories([""]);
                                    setCategoryLengthError(undefined);
                                }}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            type="button"
                            size="sm"
                            className="text-white"
                            onClick={handleAddCategory}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-3 rounded-2xl border-dotted border-2 border-primary bg-primary/10 p-4">
                    {categories.map((category, index) => (
                        <div key={index} className="relative">
                            <Input
                                placeholder={`Category ${index + 1}`}
                                value={category}
                                onChange={(e) => handleCategoryChange(index, e.target.value)}
                                className="transition-all focus-visible:ring-0 focus-visible:outline-none"
                            />
                            {categories.length > 1 && (
                                <Button
                                    type="button"
                                    size="icon-xs"
                                    className="absolute -right-2 -top-2 rounded-full bg-primary text-white"
                                    onClick={() => {
                                        handleRemoveCategory(index);
                                        setCategoryLengthError(undefined);
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            )}
                            <InputError key={renderKey} message={zodError?.categories?.[index]?._errors[0]} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-2">
                <Label>Deadline</Label>
                <Calendar
                    mode="single"
                    selected={deadlineDate}
                    onSelect={(newDate) => {
                        if (newDate === undefined) return;
                        setDeadlineDate(newDate);
                    }}
                    className="rounded-lg border w-full"
                    captionLayout="dropdown"
                    startMonth={new Date()}
                    endMonth={new Date(new Date().getFullYear() + 3, 11)}
                    disabled={{ before: new Date() }}
                />
            </div>
        </div>
    )
})

TaskDetailsForm.displayName = "TaskDetailsForm";

export default TaskDetailsForm;