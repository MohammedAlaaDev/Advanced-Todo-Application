import { InfoCard } from "@/components/Profile/InfoCard"
import { ProjectsSection } from "@/components/Profile/ProjectsSection"
import { MapPin, Clock, Tag, PenLine } from "lucide-react"


export default function Profile() {
    return (
        <div className="flex flex-col gap-8 p-0 animate-page max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <div className="relative w-full rounded-3xl overflow-hidden p-6 md:p-10 min-h-[300px] flex flex-col justify-end bg-linear-to-r from-[#FF4C9D] via-[#FF8C95] to-[#A3D9FF]">
                {/* Top Actions (optional placeholder for aesthetics, assumed from context) */}

                <div className="flex flex-col lg:flex-row justify-between items-start md:items-center lg:items-end gap-6 z-10">
                    {/* Left: Avatar & Title */}
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <div className="h-20 w-20 rounded-full bg-[#1c1c1c] flex items-center justify-center shadow-xl border-2 border-white/10">
                                {/* Logo Placeholder */}
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ff5c5c]">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            {/* Pin Icon */}
                            <div className="absolute -top-1 -right-1 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/20 text-white shadow-sm">
                                <MapPin size={12} fill="white" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 text-white">
                            <h1 className="text-3xl font-bold tracking-tight">Cloth</h1>
                            <p className="text-white/80 font-medium text-sm">Small and Consices headline</p>
                        </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 text-white/90 w-full md:w-auto mt-4 md:mt-0">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-black/40 mix-blend-overlay">Created</span>
                            <span className="font-semibold text-sm sm:text-base">Mar 23, 10:34 PM</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-black/40 mix-blend-overlay">Deadline</span>
                            <span className="font-semibold text-sm sm:text-base">Jun 02, 04:01 PM</span>
                        </div>
                        <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-black/40 mix-blend-overlay">Tracked Time</span>
                            <span className="font-semibold text-sm sm:text-base">10H 32M</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-20 px-4 md:px-2">

                {/* Left Column: Metadata */}
                <div className="flex flex-col gap-y-7 justify-start">
                    {/* Created At */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Created At</span>
                        </div>
                        <span className="text-foreground/80 font-medium">May, 15 2022 14:23 PM</span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Tag className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Tags</span>
                        </div>

                        <div className="flex flex-wrap gap-2  justify-start lg:justify-start">
                            <span className="px-3 py-1 rounded-lg bg-pink-100 text-pink-600 text-xs font-bold">Profitable</span>
                            <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-600 text-xs font-bold">Ai</span>
                            <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600 text-xs font-bold">1 Person</span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-x-5  gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Email</span>
                        </div>
                        <span className="text-foreground/80 font-medium">ss@gmail.com</span>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">phone</span>
                        </div>
                        <span className="text-foreground/80 font-medium">9999999</span>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-x-5 gap-y-2 justify-start items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">rating</span>
                        </div>
                        <span className="text-foreground/80 font-medium">sssss</span>
                    </div>
                </div>

                {/* Right Column: Description */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">Description</h3>
                    </div>
                    <div className="relative group">
                        <p className="text-muted-foreground leading-relaxed text-[15px]">
                            TaskFlow is an intuitive task management system designed to help teams collaborate and manage their projects with ease. It offers powerful features such as task tracking, project organization, scheduling, and communication tools to keep teams organized and on top of their projects.
                        </p>
                        <button className="inline-flex items-center gap-2 mt-2 text-foreground/80 hover:text-foreground transition-colors font-medium">
                            <PenLine className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Projects And Skills */}
            <div className="min-h-screen">
                <div className="mx-auto flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 items-start">

                    <div className="w-full lg:col-span-8">
                        <ProjectsSection />
                    </div>

                    <div className="w-full lg:col-span-4 lg:sticky top-30">
                        <InfoCard />
                    </div>

                </div>
            </div>
        </div>
    )
}
