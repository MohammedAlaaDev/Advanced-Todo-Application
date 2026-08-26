import type { RootState } from "@/app/store";
import type { taskDetailsObject, TaskObject, TasksState } from "@/features/tasks/types";
import { createEntityAdapter, createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { deleteMember } from "../members/membersSlice";

const tasksAdapter = createEntityAdapter<TaskObject>();

const initialState: TasksState = tasksAdapter.getInitialState({
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
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTempTaskDetails: (state: TasksState, action: PayloadAction<{ data: taskDetailsObject }>) => {
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
        resetTempTask: (state: TasksState) => {
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
        addAssociatedMembers: (state: TasksState, action: PayloadAction<{ selected: string[] }>) => {
            const { selected } = action.payload;
            state.tempTaskDetails.associatedMembersIDs = [...selected];
        },
        deleteTask: (state: TasksState, action: PayloadAction<string>) => {
            tasksAdapter.removeOne(state, action.payload);
        },
        addNewTask: (state: TasksState) => {
            state.tempTaskDetails.createdAt = new Date().toISOString();
            const associatedMembersIDs = [...state.tempTaskDetails.associatedMembersIDs];

            associatedMembersIDs.forEach((id: string) => {
                state.tempTaskDetails.tasksByUserId[id] = [];
            })

            tasksAdapter.addOne(state, { ...state.tempTaskDetails });
        },
        addTaskThumbnail: (state: TasksState, action: PayloadAction<{ chosenImage: string }>) => {
            const { chosenImage } = action.payload;
            state.tempTaskDetails.thumbnail = chosenImage;
        },
        editTaskTitle: (state: TasksState, action: PayloadAction<{ taskId: string | undefined, title: string }>) => {
            const { taskId, title } = action.payload;
            if (taskId) tasksAdapter.updateOne(state, { id: taskId, changes: { title } });
        },
        editTaskCategories: (state: TasksState, action: PayloadAction<{ taskId: string | undefined, categories: string[] }>) => {
            const { taskId, categories } = action.payload;
            if (taskId) tasksAdapter.updateOne(state, { id: taskId, changes: { categories } });
        },
        editTaskDescription: (state: TasksState, action: PayloadAction<{ taskId: string | undefined, description: string }>) => {
            const { taskId, description } = action.payload;
            if (taskId) tasksAdapter.updateOne(state, { id: taskId, changes: { description } });
        },
        editTaskDeadline: (state: TasksState, action: PayloadAction<{ taskId: string | undefined, deadline: string }>) => {
            const { taskId, deadline } = action.payload;
            if (taskId) tasksAdapter.updateOne(state, { id: taskId, changes: { deadline } });
        },
        editMemberTasks: (state: TasksState, action: PayloadAction<{ taskId: string, tasksByUserId: TaskObject["tasksByUserId"] }>) => {
            const { taskId, tasksByUserId } = action.payload;
            tasksAdapter.updateOne(state, { id: taskId, changes: { tasksByUserId } });
        },
        editTaskThumbnail: (state: TasksState, action: PayloadAction<{ taskId: string | undefined, chosenImage: string }>) => {
            const { taskId, chosenImage } = action.payload;
            if (taskId) tasksAdapter.updateOne(state, { id: taskId, changes: { thumbnail: chosenImage } });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteMember, (state: TasksState, action) => {
            const id = action.payload;
            state.ids.forEach((taskId) => {
                const task = state.entities[taskId];
                if (!task) return;
                const tasksByUserId = { ...task.tasksByUserId };
                delete tasksByUserId[id];
                tasksAdapter.updateOne(state, {
                    id: taskId,
                    changes: {
                        tasksByUserId,
                        associatedMembersIDs: task.associatedMembersIDs.filter((memberId) => memberId !== id),
                    },
                });
            });
        })
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
    editMemberTasks,
    editTaskThumbnail
} = tasksSlice.actions;

export const selectTempTaskDetails = (state: RootState) => state.tasks.tempTaskDetails;
export const {
    selectAll: selectTasksArr,
    selectById: selectTask,
    selectEntities: selectTasksEntities,
    selectIds: selectTasksIds,
    selectTotal: selectTasksCount,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export default tasksSlice.reducer;