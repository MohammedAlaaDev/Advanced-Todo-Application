import { Tags, LayoutList, X, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { NoteError, NoteObject } from '@/features/notes/types';
import { useInput } from "@/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote, selectNotesArr } from "@/features/notes/notesSlice";
import { useEffect, useState } from "react";
import { noteSchema } from "@/features/notes/schemas/noteSchema";
import InputError from "@/components/InputError";
import { nanoid } from "@reduxjs/toolkit";
import { format, parseISO } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useValidate } from "@/hooks/useValidate";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useErrorNavigation } from "@/hooks/useErrorNavigation";
import type { PreventableEvent } from "@/types";

interface ValidationType {
    error: NoteError | null;
    validate: (data: any, schema: any, onSuccess: () => void) => boolean;
    setError: (error: NoteError | null) => void;
    shakeKey: number;
}

const NoteModal = () => {

    const notes = useSelector(selectNotesArr);

    const { modalKey, id, openModal, closeModal, openItemModal, closeItemModal } = useQueryParam();

    const editedNote = notes.find((note) => note.id === id);

    const resetErrors = () => {
        if (error) {
            setError(null);
        }

        if (categoryLengthError) {
            setCategoryLengthError(undefined);
        }
    }

    const open = modalKey === "note";
    const setOpen = (open: boolean) => {
        if (open) {
            if (editedNote) {
                openItemModal(editedNote.id, "note");
            } else {
                openModal("note");
            }
        } else {
            if (editedNote) {
                closeItemModal();
            } else {
                closeModal();
            }
        }
    }

    const dispatch = useDispatch();

    const { validate, error, setError, shakeKey } = useValidate() as ValidationType;

    const [categoryLengthError, setCategoryLengthError] = useState<string | undefined>(undefined);
    const [keyCatError, setKeyCatError] = useState<number>(0);

    const title = useInput(editedNote?.title || "", resetErrors);
    const details = useInput(editedNote?.description || "", resetErrors);

    const [tempCategoryArr, setTempCategoryArr] = useState<string[]>(editedNote?.category || [""]);

    useEffect(() => {
        if (open) {
            title.fillInitialState();
            details.fillInitialState();
            setTempCategoryArr(editedNote?.category || [""]);
        }

        resetErrors();

    }, [open, editedNote])


    const handleSubmit = (e?: PreventableEvent) => {
        e?.preventDefault();

        const trimmedCategories = tempCategoryArr.map((cat) => cat.trim());

        const formData = {
            noteTitle: title.value.trim(),
            noteDetails: details.value.trim(),
            tempCategories: trimmedCategories,
        }

        validate(formData, noteSchema, () => {

            const { noteDetails, noteTitle, tempCategories } = { ...formData };
            const formattedDate = format(parseISO(new Date().toISOString()), "eeee, dd-MMM-yyyy");

            const filteredCategoryArr = tempCategories.filter((cat) => cat !== "");

            if (editedNote) {
                const note: NoteObject = {
                    ...editedNote,
                    category: filteredCategoryArr.length === 0 ? [""] : filteredCategoryArr,
                    title: noteTitle,
                    description: noteDetails,
                    edited: true,
                    createdAt: formattedDate,
                }
                dispatch(editNote(note));
            } else {
                const note: NoteObject = {
                    id: nanoid(),
                    category: filteredCategoryArr.length === 0 ? [""] : filteredCategoryArr,
                    title: noteTitle,
                    description: noteDetails,
                    edited: false,
                    createdAt: formattedDate,
                }
                dispatch(addNote(note));
            }

            resetAllInputs();
            closeItemModal();

        })

    }

    const resetAllInputs = () => {
        setError(null);
        setCategoryLengthError(undefined);
        title.reset();
        details.reset();
        setTempCategoryArr([""]);
    }

    const removeTempCategory = (idx: number) => {
        setTempCategoryArr((pre) => {
            const newArr = pre.filter((_, i) => i !== idx);
            return newArr;
        });
        setCategoryLengthError(undefined);
    }

    const handleTempCategoryChange = (text: string, idx: number) => {
        setTempCategoryArr((prev) => {
            const newArr = [...prev];
            newArr[idx] = text;
            return newArr;
        });
        setError(null);
        setCategoryLengthError(undefined);
    }

    const handleAddCategory = () => {
        if (tempCategoryArr.length === 6) {
            setKeyCatError((pre) => pre + 1);
            setCategoryLengthError("Can't add more than 6 categories");
            return;
        }

        setTempCategoryArr((pre) => [...pre, ""]);
        setError(null);
    }

    const formRef = useErrorNavigation(shakeKey);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-120 max-h-148 overflow-y-hidden rounded-[2rem] border-none p-0">

                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
                            {editedNote ? "Edit Note" : "Create New Note"}
                        </DialogTitle>
                    </DialogHeader>

                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="custom-scrollbar max-h-86 overflow-y-auto grid gap-6 p-4">
                            {/* Title Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                                    Note Title
                                </Label>
                                <div className="relative">
                                    <LayoutList className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="title"
                                        placeholder="e.g. Task 1 is a priority"
                                        className="pl-10 h-12"
                                        {...title.bind}
                                    />
                                </div>
                                <InputError key={shakeKey} message={error?.noteTitle?._errors?.[0]} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                                    Details
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Write more details about this note..."
                                    className="flex min-h-25 max-h-30 custom-scrollbar w-full rounded-xl px-4 py-3 text-sm"
                                    {...details.bind}
                                />
                                <InputError key={shakeKey} message={error?.noteDetails?._errors?.[0]} />
                            </div>

                            {/* Categories Row */}
                            <div className="grid grid-cols-1 gap-4">

                                <div className="flex flex-col justify-center gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                            Categories
                                        </Label>
                                        <div className="flex justify-center items-center gap-1">
                                            {
                                                tempCategoryArr && tempCategoryArr.length > 1 ?
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-400 dark:hover:bg-red-400 hover:text-white dark:hover:text-white"
                                                        onClick={() => {
                                                            setTempCategoryArr([""]);
                                                            setCategoryLengthError(undefined);
                                                        }}
                                                    >
                                                        <Trash />
                                                    </Button>
                                                    :
                                                    null
                                            }
                                            <Button
                                                type="button"
                                                size="sm"
                                                className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                                                onClick={() => {
                                                    handleAddCategory();
                                                }}
                                            >
                                                <Plus />
                                            </Button>
                                        </div>
                                    </div>
                                    <InputError key={keyCatError} message={categoryLengthError} />
                                </div>

                                <div className="grid gap-4">
                                    {
                                        tempCategoryArr?.map((cat, idx) => (
                                            <div className="relative" key={idx}>
                                                <Tags className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
                                                <Input
                                                    placeholder={`Category ${idx + 1}`}
                                                    className="pl-10 pr-14 h-12"
                                                    value={cat}
                                                    onChange={(e) => {
                                                        handleTempCategoryChange(e.target.value, idx);
                                                    }}
                                                />
                                                {
                                                    tempCategoryArr && tempCategoryArr.length > 1 ?
                                                        <Button
                                                            type="button"
                                                            className="bg-transparent dark:hover:bg-transparent hover:bg-transparent cursor-pointer absolute right-3 top-2 text-slate-300 dark:text-slate-400 dark:hover:text-destructive hover:text-destructive transition-colors"
                                                            onClick={() => {
                                                                removeTempCategory(idx)
                                                                setError(null);
                                                                setCategoryLengthError(undefined);
                                                            }}
                                                        >
                                                            <span className="text-lg"><X size={20} /></span>
                                                        </Button>
                                                        :
                                                        null
                                                }

                                                <InputError key={shakeKey + idx} message={error?.tempCategories?.[idx]?._errors?.[0]} />
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                        <DialogFooter className="mt-8">
                            <Button
                                onClick={handleSubmit}
                                className="w-full h-14 bg-slate-900 dark:bg-slate-700 dark:hover:bg-primary hover:bg-primary text-white dark:text-slate-200 font-bold rounded-2xl transition-all text-base"
                            >
                                {editedNote ? "Edit Note" : "Add a Note"}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent >
        </Dialog >
    );
}
export default NoteModal;
