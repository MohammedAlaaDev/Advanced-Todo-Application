import type z from "zod";
import type { emailSchema, personalDetailsSchema, phoneSchema } from "@/features/members/schemas/personalDetailsSchema";
import type { projectContributionSchema } from "@/features/members/schemas/projectContributionSchema";
import { tempLinksSchema, type skillsSocialsSchema, type tempStackSchema } from "@/features/members/schemas/skillsSocialsSchema";
import { descriptionSchema } from "@/features/members/schemas/descriptionSchema";
import type { EntityState } from "@reduxjs/toolkit";

// ==========================================
// Members Types
// ==========================================
export interface TempPersonalDetails {
    name: string,
    role: string,
    email: string,
    phone?: string,
}

export interface TempDescription {
    text?: string
}

export interface RatingObject {
    user: string,
    rate: number;
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

export interface StackAndLinksObject {
    stack: string[],
    social: string[],
}

export interface SkillsAndSocialsObject {
    languages: LanguageObject[];
    stackAndLinks: StackAndLinksObject;
}

export interface TempSkillsAndSocialsObject {
    tempLanguages: LanguageObject[];
    tempStackAndLinks: TempStackAndLinksObject;
}

export interface MemberObject {
    id: string;
    personalDetails: TempPersonalDetails;
    description: TempDescription;
    projects: MemberProject[];
    skillsAndSocials: SkillsAndSocialsObject;
    rating: {
        avgRating: number,
        ratedBy: RatingObject[],
    },
    avatar: string;
    createdAt: Date;
}

export interface MembersState extends EntityState<MemberObject, string> {
    stored: {
        storedEmails: string[],
        storedPhoneNumbers: string[],
    },
    form: {
        tempProjects: TempMemberProject[],
        tempSkillsAndSocials: TempSkillsAndSocialsObject,
    },
    tempMember: MemberObject,
}

export interface NestedCategory {
    projectIdx: number,
    catIdx: number
}

export interface ChangeInputData {
    text: string;
    projectIdx: number;
    catIdx?: number;
}

export interface UpdateLinkProps {
    idx: number;
    text: string;
}

export interface MemberDescriptionUpdate {
    id: string;
    description: TempDescription;
}

export interface MemberContactUpdate {
    id: string;
    personalDetails: TempPersonalDetails;
}

export interface MemberSkillsUpdate {
    id: string;
    skillsAndSocials: SkillsAndSocialsObject;
}

export interface MemberProjectsUpdate {
    memberId: string;
    projects: MemberProject[];
}

// ==========================================
// Members Form Errors
// ==========================================
export type PersonalDetailsError = z.inferFormattedError<typeof personalDetailsSchema>;
export type MemberEmailError = z.inferFormattedError<typeof emailSchema>;
export type MemberPhoneError = z.inferFormattedError<typeof phoneSchema>;
export type DescriptionError = z.inferFormattedError<typeof descriptionSchema>;
export type TempProjectError = z.inferFormattedError<typeof projectContributionSchema>;
export type SkillsAndSocialsError = z.inferFormattedError<typeof skillsSocialsSchema>
export type TempStackError = z.inferFormattedError<typeof tempStackSchema>;
export type LinksError = z.inferFormattedError<typeof tempLinksSchema>;
export type ProjectContributionError = z.inferFormattedError<typeof projectContributionSchema>;

export type TempProjectErrorData = {
    error: TempProjectError,
    projectIdx: number,
}