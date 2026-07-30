import type z from "zod";
import type { noteSchema } from "@/features/notes/schemas/noteSchema";
import type { personalDetailsSchema } from "@/features/members/schemas/personalDetailsSchema";
import type { projectContributionSchema } from "@/features/members/schemas/projectContributionSchema";
import { tempLinksSchema, type skillsSocialsSchema, type tempStackSchema } from "@/features/members/schemas/skillsSocialsSchema";
import type { taskDetailsSchema } from "@/features/tasks/schemas/taskSchema";

export interface TodoObject {
    id: string;
    title: string;
    category: (string | undefined)[];
    isCompleted: boolean;
    createdAt: string;
    editedAt: string;
    edited?: boolean;
}

export interface todoState {
    todos: TodoObject[];
}

export interface noteObject {
    id: string;
    createdAt: string;
    edited?: boolean;
    title: string;
    description: string;
    category: string[];
}

export interface notesState {
    notes: noteObject[]
}

export interface TempPersonalDetails {
    name?: string,
    role?: string,
    email?: string,
    phone?: string,
}

export interface TempDescription {
    text?: string
}


export interface RatingObject {
    user: string,
    rate: number;
}

export interface MemberObject {
    id: string;
    personalDetails: TempPersonalDetails;
    description: TempDescription;
    projects: MemberProject[];
    skillsAndSocials: SkillsAndSocialsObject;
    rating: {
        avgRating: number | null,
        ratedBy: RatingObject[],
    },
    avatar: string;
    createdAt: Date;
}


export interface MemberProject {
    category: (string | undefined)[]
    id: string;
    title?: string;
    description?: string;
    sourceCode?: string;
    liveCode?: string;
}

export interface TempMemberProject extends MemberProject {
    errors: TempProjectError | null;
}

export interface LanguageObject {
    lang: string,
    level: string,
    id: string,
}

export interface TempStackAndLinksObject {
    tempStack: string[],
    tempLinks: string[],
}

export interface stackAndLinksObject {
    stack: string[],
    social: string[],
}

export interface SkillsAndSocialsObject {
    languages: LanguageObject[];
    stackAndLinks: stackAndLinksObject;
}

export interface TempSkillsAndSocialsObject {
    tempLanguages: LanguageObject[];
    tempStackAndLinks: TempStackAndLinksObject;
}


export interface MembersState {
    members: MemberObject[],
    storedEmails: string[],
    form: {
        tempProjects: TempMemberProject[],
        tempSkillsAndSocials: TempSkillsAndSocialsObject,

    },
    tempMember: MemberObject,
}

export interface addTodoError {
    title?: string[];
    category1?: string[];
    category2?: string[];
}

export interface editTodoError {
    title?: string[];
    category1?: string[];
    category2?: string[];
}

export type NoteError = z.inferFormattedError<typeof noteSchema>

export type PersonalDetailsError = z.inferFormattedError<typeof personalDetailsSchema>;

export type TempProjectError = z.inferFormattedError<typeof projectContributionSchema>;

export type SkillsAndSocialsError = z.inferFormattedError<typeof skillsSocialsSchema>

export type tempStackError = z.inferFormattedError<typeof tempStackSchema>;

export type LinksError = z.inferFormattedError<typeof tempLinksSchema>;

export type projectContributionError = z.inferFormattedError<typeof projectContributionSchema>;

export type TempProjectErrorData = {
    error: TempProjectError,
    projectIdx: number,
}

export interface InputErrorProps {
    message?: string;
    className?: string;
}

export interface NoDataProps {
    setAddOpen?: (open: boolean) => void,
    animationData?: any;
    message: string;
    image?: boolean;
    src?: string;
}

export interface ModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface deleteModalProps {
    open: boolean;
    deletedId: string | undefined;
    onOpenChange?: (open: boolean) => void;
}

export type ThemeType = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';


export interface taskByUserId {
    [userId: string]: string[];
}

export interface NestedCategory {
    projectIdx: number,
    catIdx: number
}

export interface taskDetailsObject {
    title: string,
    categories: string[],
    description: string,
    deadline: string,
}

export interface taskObject extends taskDetailsObject {
    id: string,
    progress: number,
    media: string[],
    associatedMembersIDs: string[],
    tasksByUserId: taskByUserId,
    createdAt: string;
    thumbnail: string;
}

export interface tasksState {
    tasks: taskObject[];
    tempTaskDetails: taskObject;
}

export type TaskError = z.inferFormattedError<typeof taskDetailsSchema>;