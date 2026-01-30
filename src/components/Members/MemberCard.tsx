import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, FileText } from "lucide-react";

type MemberCardProps = {
    member: {
        name?: string;
        role?: string;
        bio?: string;
        tasks?: number;
        rating?: number;
        image?: string;
    };
}

export function MemberCard({ member }: MemberCardProps) {
    return (
        <Card className="member-card-shape border-none bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-lg">
            <div className="flex flex-col gap-6">
                {/* Header: Avatar + Info + Button */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 ring-2 ring-slate-100 ring-offset-2">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback>{member?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                            <p className="text-sm font-medium text-slate-400">{member.role}</p>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50 px-0"
                    >
                        View Profile
                    </Button>
                </div>

                {/* Bio Section */}
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {member.bio}
                </p>

                {/* Footer Stats */}
                <div className="flex items-center gap-8 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-100 p-2 rounded-xl">
                            <FileText className="h-4 w-4 text-slate-600" />
                        </div>
                        <span className="font-bold text-slate-800 text-sm">{member.tasks} Task</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="bg-amber-50 p-2 rounded-xl">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        </div>
                        <span className="font-bold text-slate-800 text-sm">{member.rating}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}