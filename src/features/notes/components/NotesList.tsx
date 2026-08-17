import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectNotes } from '@/features/notes/notesSlice'
import type { noteObject } from '@/features/notes/types'

import sadNote from "@/assets/images/sadNote.png"
import sadNoteGreen from "@/assets/images/sadNoteGreen.png"
import sadNoteOrange from "@/assets/images/sadNoteOrange.png"
import sadNotePink from "@/assets/images/sadNotePink.png"
import sadNoteRed from "@/assets/images/sadNoteRed.png"
import sadNoteCyan from "@/assets/images/sadNoteCyan.png"

import NoData from '@/components/NoData'
import { useThemeContext } from '@/contexts/theme/ThemeProvider'
import { useQueryParam } from '@/hooks/useQueryParam'
import Dropdown, { type DropdownOption } from '@/components/Dropdown'

const NotesList = () => {

    const notes = [...useSelector(selectNotes)].reverse();

    const { openModal } = useQueryParam();

    const { theme } = useThemeContext();

    const { openItemModal } = useQueryParam();

    const badgeColors = [
        { bg: "bg-pink-100 dark:bg-pink-900", text: "text-pink-700 dark:text-pink-300", hover: "hover:bg-pink-200 dark:hover:bg-pink-800" },
        { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-300", hover: "hover:bg-blue-200 dark:hover:bg-blue-800" },
        { bg: "bg-emerald-100 dark:bg-emerald-900", text: "text-emerald-700 dark:text-emerald-300", hover: "hover:bg-emerald-200 dark:hover:bg-emerald-800" },
        { bg: "bg-amber-100 dark:bg-amber-900", text: "text-amber-700 dark:text-amber-300", hover: "hover:bg-amber-200 dark:hover:bg-amber-800" },
        { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-700 dark:text-purple-300", hover: "hover:bg-purple-200 dark:hover:bg-purple-800" },
        { bg: "bg-cyan-100 dark:bg-cyan-900", text: "text-cyan-700 dark:text-cyan-300", hover: "hover:bg-cyan-200 dark:hover:bg-cyan-800" },
    ];

    const options: DropdownOption[] = [
        {
            key: "edit",
            text: "Edit",
            icon: <PencilIcon />
        },
        {
            key: "delete",
            text: "Delete",
            icon: <TrashIcon />
        }
    ]

    const handleAction = (key: string, id: string) => {
        if (key === "edit") {
            openItemModal(id, "note");
        }

        if (key === "delete") {
            openItemModal(id, "delete-note");
        }

    }

    const noDataSrc = {
        first: sadNote,
        second: sadNoteGreen,
        third: sadNoteOrange,
        fourth: sadNotePink,
        fifth: sadNoteRed,
        sixth: sadNoteCyan
    }

    return (
        <>
            {
                notes && notes.length > 0 ?
                    notes.map((note: noteObject) => (
                        <Card key={note.id} className="transition-all border-0 shadow-sm p-4 bg-primary/10 ring-1 ring-primary/50 rounded-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                                    {`${note.edited ? "Edited" : "Created"}` + ` at ${note.createdAt}`}
                                </span>
                                <Dropdown options={options} handleChoose={(key: string) => {
                                    handleAction(key, note.id);
                                }} />
                            </div>
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">{note.title}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                                {note.description || "No Description"}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {
                                    note?.category?.map((cat, idx) => {
                                        const colorStyle = badgeColors[idx];
                                        return (
                                            cat &&
                                            <Badge key={idx} variant="secondary" className={`${colorStyle.bg} ${colorStyle.text} ${colorStyle.hover} h-5 px-2 text-[10px] rounded-full`}>
                                                {cat}
                                            </Badge>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                    ))
                    :
                    <div onClick={() => {
                        openModal("note");
                    }}>

                        <NoData
                            src={noDataSrc[theme]}
                            message="No Notes? put your thoughts."
                            image={true}
                        />
                    </div>
            }
        </>
    )
}

export default NotesList