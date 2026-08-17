import type { RootState } from "@/app/store";
import type { taskDetailsObject, tasksState } from "@/features/tasks/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

const initialState: tasksState = {
    tasks: [],
    tempTaskDetails: {
        id: nanoid(),
        progress: 0,
        title: "",
        categories: [""],
        description: "",
        deadline: "",
        associatedMembersIDs: [],
        media: [""],
        thumbnail: "",
        tasksByUserId: {},
        createdAt: "",
    },
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTempTaskDetails: (state: tasksState, action: PayloadAction<{ data: taskDetailsObject }>) => {
            const { data } = action.payload;
            if (data.categories.length === 0) {
                data.categories.push("");
            }
            if (data) {
                state.tempTaskDetails = {
                    ...state.tempTaskDetails,
                    ...data,
                }
            }
        },
        resetTempTask: (state: tasksState) => {
            state.tempTaskDetails = {
                id: nanoid(),
                progress: 0,
                title: "",
                categories: [""],
                description: "",
                deadline: "",
                associatedMembersIDs: [],
                media: [""],
                tasksByUserId: {},
                createdAt: "",
                thumbnail: "",
            };
        },
        addAssociatedMembers: (state: tasksState, action: PayloadAction<{ selected: string[] }>) => {
            const { selected } = action.payload;
            state.tempTaskDetails.associatedMembersIDs = [...selected];
        },
        deleteTask: (state: tasksState, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        addNewTask: (state: tasksState) => {
            state.tempTaskDetails.createdAt = new Date().toISOString();
            const associatedMembersIDs = [...state.tempTaskDetails.associatedMembersIDs];

            associatedMembersIDs.forEach((id: string) => {
                state.tempTaskDetails.tasksByUserId[id] = [];
            })

            state.tasks.push({ ...state.tempTaskDetails });
        },
        addTaskThumbnail: (state: tasksState, action: PayloadAction<{ chosenImage: string }>) => {
            const { chosenImage } = action.payload;
            state.tempTaskDetails.thumbnail = chosenImage;
        },
        editTaskTitle: (state: tasksState, action: PayloadAction<{ taskId: string | undefined, title: string }>) => {
            const { taskId, title } = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.title = title;
            }
        },
        editTaskCategories: (state: tasksState, action: PayloadAction<{ taskId: string | undefined, categories: string[] }>) => {
            const { taskId, categories } = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.categories = categories;
            }
        },
        editTaskDescription: (state: tasksState, action: PayloadAction<{ taskId: string | undefined, description: string }>) => {
            const { taskId, description } = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.description = description;
            }
        },
        editTaskDeadline: (state: tasksState, action: PayloadAction<{ taskId: string | undefined, deadline: string }>) => {
            const { taskId, deadline } = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.deadline = deadline;
            }
        },
        editTaskMemberTasks: (state: tasksState, action: PayloadAction<{ taskId: string | undefined, memberId: string, tasks: string[] }>) => {
            const { taskId, memberId, tasks } = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (!task) return;
            const taskEntry = task.tasksByUserId;
            if (taskEntry) {
                taskEntry[memberId] = tasks;
                return;
            }
        },
        editTaskThumbnail: (state: tasksState, action: PayloadAction<{ taskId: string | undefined, chosenImage: string }>) => {
            const { taskId, chosenImage } = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.thumbnail = chosenImage;
            }
        }
    }
})

export const {
    addTempTaskDetails,
    resetTempTask,
    addAssociatedMembers,
    deleteTask,
    addNewTask,
    addTaskThumbnail,
    editTaskTitle,
    editTaskCategories,
    editTaskDescription,
    editTaskDeadline,
    editTaskMemberTasks,
    editTaskThumbnail
} = tasksSlice.actions;

export const selectTempTaskDetails = (state: RootState) => state.tasks.tempTaskDetails;
export const selectAllTasks = (state: RootState) => state.tasks.tasks;

export default tasksSlice.reducer;