import type { RootState } from "@/app/store";
import type {
    LanguageObject,
    MemberProject,
    MembersState,
    NestedCategory,
    SkillsAndSocialsObject,
    TempPersonalDetails,
    TempProjectErrorData
} from "@/features/members/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { DescriptionType } from "@/features/members/schemas/descriptionSchema";
import type { updateLinkProps } from "@/features/members/components/MemberModal/SkillsAndSocials";

const initialState: MembersState = {
    members: [],
    stored: {
        storedEmails: [],
        storedPhoneNumbers: [],
    },
    form: {
        tempProjects: [
            {
                id: nanoid(),
                category: [""],
                title: "",
                description: "",
                sourceCode: "",
                liveCode: "",
                errors: null,
            }
        ],
        tempSkillsAndSocials: {
            tempLanguages: [{ lang: "", level: "", id: nanoid() }],
            tempStackAndLinks: {
                tempStack: [""],
                tempLinks: [""],
            }
        }
    },
    tempMember: {
        id: nanoid(),
        personalDetails: {
            name: "",
            role: "",
            email: "",
            phone: "",
        },
        description: {
            text: "",
        },
        projects: [],
        skillsAndSocials: {
            languages: [],
            stackAndLinks: {
                stack: [],
                social: [],
            }
        },
        rating: {
            avgRating: 0,
            ratedBy: [],
        },
        avatar: "",
        createdAt: new Date(),
    },
}

export interface ChangeInputData {
    text: string;
    projectIdx: number;
    catIdx?: number;
}

const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        addMember: (state: MembersState, action: PayloadAction<SkillsAndSocialsObject>) => {
            const fillMemberData = () => {
                // fill the skills and socials object
                const newSkillsAndSocials = { ...action.payload };
                state.tempMember.skillsAndSocials = { ...newSkillsAndSocials };
                state.tempMember.id = nanoid();

                // fill the projects object
                const projects = state.form.tempProjects;
                state.tempMember.projects = [...projects];
                if (!state.tempMember.avatar) {
                    state.tempMember.avatar = `/assets/members/userDummy.webp`;
                }
                state.tempMember.createdAt = new Date();
            }
            fillMemberData();

            const email = state.tempMember.personalDetails.email;
            const phone = state.tempMember.personalDetails.phone;
            if (email) {
                state.stored.storedEmails.push(email);
            }

            if (phone) {
                state.stored.storedPhoneNumbers.push(phone);
            }

            // add a real member
            const newMember = { ...state.tempMember };
            state.members.push(newMember);
        },
        deleteMember: (state: MembersState, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!id) return;
            const member = state.members.find((mem) => mem.id === id);
            state.members = state.members.filter((mem) => mem.id !== member?.id);
            if (member) {
                const email = member.personalDetails.email;
                const emailIdx = state.stored.storedEmails.findIndex((em) => em === email);

                const phone = member.personalDetails.phone;
                const phoneIdx = state.stored.storedPhoneNumbers.findIndex((num) => num === phone);

                if (emailIdx !== -1) {
                    state.stored.storedEmails.splice(emailIdx, 1);
                }

                if (phoneIdx !== -1) {
                    state.stored.storedPhoneNumbers.splice(phoneIdx, 1);
                }

            }
        },
        editNameAndRole: (state: MembersState, action: PayloadAction<{ id: string, data: { name: string, role: string } }>) => {
            const { id, data } = action.payload;

            const member = state.members.find((mem) => mem.id === id);
            if (member) {
                member.personalDetails.name = data.name;
                member.personalDetails.role = data.role;
            }
        },
        editDescription: (state: MembersState, action: PayloadAction<{ id: string | undefined, data: { text: string | undefined } }>) => {
            const { id, data } = action.payload;
            const member = state.members.find((mem) => mem.id === id);
            if (member) {
                member.description.text = data.text;
            }

        },
        editEmail: (state: MembersState, action: PayloadAction<{ id: string | undefined, data: { email: string | undefined } }>) => {
            const { id, data } = action.payload;
            if (!id || !data.email) return;
            const member = state.members.find((mem) => mem.id === id);
            const oldEmail = member?.personalDetails.email;
            const newEmail = data.email;
            if (member) {
                member.personalDetails.email = newEmail;
            }
            const emailIdx = state.stored.storedEmails.findIndex((em) => em === oldEmail);
            if (emailIdx !== -1) {
                state.stored.storedEmails[emailIdx] = newEmail;
            }
        },
        editPhone: (state: MembersState, action: PayloadAction<{ id: string | undefined, data: { phone: string } }>) => {
            const { id, data } = action.payload;
            if (!id) return;
            const member = state.members.find((mem) => mem.id === id);
            const oldPhone = member?.personalDetails.phone;
            const newPhone = data.phone;

            if (member) {
                member.personalDetails.phone = newPhone;
            }

            const phoneIdx = state.stored.storedPhoneNumbers.findIndex((num) => num === oldPhone);
            if (phoneIdx !== -1) {
                if (!newPhone) {
                    state.stored.storedPhoneNumbers.splice(phoneIdx, 1);
                } else {
                    state.stored.storedPhoneNumbers[phoneIdx] = newPhone;
                }
            }

            if (!oldPhone && newPhone) {
                state.stored.storedPhoneNumbers.push(newPhone);
            }

        },
        editSkills: (state: MembersState, action: PayloadAction<{ id: string | undefined, tempstack: string[] }>) => {
            const { id, tempstack } = action.payload;
            const member = state.members.find((mem) => mem.id === id);
            if (member) {
                member.skillsAndSocials.stackAndLinks.stack = tempstack;
            }
        },
        resetAllTemps: (state: MembersState) => {
            const newForm = {
                tempProjects: [
                    {
                        id: nanoid(),
                        category: [""],
                        title: "",
                        description: "",
                        sourceCode: "",
                        liveCode: "",
                        errors: null,
                    }
                ],
                tempSkillsAndSocials: {
                    tempLanguages: [{ lang: "", level: "", id: nanoid() }],
                    tempStackAndLinks: {
                        tempStack: [""],
                        tempLinks: [""],
                    }
                }
            }
            const newTempMember = {
                id: nanoid(),
                personalDetails: {
                    name: "",
                    role: "",
                    email: "",
                    phone: "",
                },
                description: {
                    text: "",
                },
                projects: [],
                skillsAndSocials: {
                    languages: [],
                    stackAndLinks: {
                        stack: [],
                        social: [],
                    }
                },
                rating: {
                    avgRating: 0,
                    ratedBy: [],
                },
                avatar: "",
                createdAt: new Date(),
            }
            state.form = newForm;
            state.tempMember = newTempMember;
        },
        addTempProject: (state: MembersState) => {
            const emptyProject = {
                id: nanoid(),
                category: [""],
                title: "",
                description: "",
                sourceCode: "",
                liveCode: "",
                errors: null,
            };
            state.form.tempProjects.push(emptyProject);
        },
        removeAllTempProjects: (state: MembersState) => {

            const emptyProject = { ...initialState.form.tempProjects[0] };

            state.form.tempProjects = [emptyProject];
        },
        addTempProjectCategory: (state: MembersState, action: PayloadAction<number>) => {
            const chosenProject = state.form.tempProjects[action.payload];
            chosenProject?.category.push("");
        },
        removeTempProjectCategory: (state: MembersState, action: PayloadAction<NestedCategory>) => {
            const { projectIdx, catIdx } = action.payload;
            const chosenProject = state.form.tempProjects[projectIdx];
            chosenProject?.category.splice(catIdx, 1);
        },
        removeAllTempProjectCategory: (state: MembersState, action: PayloadAction<number>) => {
            const chosenProject = state.form.tempProjects[action.payload];
            chosenProject.category = [""];
        },
        resetProjectCategoryErrors: (state: MembersState, action: PayloadAction<number>) => {
            const chosenProject = state.form.tempProjects[action.payload];
            if (chosenProject.errors) {
                chosenProject.errors.category = undefined;
            }
        },
        removeTempProject: (state: MembersState, action: PayloadAction<number>) => {
            state.form.tempProjects.splice(action.payload, 1);
        },
        addTempPersonalDetails: (state: MembersState, action: PayloadAction<TempPersonalDetails>) => {
            const personalDetails = action.payload;
            const currentPersonalDetails = state.tempMember.personalDetails;
            if (personalDetails) {
                currentPersonalDetails.name = personalDetails.name
                currentPersonalDetails.role = personalDetails.role
                currentPersonalDetails.email = personalDetails.email
                currentPersonalDetails.phone = personalDetails.phone
            }
        },
        addTempDescription: (state: MembersState, action: PayloadAction<DescriptionType>) => {
            const description = action.payload;
            const currentDescription = state.tempMember.description;
            if (description) {
                currentDescription.text = description.text;
            }
        },
        changeProjectTitle: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            updatedProject.title = text;
        },
        changeProjectDescription: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            updatedProject.description = text;
        },
        changeProjectSourceCode: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            updatedProject.sourceCode = text;
        },
        changeProjectLiveCode: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            updatedProject.liveCode = text;
        },
        changeTempProjectCategory: (state: MembersState, action: PayloadAction<ChangeInputData>) => {
            const { text, projectIdx, catIdx } = action.payload;
            const updatedProject = state.form.tempProjects[projectIdx];
            if (catIdx !== undefined) {
                updatedProject.category[catIdx] = text;
            }
        },
        addTempError: (state: MembersState, action: PayloadAction<TempProjectErrorData>) => {
            const { error, projectIdx } = action.payload;
            const erroredProject = state.form.tempProjects[projectIdx];
            erroredProject.errors = { ...error };
        },
        removeTempError: (state: MembersState, action: PayloadAction<number>) => {
            const projectIdx = action.payload;
            const chosenProject = state.form.tempProjects[projectIdx];
            chosenProject.errors = null;
        },
        addTempMemberProjects: (state: MembersState, action: PayloadAction<MemberProject[]>) => {
            state.tempMember.projects = [...action.payload]
        },
        resetAllErrors: (state: MembersState) => {
            state.form.tempProjects.map((project) => {
                project.errors = null;
            })
        },
        updateLanguageText: (state: MembersState, action: PayloadAction<{ language: string, id: string }>) => {
            const { language, id } = action.payload;
            const languagesArr = state.form.tempSkillsAndSocials.tempLanguages;
            const chosenRow = languagesArr.find((row) => row.id === id);
            if (chosenRow) {
                chosenRow.lang = language;
            }
        },
        updateLanguageLevel: (state: MembersState, action: PayloadAction<{ level: string, id: string }>) => {
            const { level, id } = action.payload;
            const languagesArr = state.form.tempSkillsAndSocials.tempLanguages;
            const chosenRow = languagesArr.find((row) => row.id === id);
            if (chosenRow) {
                chosenRow.level = level;
            }
        },
        updateMemberLanguages: (state: MembersState, action: PayloadAction<{ id: string | undefined, langs: LanguageObject[] }>) => {
            const { id, langs } = action.payload;

            const member = state.members.find((mem) => mem.id === id);
            if (member) {
                member.skillsAndSocials.languages = [...langs];
            }
        },
        addLanguageObject: (state: MembersState) => {
            const languagesArr = state.form.tempSkillsAndSocials.tempLanguages;

            if (languagesArr.length < 4) {
                const emptyLanguageObject = { lang: "", level: "", id: nanoid() };
                languagesArr.push(emptyLanguageObject);
            }
        },
        fillLanguagesArr: (state: MembersState, action: PayloadAction<LanguageObject[]>) => {
            const passedLanguagesArr = action.payload;
            state.form.tempSkillsAndSocials.tempLanguages = [...passedLanguagesArr];
            if (passedLanguagesArr.length < 4) {
                const emptyLanguageObject = { lang: "", level: "", id: nanoid() };
                state.form.tempSkillsAndSocials.tempLanguages.push(emptyLanguageObject);
            }
        },
        resetTempLangs: (state: MembersState) => {
            state.form.tempSkillsAndSocials.tempLanguages = [{ lang: "", level: "", id: nanoid() }];
        },
        removeLanguageRow: (state: MembersState, action: PayloadAction<string>) => {
            const id = action.payload;
            const languagesArr = state.form.tempSkillsAndSocials.tempLanguages;
            const chosenRow = languagesArr.find((row) => row.id === id);
            if (chosenRow) {
                const idx = languagesArr.indexOf(chosenRow);
                languagesArr.splice(idx, 1);
                const isFull = languagesArr.find((row) => row.lang === "" || row.level === "") === undefined;
                if (languagesArr.length === 3 && isFull) {
                    const emptyLanguageObject = { lang: "", level: "", id: nanoid() };
                    languagesArr.push(emptyLanguageObject);
                }
            }
        },
        addTempStack: (state: MembersState) => {
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempStack.push("");
        },
        removeTempStack: (state: MembersState, action: PayloadAction<number>) => {
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempStack.splice(action.payload, 1);
        },
        updateTempStack: (state: MembersState, action: PayloadAction<{ idx: number, text: string }>) => {
            const { idx, text } = action.payload;
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempStack[idx] = text;
        },
        addTempLink: (state: MembersState) => {
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks.push("");
        },
        removeTempLink: (state: MembersState, action: PayloadAction<number>) => {
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks.splice(action.payload, 1);
        },
        updateTempLink: (state: MembersState, action: PayloadAction<updateLinkProps>) => {
            const { idx, text } = action.payload;
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks[idx] = text;
        },
        updateMemberLinks: (state: MembersState, action: PayloadAction<{ id: string | undefined, links: string[] | undefined }>) => {
            const { id, links } = action.payload;
            const member = state.members.find((mem) => mem.id === id);
            if (member && links) {
                if (links.length === 0) {
                    member.skillsAndSocials.stackAndLinks.social = [""];
                } else {
                    member.skillsAndSocials.stackAndLinks.social = [...links];
                }
            }
        },
        editMemberProject: (state: MembersState, action: PayloadAction<{ data: MemberProject, memberId: string | undefined }>) => {
            const { data, memberId } = action.payload;
            const member = state.members.find((mem) => (mem.id === memberId));
            const chosenProject = member?.projects.find((proj) => proj.id === data.id);
            if (chosenProject) {
                chosenProject.category = data.category;
                chosenProject.description = data.description;
                chosenProject.liveCode = data.liveCode;
                chosenProject.sourceCode = data.sourceCode;
                chosenProject.title = data.title;
            }
        },
        deleteAllMemberProjects: (state: MembersState, action: PayloadAction<string | undefined>) => {
            const memberId = action.payload;
            if (!memberId) return;

            const member = state.members.find((mem) => mem.id === memberId);
            if (member) {
                member.projects = [];
            }
        },
        addMemberProject: (state: MembersState, action: PayloadAction<{ memberId: string | undefined, project: MemberProject }>) => {
            const { memberId, project } = action.payload;
            if (!memberId) return;

            const member = state.members.find((mem) => mem.id === memberId);
            if (member) {
                member.projects.push(project);
            }
        },
        deleteMemberProject: (state: MembersState, action: PayloadAction<{ memberId: string | undefined, projectId: string | undefined }>) => {
            const { memberId, projectId } = action.payload;
            const member = state.members.find((mem) => mem.id === memberId);
            if (member) {
                const chosenProjectIdx = member.projects.findIndex((proj) => proj.id === projectId);
                if (chosenProjectIdx !== -1) {
                    member.projects.splice(chosenProjectIdx, 1);
                }
            }
        },
        addMemberImage: (state: MembersState, action: PayloadAction<{ chosenImage: string }>) => {
            const { chosenImage } = action.payload;
            state.tempMember.avatar = chosenImage;
        },
        editMemberImage: (state: MembersState, action: PayloadAction<{ memberId: string | undefined, chosenImage: string }>) => {
            const { memberId, chosenImage } = action.payload;
            const member = state.members.find((mem) => mem.id === memberId);
            if (member) {
                member.avatar = chosenImage;
            }
        }
    }
})

export const {
    addMember,
    deleteMember,
    editNameAndRole,
    editDescription,
    editEmail,
    editPhone,
    editSkills,
    addTempProject,
    removeTempProject,
    removeAllTempProjects,
    addTempPersonalDetails,
    addTempDescription,
    resetAllTemps,
    addTempProjectCategory,
    removeTempProjectCategory,
    resetProjectCategoryErrors,
    changeProjectTitle,
    changeProjectDescription,
    changeProjectSourceCode,
    changeProjectLiveCode,
    changeTempProjectCategory,
    addTempError,
    removeTempError,
    addTempMemberProjects,
    removeAllTempProjectCategory,
    resetAllErrors,
    updateLanguageText,
    updateLanguageLevel,
    updateMemberLanguages,
    addLanguageObject,
    fillLanguagesArr,
    resetTempLangs,
    removeLanguageRow,
    addTempStack,
    removeTempStack,
    updateTempStack,
    addTempLink,
    removeTempLink,
    updateTempLink,
    updateMemberLinks,
    editMemberProject,
    deleteAllMemberProjects,
    addMemberProject,
    deleteMemberProject,
    addMemberImage,
    editMemberImage,
} = membersSlice.actions;
export const selectStored = (state: RootState) => state.members.stored;
export const selectMembers = (state: RootState) => state.members.members;
export const selectTempProjects = (state: RootState) => state.members.form.tempProjects;
export const selectTempLangs = (state: RootState) => state.members.form.tempSkillsAndSocials.tempLanguages;
export const selectTempStack = (state: RootState) => state.members.form.tempSkillsAndSocials.tempStackAndLinks.tempStack;
export const selectTempLinks = (state: RootState) => state.members.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks;
export const selectPersonalDetails = (state: RootState) => state.members.tempMember.personalDetails;
export const selectDescription = (state: RootState) => state.members.tempMember.description;
export const selectLanguages = (state: RootState) => state.members.form.tempSkillsAndSocials.tempLanguages;
export default membersSlice.reducer;