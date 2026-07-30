import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMemberImage, selectMembers } from "@/features/members/membersSlice";
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam";
import { useParams } from "react-router";
import type { MemberObject } from "@/types";



const EditMemberPhotoModal = () => {

    const { modalKey, openItemModal, closeItemModal } = useQueryParam() as QueryParam;

    const { id } = useParams();

    const open = modalKey === "member-photo";

    const member = useSelector(selectMembers).find((mem: MemberObject) => mem.id === id)

    const setOpen = (open: boolean) => {
        if (open && id) {
            openItemModal?.(id, "member-photo")
        } else {
            closeItemModal?.();
        }
    }

    const initialArr = Array.from({ length: 9 }, (_, idx) => ({
        path: `/assets/members/member${idx + 1}.png`,
        chosen: false,
    }));

    const imagesArr = initialArr.map((item) => item.path === member?.avatar ? { ...item, chosen: true, } : { ...item });
    const [memberImages, setMemberImages] = useState(imagesArr);
    const [prevChosenIdx, setPrevChosenIdx] = useState<number>(-1);
    const dispatch = useDispatch();

    useEffect(() => {
        const index = imagesArr.findIndex((item) => item.chosen);
        setPrevChosenIdx(index);
        setMemberImages(imagesArr);
    }, [open]);

    const handleChooseToggle = (oldActiveIdx: number, newActiveIdx: number) => {
        const newArr = [...memberImages];

        if (oldActiveIdx !== newActiveIdx && oldActiveIdx !== -1) {
            newArr[oldActiveIdx].chosen = false;
        } else if (oldActiveIdx === newActiveIdx) {
            setPrevChosenIdx(-1);
        }

        newArr[newActiveIdx].chosen = !newArr[newActiveIdx].chosen;
        setMemberImages(newArr);
    };

    const handleSave = () => {
        if (prevChosenIdx !== -1) {
            const chosenImage = memberImages.find((item) => item.chosen)?.path;
            const sentImage = chosenImage ? chosenImage : "/assets/members/userDummy.webp";
            dispatch(editMemberImage({ memberId: id, chosenImage: sentImage }));
        }
        closeItemModal?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-75 md:max-w-xl lg:max-w-2xl shadow-2xl max-h-148 p-2 md:p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Update profile photo</DialogTitle>
                </DialogHeader>

                <div className="custom-scrollbar max-h-100 overflow-y-auto border-2 border-dotted border-primary bg-primary/20 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
                        <div className="size-24 rounded-full bg-primary/10 hover:bg-primary/20 transition-all shadow-md flex items-center justify-center cursor-pointer border border-primary">
                            <Upload className="text-primary" />
                        </div>
                        {memberImages.map((item, idx) => (
                            <div
                                onClick={() => {
                                    handleChooseToggle(prevChosenIdx, idx);
                                    setPrevChosenIdx(idx);
                                }}
                                key={idx}
                                className={`${item.chosen ? "border-4 opacity-100" : "opacity-50"} transition-all border-primary size-24 rounded-full overflow-hidden shadow-md flex items-center cursor-pointer justify-center`}
                            >
                                <img src={item.path} draggable={false} className="size-full" />
                            </div>
                        ))}
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => closeItemModal?.()}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditMemberPhotoModal;
