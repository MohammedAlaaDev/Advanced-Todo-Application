import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { MemberObject } from "@/features/members/types";
import { Button } from "@/components/ui/button";

export interface ModifiedMember extends MemberObject {
    selected: boolean;
}

interface MembersChooseProps {
    modifiedMembers: ModifiedMember[];
    setModifiedMembers: (members: ModifiedMember[]) => void;
}

const MembersChoose = ({ modifiedMembers, setModifiedMembers }: MembersChooseProps) => {

    const handleToggleMember = (memberId: string) => {
        setModifiedMembers(modifiedMembers.map((member) =>
            member.id === memberId ? { ...member, selected: !member.selected } : member
        ));
    };

    return (
        <div className="space-y-4">

            {modifiedMembers.length > 0 ? (
                <div className="grid gap-3">
                    {modifiedMembers.map((member) => {
                        const isSelected = member.selected;
                        return (
                            <Button
                                key={member.id}
                                type="button"
                                onClick={() => handleToggleMember(member.id)}
                                className={`w-full h-fit hover:bg-primary/20 dark:hover:bg-primary/20 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center rounded-3xl border p-4 text-left transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 shadow-sm" : "border-slate-200 bg-white hover:border-primary dark:border-slate-700 dark:bg-slate-800"}`}
                            >
                                <Avatar size="lg" className="ring-1 ring-slate-200 dark:ring-slate-700 mx-auto sm:mx-0">
                                    <AvatarImage src={member.avatar} alt={member.personalDetails.name || "Member avatar"} />
                                    <AvatarFallback>{member.personalDetails.name?.[0] ?? "?"}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0 text-center sm:text-left">
                                    <div className="flex flex-col gap-3 md:flex-row sm:items-center sm:justify-between">
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{member.personalDetails.name || "Unnamed"}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{member.personalDetails.role || "No role"}</p>
                                            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                                {member.description.text?.length && member.description.text.length > 20
                                                    ? `${member.description.text.slice(0, 20)}...`
                                                    : member.description.text || "No bio available."}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-2 sm:items-end">
                                            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                                {member.projects.length === 0 ? "No" : member.projects.length} {member.projects.length === 1 ? "project" : "projects"}
                                            </span>
                                            {isSelected &&
                                                <span className="mx-auto block rounded-full bg-primary text-white px-2 py-1 text-[11px] font-semibold">
                                                    Selected
                                                </span>}
                                        </div>
                                    </div>

                                </div>
                            </Button>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                    No members available. Add members first and then assign them to tasks.
                </div>
            )}
        </div>
    );
};

export default MembersChoose;
