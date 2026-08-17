import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { MemberObject } from "@/features/members/types";
import { Star } from 'lucide-react';


const SearchMemberItem = (m: MemberObject) => {
    return (
        <>

            <Avatar className="h-10 w-10 ring-2 ring-slate-100 dark:ring-slate-700">
                <AvatarImage src={m.avatar} alt={m?.personalDetails?.name?.[0]} />
                <AvatarFallback>{m?.personalDetails?.name?.[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">{m?.personalDetails?.name}</span>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{m?.personalDetails?.role || "Member"}</p>
                    </div>
                    <div className="ml-3 p-1 bg-amber-50 rounded-full">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    </div>
                </div>
            </div>

            <span className="ml-2 text-sm font-bold text-slate-800 dark:text-slate-200">{m?.rating?.avgRating || "—"}</span>

        </>
    )
}

export default SearchMemberItem