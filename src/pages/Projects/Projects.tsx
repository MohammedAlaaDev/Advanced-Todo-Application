import { Search, MoreHorizontal } from 'lucide-react';
import { ProjectsList } from '@/components/Dashboard/ProjectsList';

export default function Projects() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] space-y-12">
            {/* Search Header */}
            <div className="max-w-md bg-white rounded-xl border border-slate-100 px-4 py-2.5 flex items-center shadow-sm">
                <Search className="h-5 w-5 text-slate-400 mr-2" />
                <input type="text" placeholder="Search Task" className="bg-transparent outline-none w-full text-sm text-slate-600" />
            </div>

            {/* Top 3 Projects */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-[#111827]">Top 3 Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Team projects', color: 'bg-pink-500' },
                        { label: 'Collabrations', color: 'bg-emerald-500' },
                        { label: 'Personal Projects', color: 'bg-amber-500' }
                    ].map((folder, i) => (
                        <div key={i} className="relative pt-4">
                            <div
                                className="bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer"
                                style={{
                                    // Folder Clip Path: Tab on left, then horizontal line, then full card
                                    clipPath: "polygon(0% 0%, 40% 0%, 45% 12%, 100% 12%, 100% 100%, 0% 100%)",
                                    paddingTop: '2.5rem'
                                }}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 ${folder.color} rounded-lg flex items-center justify-center shadow-inner`}>
                                            <div className="w-3.5 h-3.5 bg-white/40 rounded-sm" />
                                        </div>
                                        <span className="font-semibold text-slate-700">{folder.label}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
                                    <span>Apr 2, 2023</span>
                                    <MoreHorizontal className="h-5 w-5 text-slate-300" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Projects Section */}
            <section className="space-y-6">
                <ProjectsList title="All Projects"/>
            </section>
        </div>
    );
};
