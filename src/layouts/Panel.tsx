import { cn } from "@/lib/utils"

import TodosSection from "@/features/todos/components/TodosSection"
import NotesSection from "@/features/notes/components/NotesSection"

const Panel = ({ className }: { className?: string }) => {
    return (
        <div className={cn("animate-fade-in flex flex-col h-full transition-all bg-white dark:bg-card border-l dark:border-slate-700 px-6 py-8 overflow-y-auto shrink-0", className)}>

            <TodosSection />

            <NotesSection />

        </div>
    )
}

export default Panel;
