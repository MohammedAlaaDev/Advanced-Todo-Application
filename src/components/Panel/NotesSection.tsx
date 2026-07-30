import { selectNotes } from "@/features/notes/notesSlice";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import NotesList from "@/features/notes/components/NotesList";
import { useQueryParam } from "@/hooks/useQueryParam";

const NotesSection = () => {

    const notes = useSelector(selectNotes);

    const { openModal } = useQueryParam();

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    {/* Pencil Icon */}
                    <div className="grid place-items-center rotate-45">
                        <div className="w-3 h-1 bg-slate-400 dark:bg-slate-500 rounded-full" />
                    </div>
                    <h2 className="font-bold text-lg text-primary underline decoration-2 decoration-gray-300 dark:decoration-gray-600 underline-offset-4">Notes</h2>
                </div>
                <div className="flex justify-center items-center gap-2">

                    {
                        notes && notes.length > 0 ?
                            <Button
                                onClick={() => {
                                    openModal("delete-notes");
                                }}
                                size="icon" variant="secondary" className="h-6 w-6 rounded bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 shadow-none">
                                <Trash className="h-4 w-4" />
                            </Button>
                            :
                            null
                    }
                    <Button onClick={() => {
                        openModal("note");
                    }} size="icon" variant="secondary" className="h-6 w-6 rounded bg-primary text-white hover:bg-primary/80 shadow-none">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <NotesList />
            </div>




        </section >
    )
}

export default NotesSection