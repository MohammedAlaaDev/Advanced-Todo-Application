import { Github, ExternalLink } from 'lucide-react';

export const ProjectsSection = () => {
    const projects = [
        {
            title: "E-Commerce Platform",
            desc: "Built a full-stack e-commerce platform with user authentication, product management, and payment integration.",
            tags: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
            title: "Task Management App",
            desc: "Developed a collaborative task management application with real-time updates and team collaboration features.",
            tags: ["React", "Firebase", "Tailwind CSS"]
        },
        {
            title: "Weather Dashboard",
            desc: "Created an interactive weather dashboard using external APIs with location-based forecasts and data visualization.",
            tags: ["JavaScript", "OpenWeather", "Chart.js"]
        }
    ];

    return (
        <section className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-4 md:p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
            </div>

            <div className="space-y-6">
                {projects.map((project, index) => (
                    <div key={index} className="group p-4 md:p-6 rounded-xl border border-gray-100 hover:border-indigo-100 transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                {project.title}
                            </h3>
                            <div className="flex gap-3 text-gray-400">
                                <Github size={20} className="cursor-pointer hover:text-gray-600" />
                                <ExternalLink size={20} className="cursor-pointer hover:text-gray-600" />
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">
                            {project.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-medium rounded-md border border-gray-100">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};