import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { addLanguageObject, removeLanguageRow, selectLanguages, updateLanguageLevel, updateLanguageText } from "@/features/members/membersSlice";
import { useDispatch, useSelector } from "react-redux";
import type { LanguageObject } from "@/features/members/types";

interface langLenthErrorProps {
    setLangLengthError: (errorMsg: string) => void;
}

const LanguageInputs = ({ setLangLengthError }: langLenthErrorProps) => {
    const tempLanguages = useSelector(selectLanguages);

    const dispatch = useDispatch();

    const availableLangs = [
        { text: "Arabic", value: "arabic" },
        { text: "English", value: "english" },
        { text: "French", value: "french" },
        { text: "German", value: "german" },
        { text: "Spanish", value: "spanish" },
        { text: "Italian", value: "italian" },
        { text: "Chinese", value: "chinese" },
        { text: "Japanese", value: "japanese" },
        { text: "Turkish", value: "turkish" },
    ]

    const availableLevels = [
        { text: "Beginner", value: "beginner" },
        { text: "Intermediate", value: "intermediate" },
        { text: "Professional", value: "professional" },
        { text: "Advanced", value: "advanced" },
        { text: "Native", value: "native" },
    ]

    return (
        <div>
            {
                tempLanguages.map((languageObject: LanguageObject) => {
                    const filledRow = languageObject.lang !== "" && languageObject.level !== "";

                    return (
                        <div key={languageObject.id} className="flex flex-col relative lg:flex-row justify-between items-start lg:items-center border-2 p-4 mt-2 rounded-xl gap-4 lg:gap-0">
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 flex-1 w-full">
                                <div className="grid gap-1.5 w-full lg:w-auto">
                                    <Select
                                        value={languageObject.lang}
                                        onValueChange={(e) => {
                                            setLangLengthError("");
                                            if (languageObject.level && languageObject.lang === "") {
                                                dispatch(addLanguageObject());
                                            }
                                            dispatch(updateLanguageText({ language: e, id: languageObject.id }));
                                        }}>
                                        <SelectTrigger className="w-full lg:w-48">
                                            <SelectValue placeholder="Select a Language" />
                                        </SelectTrigger>
                                        <SelectContent position='popper'>
                                            <SelectGroup>
                                                <SelectLabel>Languages</SelectLabel>
                                                {
                                                    availableLangs.map((langObject) => {
                                                        const alreadySelected = tempLanguages.some((tempLang) => {
                                                            return tempLang.lang === langObject.value;
                                                        })
                                                        return (
                                                            <SelectItem
                                                                disabled={alreadySelected}
                                                                key={langObject.value}
                                                                value={langObject.value}
                                                            >
                                                                {langObject.text}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-1.5 w-full lg:w-auto">
                                    <Select onValueChange={(e) => {
                                        setLangLengthError("");
                                        if (languageObject.lang && languageObject.level === "") {
                                            dispatch(addLanguageObject());
                                        }
                                        dispatch(updateLanguageLevel({ level: e, id: languageObject.id }));

                                    }}>
                                        <SelectTrigger className="w-full lg:w-48">
                                            <SelectValue placeholder="Select a Level" />
                                        </SelectTrigger>
                                        <SelectContent position='popper'>
                                            <SelectGroup>
                                                <SelectLabel>Level</SelectLabel>
                                                {
                                                    availableLevels.map((level) => {
                                                        return (
                                                            <SelectItem key={level.value} value={level.value}>
                                                                {level.text}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    if (filledRow) {
                                        dispatch(removeLanguageRow(languageObject.id));
                                    }
                                }}
                                className={`${filledRow ? "" : "cursor-not-allowed opacity-50"} size-6 lg:size-8 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 lg:translate-y-0 lg:translate-x-0 lg:relative hover:bg-primary self-end lg:self-auto shrink-0`}>
                                <X className="w-8 h-2 text-white" />
                            </Button>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default LanguageInputs