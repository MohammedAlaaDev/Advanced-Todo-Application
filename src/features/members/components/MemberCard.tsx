import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQueryParam } from "@/hooks/useQueryParam";
import type { MemberObject } from "@/types";
import { Star, FileText, X } from "lucide-react";
import { useNavigate } from "react-router";

type MemberCardProps = {
    member: MemberObject;
}

const MemberCard = ({ member }: MemberCardProps) => {

    const navigate = useNavigate();

    const { openItemModal } = useQueryParam();

    return (
        <Card className="overflow-hidden group member-card-shape relative border-none bg-white dark:bg-card p-6">

            <div className="deleteMember opacity-30 group-hover:opacity-100 transition-all bg-primary absolute top-0 left-0 size-6 rounded-br-lg rounded-tl-sm cursor-pointer flex justify-center items-center">
                <X
                    onClick={() => {
                        openItemModal(member.id, "delete-member");
                    }}
                    className="size-5 text-white" />
            </div>

            <div className="flex flex-col gap-6">
                {/* Header: Avatar + Info + Button */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 ring-2 ring-slate-100 dark:ring-slate-700 ring-offset-2">
                            <AvatarImage src={member.avatar} alt={member?.personalDetails?.name?.[0]} />
                            <AvatarFallback>{member?.personalDetails?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">{member?.personalDetails?.name}</h3>
                            <p className="text-sm font-medium text-slate-400 dark:text-slate-500">{member?.personalDetails?.role}</p>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="text-primary font-bold hover:bg-primary/50 dark:hover:text-primary hover:text-white px-2"
                        onClick={() => {
                            navigate(`/profile/${member.id}`);
                        }}
                    >
                        View Profile
                    </Button>
                </div>

                {/* Bio Section */}
                <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {member?.description?.text && member.description?.text.length > 20 ? member.description?.text.slice(0, 20) + "..." : member?.description.text || "No Bio"}
                </p>

                {/* Footer Stats */}
                <div className="flex items-center gap-8 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-xl">
                            <FileText className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                            {member.projects.length === 0 ? "" : member?.projects?.length} {member.projects.length === 0 ? "No Projects" : member.projects.length > 1 ? "Projects" : "Project"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="bg-amber-50 p-2 rounded-xl">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{member?.rating?.avgRating || "No Rating"}</span>
                    </div>
                </div>
            </div>
            <div className="glow transition-all group-hover:shadow-[0_0_320px_50px] group-hover:shadow-primary bg-transparent absolute right-0 bottom-0"></div>
        </Card>
    );
}
export default MemberCard;
