import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"

const projects = [
    {
        id: 1,
        title: "Creating Mobile App Design",
        category: "UI UX Design",
        progress: 75,
        color: "blue",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        daysLeft: 3,
        avatars: ["bg-gray-200", "bg-gray-300", "bg-gray-400", "bg-orange-400"]
    },
    {
        id: 2,
        title: "Creating Perfect Website",
        category: "Web Developer",
        progress: 85,
        color: "blue",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        daysLeft: 4,
        avatars: ["bg-gray-200", "bg-gray-300", "bg-gray-400", "bg-red-400"]
    },
    {
        id: 3,
        title: "Dashboard Redesign",
        category: "Product Design",
        progress: 40,
        color: "violet",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
        daysLeft: 7,
        avatars: ["bg-green-200", "bg-blue-300", "bg-yellow-400"]
    },
    {
        id: 4,
        title: "Database Optimization",
        category: "Backend",
        progress: 60,
        color: "emerald",
        image: "https://images.unsplash.com/photo-1558494949-ef2dc0989ba0?q=80&w=1000&auto=format&fit=crop",
        daysLeft: 5,
        avatars: ["bg-purple-200", "bg-pink-300", "bg-indigo-400", "bg-cyan-400"]
    }
]

export function ProjectsList({ title="Projects" }: { title?: string }) {
    return (
        <div className="col-span-3 mt-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">{title}</h3>
                {/* Carousel controls will be custom positioned if needed, or we use the default ones */}
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <div className="absolute right-12 -top-12 z-10 flex gap-1">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-8 w-8 border-none hover:bg-slate-100 text-primary/70 hover:text-primary" />
                    <CarouselNext className="relative right-0 bottom-0 top-0 translate-y-0 h-8 w-8 border-none hover:bg-slate-100 text-primary/70 hover:text-primary" />
                </div>

                <CarouselContent className="-ml-6">
                    {projects.map((project) => (
                        <CarouselItem key={project.id} className="pl-6 md:basis-1/2 lg:basis-1/2">
                            <Card className="border-0 shadow-none bg-white rounded-3xl p-2 select-none">
                                <div className="p-4">
                                    {/* Image/Preview Mock */}
                                    <div className="h-32 w-full bg-slate-100 rounded-xl mb-4 relative overflow-hidden group">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="object-cover w-full h-full opacity-90 transition-transform group-hover:scale-105"
                                        />
                                    </div>

                                    <h4 className="font-bold text-base text-primary line-clamp-1">{project.title}</h4>
                                    <p className="text-xs text-slate-400 mb-4">{project.category}</p>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-semibold">
                                            <span>Progress</span>
                                            <span className={cn("text-blue-500", project.progress < 50 && "text-orange-500")}>{project.progress}%</span>
                                        </div>
                                        <Progress value={project.progress} className={cn("bg-slate-100 h-2", `text-${project.color}-500`)} />

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex -space-x-2">
                                                {project.avatars.map((bgClass, idx) => (
                                                    <div key={idx} className={cn("w-6 h-6 rounded-full border-2 border-white", bgClass)} />
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                                                <span className="h-3 w-3 rounded-full border border-slate-400 flex items-center justify-center pt-1px">🕒</span>
                                                {project.daysLeft} Days Left
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
