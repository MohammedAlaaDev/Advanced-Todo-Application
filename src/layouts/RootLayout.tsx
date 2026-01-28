import { Header } from "@/components/Header/Header"
import { RightPanel } from "@/components/RightPanel/RightPanel"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { Outlet } from "react-router"

const RootLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background font-sans text-foreground">
            {/* Left Sidebar - Fixed Width */}
            <aside className="w-[250px] shrink-0 hidden md:block border-r h-full">
                <Sidebar />
            </aside>

            {/* Main Content Area - Flex Grow */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-50/50">
                <header className="shrink-0 px-8 bg-gray-50/50">
                    <Header />
                </header>

                <main className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
                    <div className="max-w-5xl mx-auto md:mx-0 w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Right Sidebar - Fixed Width */}
            <aside className="w-[320px] shrink-0 hidden xl:block border-l h-full bg-white">
                <RightPanel />
            </aside>
        </div>
    )
}

export default RootLayout