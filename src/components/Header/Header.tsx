import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
    return (
        <div className="flex items-center justify-between py-6 px-1">
            <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Hi, Skylar Dias</h1>
                <p className="text-muted-foreground text-sm mt-1">Let's finish your task today!</p>
            </div>
            <div className="flex items-center gap-3">
                <Button size="icon-lg" variant="ghost" className="rounded-full relative">
                    <Bell className="size-7 text-info" />
                    <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                </Button>
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>SD</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
