// React & Router
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";

// Layout Components
import Header from "@/layouts/Header";
import Panel from "@/layouts/Panel";
import Sidebar from "@/layouts/Sidebar";

// Modals Container to prevent background re-renders
import ModalsContainer from "@/layouts/ModalsContainer";
import { useGlobalFormsNavigation } from "@/hooks/useGlobalFormsNavigation";

const RootLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useGlobalFormsNavigation();

    return (
        <>
            <div className="flex h-screen overflow-hidden transition-all bg-primary/10 font-sans text-foreground">
                {/* Left Sidebar */}
                <aside className="w-62.5 shrink-0 hidden md:block border-r dark:border-slate-700 h-full">
                    <Sidebar />
                </aside>

                {/* Main Content Area */}
                <div ref={scrollContainerRef} className="flex-1 transition-all flex flex-col min-w-0 bg-gray-50/50 dark:bg-gray-900/50 overflow-y-auto custom-scrollbar">
                    <header className="shrink-0 px-8 bg-background/20 sticky top-0 z-50 backdrop-blur-sm">
                        <Header />
                    </header>

                    <main className="flex-1">
                        <div className="max-w-5xl mx-auto md:mx-0 w-full">
                            <div className="px-4 sm:px-8 pt-5 pb-4">
                                <Outlet />
                            </div>
                            {/* Bottom Panel for Mobile/Tablet */}
                            <div className="xl:hidden mt-8">
                                <Panel className="w-full h-auto border-l-0 border-t pt-8 px-4" />
                            </div>
                        </div>
                    </main>
                </div>

                {/* Right Panel */}
                <aside className="transition-all shrink-0 hidden xl:block border-l dark:border-slate-700 h-full bg-white dark:bg-card">
                    <Panel className="w-[320px] custom-scrollbar" />
                </aside>
            </div>

            {/* Modals */}

            <ModalsContainer />

        </>
    )
}

export default RootLayout