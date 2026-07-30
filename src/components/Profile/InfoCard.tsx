import type { LanguageObject, MemberObject } from '@/types';
import {
    Github,
    Linkedin,
    Globe,
    Mail,
    ChartNoAxesColumn,
    Youtube,
    Dribbble,
    Facebook,
    X,
    Send,
    PenLine,
    Plus,
    Check,
    Link,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { Input } from '@/components/ui/input';
import { tempLinksSchema, tempStackSchema } from '@/features/members/schemas/skillsSocialsSchema';
import InputError from '@/components/custom/InputError';
import { useDispatch, useSelector } from 'react-redux';
import {
    addLanguageObject,
    editSkills,
    fillLanguagesArr,
    removeLanguageRow,
    resetTempLangs,
    selectTempLangs,
    updateLanguageLevel,
    updateLanguageText,
    updateMemberLanguages,
    updateMemberLinks
} from '@/features/members/membersSlice';
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from '@/components/ui/select';
import { useValidate } from '@/hooks/useValidate';

interface infoCardProps {
    member: MemberObject | undefined;
    resetEditModes: () => void;
    stackEditMode: boolean;
    setStackEditMode: (mode: boolean) => void;
    langsEditMode: boolean;
    setLangsEditMode: (mode: boolean) => void;
    linksEditMode: boolean;
    setLinksEditMode: (mode: boolean) => void;
}

const InfoCard = ({
    member,
    resetEditModes,
    stackEditMode,
    setStackEditMode,
    langsEditMode,
    setLangsEditMode,
    linksEditMode,
    setLinksEditMode
}: infoCardProps) => {

    const dispatch = useDispatch();

    const placeholdersLinksArr = [
        "github",
        "linkedin",
        "portfolio",
        "facebook",
    ]

    const stackValidation = useValidate();
    const linksValidation = useValidate();

    const logos = [
        { key: "github", text: "GitHub", Icon: <Github /> },
        { key: "linkedin", text: "LinkedIn", Icon: <Linkedin /> },
        { key: "facebook", text: "Facebook", Icon: <Facebook /> },
        { key: "fb.", text: "Facebook", Icon: <Facebook /> },
        { key: "twitter", text: "Twitter", Icon: <X /> },
        { key: "x.com", text: "Twitter", Icon: <X /> },
        { key: "youtube", text: "YouTube", Icon: <Youtube /> },
        { key: "youtu.be", text: "YouTube", Icon: <Youtube /> },
        { key: "dribbble", text: "Dribbble", Icon: <Dribbble /> },
        { key: "telegram", text: "Telegram", Icon: <Send /> },
        { key: "t.me", text: "Telegram", Icon: <Send /> },
        { key: "codeforces", text: "Codeforces", Icon: <ChartNoAxesColumn /> },
        { key: "mail", text: "Email", Icon: <Mail /> },
    ]

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

    const skills: string[] = member ? [...member.skillsAndSocials.stackAndLinks.stack] : [];
    const languages: LanguageObject[] = member ? [...member.skillsAndSocials.languages] : [];

    const memberLinks = member?.skillsAndSocials?.stackAndLinks?.social;
    const memberLinksFiltered = memberLinks?.filter((link) => {
        return link.trim() !== "";
    });

    const [tempLinks, setTempLinks] = useState<string[] | undefined>(memberLinks);

    const [localTempStack, setLocalTempStack] = useState<string[]>(skills);
    const tempLangs = useSelector(selectTempLangs);

    const [stackLengthError, setStackLengthError] = useState<string | undefined>(undefined);

    const stackFormRef = useRef<HTMLFormElement>(null);
    const linksFormRef = useRef<HTMLFormElement>(null);

    const resetStackErrors = () => {
        stackValidation.setError(null);
        setStackLengthError(undefined);
    }

    const handleStackChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const updatedStack = [...localTempStack];
        updatedStack[idx] = e.target.value.trim();
        setLocalTempStack(updatedStack);
    }

    const handleAddStack = () => {
        setLocalTempStack([...localTempStack, ""]);
    }

    const handleUpdateStack = (e?: SubmitEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();


        const data = {
            tempStack: localTempStack,
        }

        stackValidation.validate(data, tempStackSchema, () => {
            const cleanedData = data.tempStack.filter((skill) => skill.trim() !== "");

            if (cleanedData.length === 0) {
                stackValidation.setShakeKey(prev => prev + 1);
                setStackLengthError("add at least one skill");
                return;
            }

            setLocalTempStack(cleanedData);

            dispatch(editSkills({ id: member?.id, tempstack: cleanedData }));
            setStackEditMode(false);
            resetStackErrors();
        })
    }

    const handleUpdateLinks = (e?: SubmitEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();



        if (tempLinks) {
            const currentLinks = [...tempLinks];
            const data = {
                tempLinks: currentLinks,
            }

            linksValidation.validate(data, tempLinksSchema, () => {
                const cleanedData = currentLinks?.filter((link) => link?.trim() !== "");
                dispatch(updateMemberLinks({ id: member?.id, links: cleanedData }));
                setLinksEditMode(false);
            })

        }
    }

    const handleLangChange = (obj: { prevLanguage: string, language: string, level: string, id: string }) => {
        const { level, prevLanguage, id, language } = obj;
        if (level && prevLanguage === "") {
            dispatch(addLanguageObject());
        }

        dispatch(updateLanguageText({ language, id }));
    }

    const handleLevelChange = (obj: { prevLevel: string, language: string, level: string, id: string }) => {
        const { language, prevLevel, id, level } = obj;
        if (language && prevLevel === "") {
            dispatch(addLanguageObject());
        }

        dispatch(updateLanguageLevel({ level, id }));
    }

    const handleUpdatelangs = (data: { id: string | undefined, langs: LanguageObject[] }) => {
        const { langs, id } = data;
        const cleanedLangs = langs.filter((langObj) => {
            return langObj.lang && langObj.level;
        })
        const cleanedData = { langs: cleanedLangs, id };
        if (id) {
            dispatch(updateMemberLanguages(cleanedData));
            setLangsEditMode(false);
        }
    }


    const handleRemoveTempLink = (removedIdx: number) => {
        if (tempLinks) {
            const newTempLinks = [...tempLinks].filter((_, idx) => removedIdx !== idx);
            setTempLinks(newTempLinks);
        }
    }

    const handleLinkChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
        if (tempLinks) {
            const newTempLinks = [...tempLinks];
            newTempLinks[idx] = e.target.value;
            setTempLinks(newTempLinks);
        }
    }

    const openStackInputs = () => {

        setTimeout(() => {
            const firstInput = stackFormRef.current?.querySelector("input");
            firstInput?.focus();
        }, 0);

        resetEditModes();
        stackValidation.setError(null);
        setLocalTempStack(skills);
        setStackLengthError(undefined);
        setStackEditMode(true);
    }

    const openLangsInputs = () => {
        resetEditModes();
        dispatch(fillLanguagesArr(languages));
        setLangsEditMode(true);
    }

    const openLinksInputs = () => {

        setTimeout(() => {
            const firstInput = linksFormRef.current?.querySelector("input");
            firstInput?.focus();
        }, 0);

        resetEditModes();
        setTempLinks(memberLinks);
        linksValidation.setError(null);
        setLinksEditMode(true);
    }

    return (
        <aside className="w-full bg-white dark:bg-card rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 md:p-8 lg:p-4">

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{member?.personalDetails?.name}</h2>

            <hr className="border-gray-100" />

            <div className="py-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2 flex-col">
                        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase">Tech Stack</h3>
                        <InputError className='text-xs!' key={stackValidation.shakeKey} message={stackLengthError} />
                    </div>
                    {
                        stackEditMode ?
                            <div className="flex gap-2">
                                <Button className="size-6" onClick={() => {
                                    setStackEditMode(false);
                                }}>
                                    <X className="text-white" />
                                </Button>
                                <Button className="size-6" onClick={() => {
                                    handleUpdateStack();
                                }}>
                                    <Check className="text-white" />
                                </Button>
                            </div>
                            :
                            <Button className="size-6" onClick={() => {
                                openStackInputs();
                            }}>
                                <PenLine className="text-white" />
                            </Button>
                    }
                </div>
                {
                    stackEditMode ?
                        <form
                            ref={stackFormRef}
                            onSubmit={(e) => {
                                handleUpdateStack(e);
                            }}
                            className="grid max-[350px]:grid-cols-1 grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                            <Button type="submit" className="hidden">
                            </Button>
                            {localTempStack.map((skill, idx) => (
                                <div key={idx} className="flex flex-col items-start">
                                    <div className="relative w-full">
                                        <Input
                                            id={`skill-${idx}`}
                                            className="stackInput h-6 pl-2 pr-8 py-1 bg-primary/20 dark:bg-primary/20 text-primary dark:text-primary text-xs font-medium rounded-full border border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors"
                                            value={skill}
                                            onChange={(e) => {
                                                handleStackChange(e, idx);
                                            }}
                                        />
                                        {
                                            localTempStack.length > 1 &&
                                            <Button
                                                onClick={() => {
                                                    const updatedStack = localTempStack.filter((_, index) => index !== idx);
                                                    setLocalTempStack(updatedStack);
                                                }}
                                                className="absolute top-1/2 right-0 rounded-full size-3 bg-primary/20 h-full -translate-y-1/2 flex justify-center items-center"
                                            >
                                                <X className="text-white size-3" />
                                            </Button>
                                        }
                                    </div>
                                    <InputError className='text-xs!' key={stackValidation.shakeKey} message={stackValidation.error?.tempStack?.[idx]?._errors[0]} />
                                </div>
                            ))}
                            {
                                localTempStack.length < 9 &&
                                <Button
                                    onClick={handleAddStack}
                                    className="h-6 flex justify-center items-center border-2 border-dotted border-primary dark:border-primary bg-primary/20 dark:bg-primary/20 hover:bg-primary/50 hover:dark:bg-primary/50">
                                    <Plus className="text-primary size-3" />
                                </Button>
                            }
                        </form>
                        :
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary/20 dark:bg-primary/20 text-primary dark:text-primary text-xs font-medium rounded-full border border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                }
            </div>

            <hr className="border-gray-100" />

            <div className="py-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase">Languages</h3>
                    {
                        langsEditMode ?
                            <div className="flex gap-2">
                                <Button className="size-6" onClick={() => {
                                    dispatch(resetTempLangs());
                                    setLangsEditMode(false);
                                }}>
                                    <X className="text-white" />
                                </Button>
                                <Button className="size-6" onClick={() => {
                                    const data = {
                                        id: member?.id,
                                        langs: tempLangs,
                                    }
                                    handleUpdatelangs(data);
                                }}>
                                    <Check className="text-white" />
                                </Button>
                            </div>
                            :
                            <Button className="size-6" onClick={() => {
                                openLangsInputs();
                            }}>
                                <PenLine className="text-white" />
                            </Button>
                    }

                </div>
                <div className="space-y-3">
                    {
                        langsEditMode ?
                            <>
                                {
                                    tempLangs.map((lang) => {
                                        const isFullRow = lang.lang && lang.level;
                                        return (
                                            <div
                                                key={lang.id}
                                                className='relative grid grid-cols-2 gap-2 bg-primary/10 rounded-sm border-dotted border-2 border-primary/50 p-2'>
                                                {
                                                    tempLangs.length > 2 && isFullRow &&
                                                    <Button
                                                        onClick={() => {
                                                            dispatch(removeLanguageRow(lang.id));
                                                        }}
                                                        className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 rounded-full size-5 '>
                                                        <X className='size-3 text-white' />
                                                    </Button>
                                                }
                                                <Select
                                                    onValueChange={(e) => {
                                                        handleLangChange({ prevLanguage: lang.lang, language: e, level: lang.level, id: lang.id });
                                                    }}
                                                    defaultValue={lang.lang.toLowerCase()}>
                                                    <SelectTrigger className="w-full max-w-48">
                                                        <SelectValue placeholder="lang" />
                                                    </SelectTrigger>
                                                    <SelectContent position='popper'>
                                                        <SelectGroup>
                                                            {
                                                                availableLangs.map((availableLangObject) => {
                                                                    const alreadySelected = tempLangs.some((tempLangObj) => {
                                                                        return tempLangObj.lang === availableLangObject.value;
                                                                    })
                                                                    return (
                                                                        <SelectItem
                                                                            disabled={alreadySelected}
                                                                            key={availableLangObject.value}
                                                                            value={availableLangObject.value}
                                                                        >
                                                                            {availableLangObject.text}
                                                                        </SelectItem>
                                                                    )
                                                                })
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <Select
                                                    onValueChange={(e) => {
                                                        handleLevelChange({ prevLevel: lang.level, language: lang.lang, level: e, id: lang.id });
                                                    }}
                                                    defaultValue={lang.level.toLowerCase()}>
                                                    <SelectTrigger className="w-full max-w-48">
                                                        <SelectValue placeholder="level" />
                                                    </SelectTrigger>
                                                    <SelectContent position='popper'>
                                                        <SelectGroup>
                                                            <SelectLabel>Levels</SelectLabel>
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
                                        )
                                    })
                                }
                            </>
                            :
                            <>
                                {languages.map((lang) => (
                                    <div key={lang?.lang} className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{lang.lang}</span>
                                        <span className="text-xs text-primary dark:text-primary bg-primary/20 dark:bg-primary/20 px-2 py-0.5 hover:bg-primary/20 dark:hover:bg-primary/20 rounded-md font-semibold">
                                            {lang.level}
                                        </span>
                                    </div>
                                ))}
                            </>

                    }
                </div>
            </div>

            <hr className="border-gray-100" />

            <div className="pt-6">
                <div className='flex justify-between items-center mb-4'>
                    <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase">Social Media</h3>
                    {
                        linksEditMode ?
                            <div className="flex gap-2">
                                <Button className="size-6" onClick={() => {
                                    setLinksEditMode(false);

                                }}>
                                    <X className="text-white" />
                                </Button>
                                <Button className="size-6" onClick={() => {
                                    handleUpdateLinks()
                                }}>
                                    <Check className="text-white" />
                                </Button>
                            </div>
                            :
                            <Button className="size-6" onClick={() => {
                                openLinksInputs();
                            }}>
                                <PenLine className="text-white" />
                            </Button>
                    }

                </div>
                {
                    linksEditMode ?
                        <>
                            <form ref={linksFormRef} className='flex flex-col gap-2' onSubmit={(e) => handleUpdateLinks(e)}>
                                <Button type='submit' className='hidden'>
                                </Button>
                                {
                                    tempLinks?.map((link, idx) => (
                                        <div key={idx}>
                                            <div className="relative">
                                                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    name={`tempLink-${idx}`}
                                                    placeholder={`eg. https://www.${placeholdersLinksArr[idx]}.com`}
                                                    className="pl-10 linkInput"
                                                    value={link}
                                                    onChange={(e) => {
                                                        handleLinkChange(idx, e);
                                                    }}
                                                />
                                                {
                                                    tempLinks.length > 1 &&
                                                    <Button
                                                        onClick={() => {
                                                            handleRemoveTempLink(idx);
                                                            linksValidation.setError(null);
                                                        }}
                                                        className='absolute rounded-full size-5 bg-red-500 hover:bg-red-600 top-0 right-0 translate-x-1/2 -translate-y-1/2'>
                                                        <X className='size-4 text-white' />
                                                    </Button>
                                                }
                                            </div>
                                            <InputError key={linksValidation.shakeKey} message={linksValidation.error?.tempLinks?.[idx]?._errors[0]} />
                                        </div>
                                    ))
                                }
                            </form>
                            {
                                tempLinks && tempLinks?.length < 4 &&
                                <Button
                                    onClick={() => {
                                        setTempLinks((p) => {
                                            return [...(p || []), ""];
                                        })
                                        linksValidation.setError(null);
                                    }}
                                    className='bg-primary/20 p-3 hover:bg-primary/40 border-dotted border-2 border-primary w-full mt-2'>
                                    <Plus className='size-4 text-primary' />
                                </Button>
                            }
                        </>
                        :
                        <>
                            {
                                memberLinksFiltered && memberLinksFiltered.length >= 1 ?
                                    <div className="grid grid-cols-2 gap-3">
                                        {
                                            memberLinksFiltered?.map((link, idx) => {
                                                const chosenLogo = logos.find((logo) => link.includes(logo.key))
                                                return (
                                                    <a key={idx} href={link} target='_blank' className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-primary/10 dark:hover:bg-primary/10 transition-all text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary/50" >
                                                        {chosenLogo ? chosenLogo.Icon : <Globe />}
                                                        <span className="text-xs font-medium">{chosenLogo ? chosenLogo.text : "External"}</span>
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <p className="text-gray-400 dark:text-gray-500">No Socials Provided</p>
                            }
                        </>
                }
            </div>
        </aside >
    );
};

export default InfoCard;
