import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTaskThumbnail, selectTask } from "@/features/tasks/tasksSlice";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";
import { useParams } from "react-router";
import type { RootState } from "@/app/store";

const EditTaskThumbnailModal = () => {
    const { modalKey, openModal, closeModal } = useQueryParam() as QueryParam;
    const { id: taskId } = useParams();

    const open = modalKey === "task-thumbnail";
    const setOpen = (open: boolean) => {
        if (open && taskId) {
            openModal?.("task-thumbnail");
        } else {
            closeModal?.();
        }
    };

    const task = useSelector((state: RootState) => taskId ? selectTask(state, taskId) : undefined);
    const activeImage = task?.thumbnail;

    const initialArr = Array.from({ length: 6 }, (_, idx) => ({
        path: `/assets/tasks/task${idx + 1}.png`,
        chosen: false,
    }));

    const imagesArr = initialArr.map((item) => item.path === activeImage ? { ...item, chosen: true, } : { ...item });

    const [thumbnailImages, setThumbnailImages] = useState(imagesArr);
    const [prevChosenIdx, setPrevChosenIdx] = useState<number>(-1);

    const dispatch = useDispatch();

    useEffect(() => {
        const index = imagesArr.findIndex((item) => item.chosen);
        setPrevChosenIdx(index);
        setThumbnailImages(imagesArr);
    }, [open, activeImage]);

    const handleChooseToggle = (oldActiveIdx: number, newActiveIdx: number) => {
        const newArr = [...thumbnailImages];

        if (oldActiveIdx !== newActiveIdx && oldActiveIdx !== -1) {
            newArr[oldActiveIdx].chosen = false;
        } else if (oldActiveIdx === newActiveIdx) {
            setPrevChosenIdx(-1);
        }

        newArr[newActiveIdx].chosen = !newArr[newActiveIdx].chosen;
        setThumbnailImages(newArr);
    };

    const handleSave = () => {
        if (prevChosenIdx !== -1 && taskId) {
            const chosenImage = thumbnailImages.find((item) => item.chosen)?.path;
            const sentImage = chosenImage ? chosenImage : "";
            dispatch(editTaskThumbnail({ taskId, chosenImage: sentImage }));
        }
        closeModal?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-75 md:max-w-xl lg:max-w-2xl shadow-2xl p-2 md:p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Update task thumbnail</DialogTitle>
                </DialogHeader>

                <div className="grid max-h-128 gap-5 p-6 custom-scrollbar overflow-y-auto border-2 border-dotted border-primary bg-primary/20 rounded-lg">
                    <div className="grid grid-cols-1 gap-4 justify-items-center">
                        <div className="h-24 w-full bg-primary/10 hover:bg-primary/20 transition-all shadow-md flex items-center justify-center border border-primary rounded-xl">
                            <Upload className="text-primary" />
                        </div>
                        {thumbnailImages.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    handleChooseToggle(prevChosenIdx, idx);
                                    setPrevChosenIdx(idx);
                                }}
                                className={`${item.chosen ? "border-4 opacity-100" : "opacity-50"} w-full h-46 transition-all border-primary shadow-md flex items-center cursor-pointer justify-center rounded-xl overflow-hidden`}
                            >
                                <img src={item.path} draggable={false} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-2 pt-4">
                    <Button variant="secondary" onClick={() => closeModal?.()}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskThumbnailModal;
