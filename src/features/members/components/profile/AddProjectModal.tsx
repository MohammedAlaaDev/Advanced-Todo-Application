import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Code2, Globe, Plus, Trash, X } from "lucide-react"
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { projectContributionSchema } from "@/features/members/schemas/projectContributionSchema"
import { nanoid } from "@reduxjs/toolkit"
import type { MemberProject, ProjectContributionError } from "@/features/members/types";
import { addMemberProject } from "@/features/members/membersSlice"
import { useDispatch } from "react-redux"
import InputError from "@/components/InputError"
import { useQueryParam, type QueryParam } from "@/hooks/useQueryParam"
import { useParams } from "react-router"
import { useValidate } from "@/hooks/useValidate"
import { useErrorNavigation } from "@/hooks/useErrorNavigation"
import type { PreventableEvent } from "@/types";

interface ValidationType {
  validate: (data: MemberProject, schema: typeof projectContributionSchema, onSuccess: () => void) => void;
  setError: Dispatch<SetStateAction<ProjectContributionError | null>>;
  error: ProjectContributionError | null;
  shakeKey: number;
}

const AddProjectModal = () => {

  const dispatch = useDispatch();

  const { id } = useParams();

  const { modalKey, closeModal, openModal } = useQueryParam() as QueryParam;

  const { validate, setError, error, shakeKey } = useValidate() as ValidationType;

  const open = modalKey === "add-project";
  const setOpen = (open: boolean) => {
    if (open) {
      openModal?.("add-project");
    } else {
      closeModal?.();
    }
  }

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [tempCategory, setTempCategory] = useState<string[]>([""]);
  const sourceCodeRef = useRef<HTMLInputElement | null>(null);
  const liveLinkRef = useRef<HTMLInputElement | null>(null);
  const formRef = useErrorNavigation(shakeKey);

  const titleError = error?.title?._errors[0];
  const descriptionError = error?.description?._errors[0];
  const sourceCodeError = error?.sourceCode?._errors[0];
  const liveCodeError = error?.liveCode?._errors[0];
  const categoryError = error?.category;

  useEffect(() => {
    setTempCategory([""]);
    if (error) {
      setError(null);
    }

    if (categoryLengthError) {
      setCategoryLengthError(undefined);
    }
  }, [open])

  const [categoryLengthError, setCategoryLengthError] = useState<string | undefined>(undefined);

  const handleRemoveAllCategories = () => {
    setTempCategory([""]);
  }

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAddCategoryRow = () => {
    if (tempCategory.length >= 6) {
      if (!categoryLengthError) {
        setCategoryLengthError("Max 6 categories.");
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCategoryLengthError(undefined);
      }, 2000);
      return;
    }
    setTempCategory((prev) => [...prev, ""]);
  };

  const handleRemoveCategoryRow = (idxToRemove: number) => {
    if (tempCategory.length <= 1) return;
    setTempCategory((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleCategoryChange = (idxToUpdate: number, value: string) => {

    if (error?.category) {
      setError((prev: ProjectContributionError | null) => {
        if (!prev) return prev;

        const updated = { ...prev, category: { _errors: [] } };
        return updated;
      });
    }

    setTempCategory((prev) => {
      const updated = [...prev];
      updated[idxToUpdate] = value;
      return updated;
    });
  };

  const handleAddProject = (e?: PreventableEvent) => {
    e?.preventDefault();

    const trimmedCategories = (tempCategory || [""]).map((c) => c.trim());

    const data = {
      id: nanoid(),
      title: titleRef.current?.value.trim() || "",
      description: descriptionRef.current?.value.trim() || "",
      sourceCode: sourceCodeRef.current?.value.trim() || "",
      liveCode: liveLinkRef.current?.value.trim() || "",
      category: trimmedCategories,
    };

    validate(data, projectContributionSchema, () => {
      data.category = data.category.filter((c) => c !== "");

      dispatch(addMemberProject({ memberId: id, project: data }));
      setOpen(false);
      setTempCategory([""]);
    })
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-full max-w-75 md:max-w-xl lg:max-w-2xl shadow-2xl max-h-148 p-2 md:p-6"
      >
        <form
          ref={formRef}
          className="flex flex-col justify-center gap-5"
          onSubmit={handleAddProject}>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Add a project
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar max-h-100 overflow-y-auto">

            <div className="rounded-lg relative border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title" placeholder="eg. Portfolio Website" ref={titleRef}
                />
                <InputError key={shakeKey} message={titleError} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="desc">Project Description (Optional)</Label>
                <Textarea id="desc"
                  placeholder="Briefly explain the project..."
                  className=" min-h-20 max-h-20"
                  ref={descriptionRef}
                />
                <InputError key={shakeKey} message={descriptionError} />
              </div>
              <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                  <div>
                    <Label>Project Category (Optional)</Label>
                    <InputError key={shakeKey} message={categoryLengthError} className="text-red-700! dark:text-red-100!" />
                  </div>
                  <div className="flex justify-center gap-2 items-center">
                    {
                      tempCategory.length > 1 &&
                      <Button
                        type="button"
                        size="sm"
                        className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-red-400 hover:bg-red-400 dark:hover:text-white hover:text-white"
                        onClick={() => {
                          handleRemoveAllCategories();
                        }}
                      >
                        <Trash />
                      </Button>
                    }
                    <Button
                      type="button"
                      size="sm"
                      className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                      onClick={() => {
                        handleAddCategoryRow();
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <div
                  className="mt-2 border-2 border-primary/50 border-dotted p-5 rounded-2xl flex flex-col justify-center gap-4">
                  {
                    tempCategory.map((cat, catIdx) => (
                      <div key={catIdx} className="relative">
                        <Input
                          placeholder={`Category ${catIdx + 1}`}
                          value={cat}
                          onChange={(e) => handleCategoryChange(catIdx, e.target.value)}
                        />
                        {
                          tempCategory.length > 1 &&
                          <Button
                            type="button"
                            className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 w-5 h-5 rounded-full"
                            onClick={() => handleRemoveCategoryRow(catIdx)}
                          >
                            <X className="h-2 w-2 text-white" />
                          </Button>
                        }
                        <InputError key={shakeKey} message={categoryError?.[catIdx]?._errors[0]} />
                      </div>
                    ))
                  }
                </div>

              </div>
              <div className="grid gap-1.5">
                <Label htmlFor={`source`}>Source Code Link (Optional)</Label>
                <div className="relative">
                  <Code2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`source`}
                    placeholder="https://github.com/..."
                    className="pl-10"
                    ref={sourceCodeRef}
                  />

                  <InputError key={shakeKey} message={sourceCodeError} />

                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor={`link`}>Live Link (Optional)</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`link`}
                    placeholder="https://project.com"
                    className="pl-10 "
                    ref={liveLinkRef}
                  />
                  <InputError key={shakeKey} message={liveCodeError} />
                </div>
              </div>
            </div>
            <button type="submit" className="hidden" />
          </div>

        </form>
        <DialogFooter className="flex justify-end items-center">
          <Button onClick={handleAddProject}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export default AddProjectModal