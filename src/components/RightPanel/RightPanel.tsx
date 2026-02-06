import { Plus, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import TodosList from "@/features/todos/TodosList"
import { useState } from "react"
import { AddTodoModal } from "@/components/RightPanel/AddTodoModal"

export function RightPanel({ className }: { className?: string }) {

    const [open, setOpen] = useState(false);

    return (
        <div className={cn("flex flex-col h-full bg-white border-l px-6 py-8 overflow-y-auto w-[320px] shrink-0", className)}>

            {/* My Todos Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg text-foreground underline decoration-2 decoration-gray-300 underline-offset-4">My Todos</h2>
                    <Button onClick={() => setOpen(true)} size="icon" variant="secondary" className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 hover:bg-indigo-200 shadow-none">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <TodosList />
                </div>
                <AddTodoModal open={open} onOpenChange={setOpen} />
            </div>

            {/* Notes Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        {/* Pencil Icon */}
                        <div className="grid place-items-center rotate-45">
                            <div className="w-3 h-1 bg-slate-400 rounded-full" />
                        </div>
                        <h2 className="font-bold text-lg text-primary underline decoration-2 decoration-gray-300 underline-offset-4">Notes</h2>
                    </div>
                    <Button size="icon" variant="secondary" className="h-6 w-6 rounded bg-indigo-100 text-indigo-600 hover:bg-indigo-200 shadow-none">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    {/* Note 1 */}
                    <Card className="border-0 shadow-sm p-4 bg-white ring-1 ring-slate-100 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-slate-400 font-medium">Apr 2, 2023</span>
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 mb-1">ChatGPT Tricks for business marketing</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id dui mi. Fusce varius bibendum ante.</p>
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100 h-5 px-2 text-[10px] rounded-full">Tech</Badge>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 h-5 px-2 text-[10px] rounded-full">Ai</Badge>
                        </div>
                    </Card>
                    <Card className="border-0 shadow-sm p-4 bg-white ring-1 ring-slate-100 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-slate-400 font-medium">Apr 2, 2023</span>
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 mb-1">ChatGPT Tricks for business marketing</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id dui mi. Fusce varius bibendum ante.</p>
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100 h-5 px-2 text-[10px] rounded-full">Tech</Badge>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 h-5 px-2 text-[10px] rounded-full">Ai</Badge>
                        </div>
                    </Card>
                    <Card className="border-0 shadow-sm p-4 bg-white ring-1 ring-slate-100 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-slate-400 font-medium">Apr 2, 2023</span>
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 mb-1">ChatGPT Tricks for business marketing</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id dui mi. Fusce varius bibendum ante.</p>
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100 h-5 px-2 text-[10px] rounded-full">Tech</Badge>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 h-5 px-2 text-[10px] rounded-full">Ai</Badge>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
