import { LayoutDashboard, BookOpen, Users, MessageSquare, Settings, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router"

export function Sidebar({ className }: { className?: string }) {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: BookOpen, label: "Projects", path: "/projects" },
        { icon: Users, label: "Members", path: "/members" },
        { icon: MessageSquare, label: "Profile", path: "/profile" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ]

    return (
        <div className={cn("flex flex-col h-full bg-white border-r px-6 py-8", className)}>
            {/* Brand */}
            <div
                onClick={() => navigate("/")}
                className="flex items-center gap-3 mb-10 px-2 cursor-pointer">
                <div className="bg-primary text-white p-2 rounded-lg">
                    <BookOpen className="h-6 w-6 text-white" fill="white" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-primary">Nuegas</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Button
                        onClick={() => {
                            navigate(item.path);
                        }}
                        key={item.label}
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-4 text-base font-medium h-12",
                            item.path === pathname
                                ? "bg-gray-100 text-primary font-semibold"
                                : "text-muted-foreground hover:text-primary"
                        )}
                    >
                        <item.icon className={cn("h-5 w-5", item.path === pathname && "text-primary")} />
                        {item.label}
                    </Button>
                ))}
            </nav>

            {/* Help Center */}
            <div className="relative mt-auto pt-6">
                <div className="bg-info text-info-foreground rounded-2xl p-6 relative overflow-hidden">
                    {/* Abstract Circles Background */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-accent/20 rounded-full blur-lg" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="bg-white/10 p-3 rounded-full mb-4 ring-4 ring-white/5">
                            <HelpCircle className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">Help Center</h3>
                        <p className="text-xs text-slate-300 mb-4 px-2">
                            Having Trouble in Learning. Please contact us for more questions.
                        </p>
                        <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90 font-semibold text-xs h-9">
                            Go To Help Center
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
