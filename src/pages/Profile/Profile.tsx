// React & React Router
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

// State Management
import { useSelector } from "react-redux";
import { selectMembers } from "@/features/members/membersSlice";

// Types
import type { MemberObject } from "@/types";

// UI & Icons
import { ArrowLeft, SearchAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

// Components
import InfoCard from "@/components/Profile/InfoCard";
import ProjectsSection from "@/components/Profile/ProjectsSection";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import PersonalData from "@/components/Profile/PersonalData";
const Profile = () => {

    const { id } = useParams();

    const members = useSelector(selectMembers);

    const member = members.find((m: MemberObject) => m.id === id);

    // Edit States
    const [headerEditMode, setHeaderEditMode] = useState<boolean>(false);
    const [descriptionEditMode, setDescriptionEditMode] = useState<boolean>(false);
    const [emailEditMode, setEmailEditMode] = useState<boolean>(false);
    const [phoneEditMode, setPhoneEditMode] = useState<boolean>(false);
    const [stackEditMode, setStackEditMode] = useState<boolean>(false);
    const [langsEditMode, setLangsEditMode] = useState<boolean>(false);
    const [linksEditMode, setLinksEditMode] = useState<boolean>(false);
    const [projectsEditMode, setProjectsEditMode] = useState<boolean>(false);

    const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);

    const navigate = useNavigate();

    const resetEditModes = () => {
        setHeaderEditMode(false);
        setDescriptionEditMode(false);
        setEmailEditMode(false);
        setPhoneEditMode(false);
        setStackEditMode(false);
        setLangsEditMode(false);
        setLinksEditMode(false);
        setProjectsEditMode(false);
        setCurrentEditingId(null);
    }

    if (!member) return (
        <div className="animate-page flex flex-col items-center justify-center min-h-[calc(100vh-170px)]">
            <SearchAlert className="text-primary animate-up-down m-0" size={200} strokeWidth={1} />
            <p className="text-primary mb-4">The selected member doesn't exist</p>
            <Button
                onClick={() => navigate("/members", { replace: true })}
                variant="outline"
            >
                <ArrowLeft /> Back to members
            </Button>
        </div>
    );

    return (
        <div className="flex flex-col gap-8 p-0 animate-page max-w-7xl mx-auto w-full">

            {/* Header Section */}
            <ProfileHeader
                member={member}
                headerEditMode={headerEditMode}
                setHeaderEditMode={setHeaderEditMode}
                resetEditModes={resetEditModes}
            />

            <PersonalData
                member={member}
                descriptionEditMode={descriptionEditMode}
                emailEditMode={emailEditMode}
                phoneEditMode={phoneEditMode}
                setDescriptionEditMode={setDescriptionEditMode}
                setEmailEditMode={setEmailEditMode}
                setPhoneEditMode={setPhoneEditMode}
                resetEditModes={resetEditModes}
            />

            {/* Projects And Skills */}
            <div>
                <div className="mx-auto flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 items-start">

                    <div className="w-full lg:col-span-8">
                        <ProjectsSection
                            member={member}
                            projectsEditMode={projectsEditMode}
                            resetEditModes={resetEditModes}
                            setProjectsEditMode={setProjectsEditMode}
                            currentEditingId={currentEditingId}
                            setCurrentEditingId={setCurrentEditingId}
                        />
                    </div>

                    <div className="w-full lg:col-span-4 lg:sticky top-36">
                        <InfoCard
                            member={member}
                            resetEditModes={resetEditModes}
                            stackEditMode={stackEditMode}
                            setStackEditMode={setStackEditMode}
                            langsEditMode={langsEditMode}
                            setLangsEditMode={setLangsEditMode}
                            linksEditMode={linksEditMode}
                            setLinksEditMode={setLinksEditMode}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;
