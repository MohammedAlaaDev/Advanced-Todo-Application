import type { RootState } from "@/app/store";
import type {
    LanguageObject,
    MemberProject,
    MemberObject,
    MembersState,
    NestedCategory,
    SkillsAndSocialsObject,
    TempPersonalDetails,
    TempProjectErrorData,
    ChangeInputData,
    MemberContactUpdate,
    MemberDescriptionUpdate,
    MemberProjectsUpdate,
    MemberSkillsUpdate
} from "@/features/members/types";
import { createEntityAdapter, createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { DescriptionType } from "@/features/members/schemas/descriptionSchema";

const membersAdapter = createEntityAdapter<MemberObject>();

const initialState: MembersState = membersAdapter.getInitialState({
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
});

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
            membersAdapter.addOne(state, newMember);
        },
        deleteMember: (state: MembersState, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!id) return;
            const member = state.entities[id];
            membersAdapter.removeOne(state, id);
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
        editNameAndRole: (state: MembersState, action: PayloadAction<{ id: string, data: TempPersonalDetails }>) => {
            const { id, data } = action.payload;

            if (!id) return;

            membersAdapter.updateOne(state, {
                id,
                changes: {
                    personalDetails:data,
                }
            })

        },
        editDescription: (state: MembersState, action: PayloadAction<MemberDescriptionUpdate>) => {
            const { id, description } = action.payload;
            membersAdapter.updateOne(state, { id, changes: { description } });

        },
        editEmail: (state: MembersState, action: PayloadAction<MemberContactUpdate>) => {
            const { id, personalDetails } = action.payload;
            const member = state.entities[id];
            const oldEmail = member.personalDetails.email;
            membersAdapter.updateOne(state, { id, changes: { personalDetails } });
            const emailIdx = state.stored.storedEmails.findIndex((em) => em === oldEmail);
            if (emailIdx !== -1) {
                state.stored.storedEmails[emailIdx] = personalDetails.email;
            }
        },
        editPhone: (state: MembersState, action: PayloadAction<MemberContactUpdate>) => {
            const { id, personalDetails } = action.payload;
            const member = state.entities[id];
            const oldPhone = member?.personalDetails.phone;
            membersAdapter.updateOne(state, { id, changes: { personalDetails } });

            const phoneIdx = state.stored.storedPhoneNumbers.findIndex((num) => num === oldPhone);
            if (phoneIdx !== -1) {
                if (!personalDetails.phone) {
                    state.stored.storedPhoneNumbers.splice(phoneIdx, 1);
                } else {
                    state.stored.storedPhoneNumbers[phoneIdx] = personalDetails.phone || "";
                }
            }

            if (!oldPhone && personalDetails.phone) {
                state.stored.storedPhoneNumbers.push(personalDetails.phone);
            }

        },
        editSkills: (state: MembersState, action: PayloadAction<MemberSkillsUpdate>) => {
            const { id, skillsAndSocials } = action.payload;
            membersAdapter.updateOne(state, { id, changes: { skillsAndSocials } });
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
        updateMemberLanguages: (state: MembersState, action: PayloadAction<MemberSkillsUpdate>) => {
            const { id, skillsAndSocials } = action.payload;
            membersAdapter.updateOne(state, { id, changes: { skillsAndSocials } });
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
        updateTempLink: (state: MembersState, action: PayloadAction<{ idx: number, text: string }>) => {
            const { idx, text } = action.payload;
            state.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks[idx] = text;
        },
        updateMemberLinks: (state: MembersState, action: PayloadAction<MemberSkillsUpdate>) => {
            const { id, skillsAndSocials } = action.payload;
            membersAdapter.updateOne(state, {
                id,
                changes: { skillsAndSocials },
            });
        },
        editMemberProject: (state: MembersState, action: PayloadAction<MemberProjectsUpdate>) => {
            const { projects, memberId } = action.payload;
            membersAdapter.updateOne(state, { id: memberId, changes: { projects } });
        },
        deleteAllMemberProjects: (state: MembersState, action: PayloadAction<MemberProjectsUpdate>) => {
            const { memberId, projects } = action.payload;
            membersAdapter.updateOne(state, { id: memberId, changes: { projects } });
        },
        addMemberProject: (state: MembersState, action: PayloadAction<MemberProjectsUpdate>) => {
            const { memberId, projects } = action.payload;
            membersAdapter.updateOne(state, { id: memberId, changes: { projects } });
        },
        deleteMemberProject: (state: MembersState, action: PayloadAction<MemberProjectsUpdate>) => {
            const { memberId, projects } = action.payload;
            membersAdapter.updateOne(state, { id: memberId, changes: { projects } });
        },
        addMemberImage: (state: MembersState, action: PayloadAction<{ chosenImage: string }>) => {
            const { chosenImage } = action.payload;
            state.tempMember.avatar = chosenImage;
        },
        editMemberImage: (state: MembersState, action: PayloadAction<{ memberId: string, chosenImage: string }>) => {
            const { memberId, chosenImage } = action.payload;
            membersAdapter.updateOne(state, { id: memberId, changes: { avatar: chosenImage } });
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
export const {
    selectAll: selectMembersArr,
    selectById: selectMember,
    selectEntities: selectMembersEntities,
    selectIds: selectMembersIds,
    selectTotal: selectMembersCount,
} = membersAdapter.getSelectors((state: RootState) => state.members);
export const selectTempProjects = (state: RootState) => state.members.form.tempProjects;
export const selectTempLangs = (state: RootState) => state.members.form.tempSkillsAndSocials.tempLanguages;
export const selectTempStack = (state: RootState) => state.members.form.tempSkillsAndSocials.tempStackAndLinks.tempStack;
export const selectTempLinks = (state: RootState) => state.members.form.tempSkillsAndSocials.tempStackAndLinks.tempLinks;
export const selectPersonalDetails = (state: RootState) => state.members.tempMember.personalDetails;
export const selectDescription = (state: RootState) => state.members.tempMember.description;
export const selectLanguages = (state: RootState) => state.members.form.tempSkillsAndSocials.tempLanguages;
export default membersSlice.reducer;