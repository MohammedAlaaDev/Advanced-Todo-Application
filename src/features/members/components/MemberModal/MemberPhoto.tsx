import { addMemberImage } from "@/features/members/membersSlice";
import { Upload } from "lucide-react";
import { forwardRef,  useImperativeHandle, useState } from "react"
import { useDispatch } from "react-redux";

export interface MemberPhotoRef {
    handleStep: () => boolean;
}

const MemberPhoto = forwardRef<MemberPhotoRef, {}>((_, ref) => {

    const imagesArr = Array.from({ length: 9 }, (_, idx) => {
        return {
            path: `/assets/members/member${idx + 1}.png`,
            chosen: false,
        }
    })



    const [memberImages, setMemberImages] = useState(imagesArr);
    const [chosenIdx, setChosenIdx] = useState<number>(-1);

    const dispatch = useDispatch();

    useImperativeHandle(ref, () => {
        return {
            handleStep,
        }
    })

    const handleStep = () => {
        if (chosenIdx !== -1) {
            const chosenImage = memberImages[chosenIdx].path;
            dispatch(addMemberImage({ chosenImage }));
        }
        return true;
    }

    const handleChooseToggle = (oldActiveIdx: number, newActiveIdx: number) => {
        const newArr = [...memberImages];

        if (oldActiveIdx !== newActiveIdx && oldActiveIdx !== -1) {
            newArr[oldActiveIdx].chosen = false;
        } else if (oldActiveIdx === newActiveIdx) {
            setChosenIdx(-1);
        }

        newArr[newActiveIdx].chosen = !newArr[newActiveIdx].chosen;
        setMemberImages(newArr);
    }

    return (
        <div className="border-2 border-dotted border-primary bg-primary/20 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
                <div
                    className="size-24 rounded-full bg-primary/10 hover:bg-primary/20 transition-all shadow-md flex items-center justify-center cursor-pointer border border-primary"
                >
                    <Upload className="text-primary" />
                </div>
                {memberImages.map((item, idx) => {
                    return (
                        <div
                            onClick={() => {
                                setChosenIdx(idx);
                                handleChooseToggle(chosenIdx, idx);
                            }}
                            key={idx}
                            className={`${item.chosen ? "border-4 opacity-100" : "opacity-50"} transition-all border-primary size-24 rounded-full overflow-hidden shadow-md flex items-center cursor-pointer justify-center`}
                        >
                            <img src={item.path} draggable={false} className="size-full" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

MemberPhoto.displayName = "MemberPhoto";

export default MemberPhoto