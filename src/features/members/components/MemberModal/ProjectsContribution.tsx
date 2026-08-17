import InputError from "@/components/InputError"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    addTempError,
    addTempMemberProjects,
    addTempProjectCategory,
    changeProjectDescription,
    changeProjectLiveCode,
    changeProjectSourceCode,
    changeProjectTitle,
    changeTempProjectCategory,
    removeAllTempProjectCategory,
    removeTempError,
    removeTempProject,
    removeTempProjectCategory,
    resetProjectCategoryErrors,
    selectTempProjects
} from "@/features/members/membersSlice"
import { projectContributionSchema } from "@/features/members/schemas/projectContributionSchema"
import { useErrorNavigation } from "@/hooks/useErrorNavigation"
import { Code2, Globe, Plus, Trash, X } from "lucide-react"
import { forwardRef, useImperativeHandle, useState, type Ref } from "react"
import { useDispatch, useSelector } from "react-redux"

export interface ProjectsContributionRef {
    handleStep: () => boolean;
}

const ProjectsContribution = ({ }, ref: Ref<ProjectsContributionRef>) => {


    const tempProjects = useSelector(selectTempProjects);

    const [renderKey, setRenderKey] = useState<number>(0);

    const dispatch = useDispatch();

    const handleStep = () => {
        let allValid = true;

        const trimmedProjects = tempProjects.map((project) => ({
            ...project,
            title: project.title?.trim(),
            description: project.description?.trim(),
            sourceCode: project.sourceCode?.trim(),
            liveCode: project.liveCode?.trim(),
            category: project.category?.map((cat) => cat?.trim()),
        }));

        trimmedProjects.forEach((project, projectIdx) => {
            const validationResult = projectContributionSchema.safeParse(project);

            if (!validationResult.success) {
                const error = validationResult.error.format();
                const data = { error, projectIdx };
                allValid = false;
                setRenderKey(pre => pre + 1);
                if (error) {
                    dispatch(addTempError(data));
                }
                return;
            }

            dispatch(removeTempError(projectIdx));

        })

        if (allValid) {
            const result = trimmedProjects.map((project) => {
                const newProject = { ...project };
                newProject.category = newProject.category.filter((cat) => cat !== "");
                return newProject;
            })
            dispatch(addTempMemberProjects(result));
            return true;
        } else {
            return false;
        }

    }

    useImperativeHandle(ref, () => ({
        handleStep,
    }))

    useErrorNavigation(renderKey);

    return (
        <div className="flex flex-col justify-center gap-10 temp-projects">
            {
                tempProjects.map((project, projectIdx) => (
                    <div key={project.id} className="rounded-lg relative border-2 border-dashed border-primary/50 bg-primary/10 p-4 space-y-4">
                        {
                            tempProjects.length > 1 &&
                            <Button
                                onClick={() => {
                                    dispatch(removeTempProject(projectIdx));
                                }}
                                className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 w-8 h-8 rounded-full">
                                <X className="h-4 w-4 text-white" />
                            </Button>
                        }
                        <div className="grid gap-1.5">
                            <Label htmlFor={`p${projectIdx}-title`}>Project Title</Label>
                            <Input
                                onChange={(e) => {
                                    const data = { text: e.target.value, projectIdx }
                                    dispatch(changeProjectTitle(data));
                                }}
                                value={project.title}
                                id={`p${projectIdx}-title`} placeholder="Portfolio Website"
                            />
                            <InputError key={project.id + renderKey} message={project.errors?.title?._errors[0]} />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor={`p${projectIdx}-desc`}>Project Description (Optional)</Label>
                            <Textarea id={`p${projectIdx}-desc`}
                                placeholder="Briefly explain the project..."
                                className=" min-h-20 max-h-20"
                                onChange={(e) => {
                                    const data = { text: e.target.value, projectIdx }
                                    dispatch(changeProjectDescription(data));
                                }}
                                value={project.description}
                            />
                            <InputError key={project.id + renderKey} message={project.errors?.description?._errors[0]} />
                        </div>
                        <div className="grid gap-1.5">
                            <div className="flex justify-between items-center">
                                <Label>Project Category (Optional)</Label>
                                <div className="flex justify-center gap-2 items-center">
                                    {
                                        project.category.length > 1 &&
                                        <Button
                                            size="sm"
                                            className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-red-400 hover:bg-red-400 dark:hover:text-white hover:text-white"
                                            onClick={() => {
                                                dispatch(removeAllTempProjectCategory(projectIdx));
                                                dispatch(resetProjectCategoryErrors(projectIdx));
                                            }}
                                        >
                                            <Trash />
                                        </Button>
                                    }
                                    {
                                        project.category.length < 6 &&
                                        <Button
                                            size="sm"
                                            className="h-6 w-6 rounded-full p-0 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-primary hover:bg-primary dark:hover:text-white hover:text-white"
                                            onClick={() => {
                                                dispatch(addTempProjectCategory(projectIdx));
                                            }}
                                        >
                                            <Plus />
                                        </Button>
                                    }
                                </div>
                            </div>
                            <div
                                className="mt-2 border-2 border-primary/50 border-dotted p-5 rounded-2xl flex flex-col justify-center gap-4">
                                {
                                    project.category.map((cat, catIdx) => (
                                        <div key={catIdx} className="relative">
                                            <Input
                                                value={cat}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    const info = { text, projectIdx, catIdx };
                                                    dispatch(changeTempProjectCategory(info));
                                                }}
                                                placeholder={`Category ${catIdx + 1}`} />
                                            {
                                                project.category.length > 1 &&
                                                <Button
                                                    onClick={() => {
                                                        const data = { projectIdx: projectIdx, catIdx: catIdx };
                                                        dispatch(removeTempProjectCategory(data));
                                                        dispatch(resetProjectCategoryErrors(projectIdx));
                                                    }}
                                                    className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 w-5 h-5 rounded-full">

                                                    <X className="h-2 w-2 text-white" />
                                                </Button>
                                            }
                                            <InputError key={project.id + renderKey} message={project.errors?.category?.[catIdx]?._errors[0]} />
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor={`p${projectIdx}-source`}>Source Code Link (Optional)</Label>
                            <div className="relative">
                                <Code2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    onChange={(e) => {
                                        const data = { text: e.target.value, projectIdx }
                                        dispatch(changeProjectSourceCode(data));
                                    }}
                                    value={project.sourceCode}
                                    id={`p${projectIdx}-source`}
                                    placeholder="https://github.com/..."
                                    className="pl-10" />
                                <InputError key={project.id + renderKey} message={project.errors?.sourceCode?._errors[0]} />

                            </div>
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor={`p${projectIdx}-link`}>Live Link (Optional)</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    onChange={(e) => {
                                        const data = { text: e.target.value, projectIdx }
                                        dispatch(changeProjectLiveCode(data));
                                    }}
                                    value={project.liveCode}
                                    id={`p${projectIdx}-link`}
                                    placeholder="https://project.com"
                                    className="pl-10 " />
                                <InputError key={project.id + renderKey} message={project.errors?.liveCode?._errors[0]} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

ProjectsContribution.displayName = "ProjectsContribution";

export default forwardRef(ProjectsContribution);