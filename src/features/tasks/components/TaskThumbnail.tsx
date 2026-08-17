import { Button } from "@/components/ui/button";
import { addTaskThumbnail } from "@/features/tasks/tasksSlice";
import { Upload } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";

export interface TaskThumbnailRef {
    handleStepThree: () => boolean;
}

const TaskThumbnail = forwardRef<TaskThumbnailRef, {}>((_, ref) => {

    const dispatch = useDispatch();

    const thumbImages = Array.from({ length: 6 }, (_, idx) => {
        return {
            path: `/assets/tasks/task${idx + 1}.png`,
            chosen: false,
        }
    })

    const [thumbnailImages, setThumbnailImages] = useState(thumbImages);
    const [chosenIdx, setChosenIdx] = useState<number>(-1);

    useImperativeHandle(ref, () => {
        return {
            handleStepThree,
        }
    })

    const handleChooseToggle = (oldActiveIdx: number, newActiveIdx: number) => {
        const newArr = [...thumbnailImages];

        if (oldActiveIdx !== newActiveIdx && oldActiveIdx !== -1) {
            newArr[oldActiveIdx].chosen = false;
        } else if (oldActiveIdx === newActiveIdx) {
            setChosenIdx(-1);
        }

        newArr[newActiveIdx].chosen = !newArr[newActiveIdx].chosen;
        setThumbnailImages(newArr);
    }

    const handleStepThree = () => {
        if (chosenIdx != -1) {
            const chosenImage = thumbnailImages[chosenIdx].path;
            dispatch(addTaskThumbnail({ chosenImage }));
        }
        return true;
    }

    return (
        <div>
            <p className="mb-4">Add task thumbnail (optional)</p>
            <div className="border-2 border-dotted border-primary bg-primary/20 p-6 rounded-lg">
                <div className="grid grid-cols-1 gap-4 justify-items-center">
                    <div
                        className="h-24 w-full bg-primary/10 hover:bg-primary/20 transition-all shadow-md flex items-center justify-center cursor-pointer border border-primary"
                    >
                        <Upload className="text-primary" />
                    </div>
                    {thumbnailImages.map((item, idx) => {
                        return (
                            <Button
                                onClick={() => {
                                    handleChooseToggle(chosenIdx, idx);
                                    setChosenIdx(idx);
                                }}
                                key={idx}
                                className={`${item.chosen ? "border-4 opacity-100" : "opacity-50"} w-full focus-visible:ring-ring focus-visible:ring-6 p-0 h-46 transition-all border-primary shadow-md flex items-center cursor-pointer justify-center`}
                            >
                                <img src={item.path} draggable={false} className="w-full h-full object-cover" />
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
})

TaskThumbnail.displayName = "TaskThumbnail";

export default TaskThumbnail