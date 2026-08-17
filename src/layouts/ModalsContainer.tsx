// Profile Modals
import AddProjectModal from "@/features/members/components/profile/AddProjectModal";
import DeleteOneProjectModal from "@/features/members/components/profile/DeleteOneProjectModal";
import DeleteProjectsModal from "@/features/members/components/profile/DeleteProjectsModal";
import EditMemberPhotoModal from "@/features/members/components/profile/EditMemberPhotoModal";

// Tasks Modals
import AddTaskModal from "@/features/tasks/components/AddTaskModal";
import DeleteTaskModal from "@/features/tasks/components/DeleteTaskModal";
import EditTaskThumbnailModal from "@/features/tasks/components/EditTaskThumbnailModal";
import AssignMemberTaskModal from "@/features/tasks/components/AssignMemberTaskModal";
import EditDeadlineModal from "@/features/tasks/components/EditDeadlineModal";

// Members Modals
import AddMemberModal from "@/features/members/components/MemberModal/AddMemberModal";
import DeleteMemberModal from "@/features/members/components/MemberModal/DeleteMemberModal";

// Notes Modals
import DeleteAllNotesModal from "@/features/notes/components/DeleteAllNotesModal";
import DeleteNoteModal from "@/features/notes/components/DeleteNoteModal";
import NoteModal from "@/features/notes/components/NoteModal";

// Todos Modals
import DeleteAllTodosModal from "@/features/todos/components/DeleteAllTodosModal";
import DeleteTodoModal from "@/features/todos/components/DeleteTodoModal";
import TodoModal from "@/features/todos/components/TodoModal";
import { useQueryParam } from "@/hooks/useQueryParam";

const ModalsContainer = () => {

    const modals = [
        // Todos Modals
        { key: "todo", component: <TodoModal /> },
        { key: "delete-todo", component: <DeleteTodoModal /> },
        { key: "delete-all-todos", component: <DeleteAllTodosModal /> },

        // Notes Modals
        { key: "note", component: <NoteModal /> },
        { key: "delete-note", component: <DeleteNoteModal /> },
        { key: "delete-all-notes", component: <DeleteAllNotesModal /> },

        // Members Modals
        { key: "add-member", component: <AddMemberModal /> },
        { key: "delete-member", component: <DeleteMemberModal /> },

        // Profile Modals
        { key: "member-photo", component: <EditMemberPhotoModal /> },
        { key: "delete-projects", component: <DeleteProjectsModal /> },
        { key: "add-project", component: <AddProjectModal /> },
        { key: "delete-project", component: <DeleteOneProjectModal /> },

        // Tasks Modals
        { key: "add-task", component: <AddTaskModal /> },
        { key: "delete-task", component: <DeleteTaskModal /> },
        { key: "task-thumbnail", component: <EditTaskThumbnailModal /> },
        { key: "edit-deadline", component: <EditDeadlineModal /> },
        { key: "assign-member-task", component: <AssignMemberTaskModal /> },
    ];

    const { modalKey } = useQueryParam();

    const activeModal = modals.find((modal) => modal.key === modalKey);

    return (
        <>
            {activeModal?.component}
        </>
    )
}

export default ModalsContainer