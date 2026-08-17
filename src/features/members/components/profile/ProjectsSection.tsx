import type { MemberObject, MemberProject } from "@/features/members/types";
import MemberProjectCard from '@/features/members/components/profile/MemberProjectCard';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';

import astroFirst from "@/assets/noProjects/first.webp";
import astroSecond from "@/assets/noProjects/second.webp";
import astroThird from "@/assets/noProjects/third.webp";
import astroFourth from "@/assets/noProjects/fourth.webp";
import astroFifth from "@/assets/noProjects/fifth.webp";
import astroSixth from "@/assets/noProjects/sixth.webp";
import { useThemeContext } from '@/contexts/theme/ThemeProvider';
import { useQueryParam, type QueryParam } from '@/hooks/useQueryParam';
import { type Dispatch, type SetStateAction } from 'react';

interface ProjectProps {
    member: MemberObject | undefined;
    resetEditModes: () => void;
    projectsEditMode: boolean;
    setProjectsEditMode: Dispatch<SetStateAction<boolean>>;
    currentEditingId: string | null;
    setCurrentEditingId: Dispatch<SetStateAction<string | null>>;
}

const ProjectsSection = ({
    member,
    resetEditModes,
    projectsEditMode,
    setProjectsEditMode,
    currentEditingId,
    setCurrentEditingId
}: ProjectProps) => {

    const projects: MemberProject[] = member ? [...member.projects] : [];

    const { openModal } = useQueryParam() as QueryParam;

    const reversedProjects: MemberProject[] = [...projects].reverse();

    const theme = useThemeContext();

    const imgRender = {
        first: astroFirst,
        second: astroSecond,
        third: astroThird,
        fourth: astroFourth,
        fifth: astroFifth,
        sixth: astroSixth,
    }

    return (
        <section className="bg-white dark:bg-card rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 md:p-8">
            <div className="mb-8 flex justify-between items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Projects</h2>
                {
                    projectsEditMode ?
                        <></>
                        :
                        <div className='flex justify-between items-center gap-2'>
                            {
                                projects.length === 0 ?
                                    ""
                                    :
                                    <Button
                                        className='text-white'
                                        onClick={() => {
                                            resetEditModes();
                                            openModal?.("delete-projects");
                                        }}
                                    >
                                        <Trash />
                                    </Button>
                            }
                            <Button
                                className='text-white'
                                onClick={() => {
                                    resetEditModes();
                                    openModal?.("add-project");
                                }}>
                                <Plus />
                            </Button>
                        </div>

                }
            </div>

            {
                projects.length === 0 ?
                    <div
                        onClick={() => {
                            resetEditModes();
                            openModal?.("add-project");
                        }}
                        className="w-full cursor-pointer flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dotted border-primary bg-primary/10 backdrop-blur-sm p-6 text-center shadow-[0_0_15px_rgba(var(--primary),0.3)] dark:shadow-[0_0_25px_rgba(var(--primary),0.2)] transition-all duration-300">
                        <img className='size-40' src={imgRender[theme.theme]} />
                        <div className="space-y-2 relative z-10">
                            <p className="text-sm max-w-sm mx-auto">
                                There are no projects yet.
                            </p>
                        </div>

                    </div>
                    :
                    <div className="space-y-6">
                        {member && reversedProjects.map((project) => (
                            <MemberProjectCard
                                key={project.id}
                                member={member}
                                project={project}
                                resetEditModes={resetEditModes}
                                setProjectsEditMode={setProjectsEditMode}
                                currentEditingId={currentEditingId}
                                setCurrentEditingId={setCurrentEditingId}
                            />
                        ))}
                    </div>
            }
        </section>
    );
};

export default ProjectsSection;
