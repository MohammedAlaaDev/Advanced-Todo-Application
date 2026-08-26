import InputError from "@/components/InputError"
import LanguageInputs from "@/features/members/components/MemberModal/LanguageInputs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addMember, addTempLink, addTempStack, removeTempLink, removeTempStack, selectLanguages, selectTempLinks, selectTempStack, updateTempLink, updateTempStack } from "@/features/members/membersSlice"
import { skillsSocialsSchema } from "@/features/members/schemas/skillsSocialsSchema"
import type { LanguageObject, SkillsAndSocialsError, UpdateLinkProps } from "@/features/members/types";
import { Link, Plus, X } from "lucide-react"
import { forwardRef, useImperativeHandle, useRef, useState, type Ref } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useValidate } from "@/hooks/useValidate"

export interface SkillsAndSocialsRef {
    handleStep: () => boolean;
}

interface StackAndSocialsType {
    tempStack: string[];
    tempLinks: string[];
}

interface ValetationType {
    error: SkillsAndSocialsError | null;
    shakeKey: number;
    validate: (data: StackAndSocialsType, schema: typeof skillsSocialsSchema) => boolean;
    setError: (error: SkillsAndSocialsError | null) => void;
}

const SkillsAndSocials = ({ }, ref: Ref<SkillsAndSocialsRef>) => {

    const tempStack = useSelector(selectTempStack);
    const tempLinks = useSelector(selectTempLinks);
    const tempLanguages = useSelector(selectLanguages);

    const [langLengthError, setLangLengthError] = useState("");
    const [stackLengthError, setStackLengthError] = useState("");
    const [linksLengthError, setLinksLengthError] = useState("");

    const [errorKeyLangLen, setErrorKeyLangLen] = useState(0);
    const [errorKeyStackLen, setErrorKeyStackLen] = useState(0);
    const [errorKeyLinksLen, setErrorKeyLinksLen] = useState(0);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const dispatch = useDispatch();

    const { error, shakeKey, validate, setError } = useValidate() as ValetationType;

    const placeholdersStackArr = [
        "GSAP",
        "ThreeJS",
        "React",
        "TypeScript",
        "Tailwind",
        "JavaScript",
        "Redux",
        "Strapi",
        "Nodejs",
    ]

    const placeholdersLinksArr = [
        "github",
        "linkedin",
        "portfolio",
        "facebook",
    ]

    const handleAddTempStack = () => {
        dispatch(addTempStack());
    }

    const handleRemoveTempStack = (idx: number) => {
        dispatch(removeTempStack(idx));
    }

    const handleAddTempLink = () => {
        dispatch(addTempLink());
    }

    const handleRemoveTempLink = (idx: number) => {
        dispatch(removeTempLink(idx));
    }

    const handleUpdateTempLinks = (object: UpdateLinkProps) => {
        dispatch(updateTempLink(object));
    }

    const clearStackZodErrors = () => {
        const stackError = error?.tempStack;
        if (stackError) {
            const newZodError = { ...error, tempStack: undefined };
            setError(newZodError);
        }
    }

    const clearLinksZodErrors = () => {
        const linksError = error?.tempLinks;
        if (linksError) {
            const newZodError = { ...error, tempLinks: undefined };
            setError(newZodError);
        }
    }

    const clearStackLengthError = () => {
        if (stackLengthError) {
            setStackLengthError("");
        }
    }

    const clearlinksLengthError = () => {
        if (linksLengthError) {
            setLinksLengthError("");
        }
    }

    const handleLinksLength = () => {
        setErrorKeyLinksLen((pre) => pre + 1);

        setLinksLengthError("You can add only 4 links");

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setLinksLengthError("");
            timerRef.current = null;
        }, 3000);
    }

    // submit handler
    const handleStep = () => {

        setLinksLengthError("");

        const cleanedTempLanguages = tempLanguages.filter((language: LanguageObject) => {
            return language.lang !== "" && language.level !== "";
        })

        const trimmedStack = tempStack.map((stack: string) => stack.trim());
        const trimmedLinks = tempLinks.map((link: string) => link.trim());

        const tempSkillsAndSocials = {
            tempLanguages: cleanedTempLanguages,
            tempStackAndLinks: {
                tempStack: trimmedStack,
                tempLinks: trimmedLinks,
            }
        }

        // custom validation
        const sentLangs = tempSkillsAndSocials.tempLanguages;
        const cleanedStack = tempSkillsAndSocials.tempStackAndLinks.tempStack.filter((stack: string) => stack !== "");

        const emptyStack = cleanedStack.length === 0;

        const handleLanguagesLengthError = () => {
            if (sentLangs.length < 1) {
                setLangLengthError("Add at least one language");
                setErrorKeyLangLen((pre) => pre + 1);
            } else {
                setLangLengthError("");
            }
        }

        const handleStackLengthError = () => {
            if (emptyStack) {
                setStackLengthError("Add at least one Technology");
                setErrorKeyStackLen((pre) => pre + 1);
            } else {
                setStackLengthError("");
            }
        }

        // zod validation
        const result = validate(tempSkillsAndSocials.tempStackAndLinks, skillsSocialsSchema);

        const fail = !result || sentLangs.length < 1 || emptyStack;

        if (fail) {
            handleLanguagesLengthError();
            handleStackLengthError();
            return false;
        }

        const cleanedLinks = tempSkillsAndSocials.tempStackAndLinks.tempLinks.filter((link: string, idx: number) => {
            if (idx !== 0) {
                return link !== ""
            }
            return true;
        });

        const cleanedData = {
            languages: cleanedTempLanguages,
            stackAndLinks: {
                stack: cleanedStack,
                social: cleanedLinks,
            }
        }

        dispatch(addMember(cleanedData));

        return true;
    }

    useImperativeHandle(ref, () => ({
        handleStep,
    }))

    return (
        <div className="space-y-6">
            < div className="rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4" >
                <Label className="text-primary font-bold">Member Languages (Max 4)</Label>
                <InputError message={langLengthError} key={errorKeyLangLen} />
                <LanguageInputs setLangLengthError={setLangLengthError} />
            </div >

            <div className="grid gap-1.5">
                <Label>Tech Stack</Label>
                <InputError message={stackLengthError} key={errorKeyStackLen} />
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                    {
                        tempStack.map((tech, idx) => (
                            <div key={idx} className="relative">
                                <Input
                                    placeholder={`eg. ${placeholdersStackArr[idx]}`}
                                    value={tech}
                                    onChange={(e) => {
                                        const stackObject = { idx, text: e.target.value }
                                        dispatch(updateTempStack(stackObject));
                                        clearStackZodErrors();
                                        clearStackLengthError();
                                    }}
                                />
                                <InputError message={error?.tempStack?.[idx]?._errors[0]} key={shakeKey} />
                                {
                                    tempStack.length > 1 &&
                                    <Button
                                        onClick={() => {
                                            handleRemoveTempStack(idx);
                                            clearStackZodErrors();
                                            clearStackLengthError();
                                        }}
                                        className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 size-6 rounded-full">
                                        <X className="size-4 text-white" />
                                    </Button>
                                }
                            </div>
                        ))
                    }
                    {
                        tempStack.length < 9 &&
                        <Button
                            onClick={() => {
                                handleAddTempStack();
                                clearStackZodErrors();
                                clearStackLengthError();
                            }}
                            className="bg-primary/10 h-10 hover:bg-primary/20 flex items-center justify-center rounded-sm border-dotted border-2 border-primary">
                            <Plus className="w-4 h-4 text-primary" />
                        </Button>
                    }
                </div>
            </div>

            <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col justify-start gap-3 items-start">
                        <Label>Social Media Links (Optional)</Label>
                        <InputError message={linksLengthError} key={errorKeyLinksLen} />
                    </div>
                    <Button
                        size="sm"
                        className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                        onClick={() => {
                            if (tempLinks.length === 4) {
                                handleLinksLength();
                                return;
                            }
                            handleAddTempLink();
                            setLinksLengthError("");
                        }}
                    >
                        <Plus />
                    </Button>
                </div>

                {
                    tempLinks.map((link, idx) => (
                        <div key={idx} className="relative mt-3">
                            <div className="relative">
                                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={link}
                                    onChange={(e) => {
                                        const updatedLink = { idx, text: e.target.value };
                                        handleUpdateTempLinks(updatedLink);
                                        clearLinksZodErrors();
                                    }}

                                    placeholder={`eg. https://www.${placeholdersLinksArr[idx]}.com`} className="pl-10 " />
                                <InputError className="mt-2" message={error?.tempLinks?.[idx]?._errors[0]} key={shakeKey} />
                            </div>
                            {
                                tempLinks.length > 1 &&
                                <Button
                                    onClick={() => {
                                        handleRemoveTempLink(idx);
                                        clearLinksZodErrors();
                                        clearlinksLengthError();
                                    }}
                                    className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 size-6 rounded-full">
                                    <X className="size-4 text-white" />
                                </Button>
                            }
                        </div>
                    ))
                }

            </div>
        </div >
    )
}

SkillsAndSocials.displayName = "SkillsAndSocials";

export default forwardRef(SkillsAndSocials);