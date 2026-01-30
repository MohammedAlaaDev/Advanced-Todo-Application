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
            <div className="flex-1 flex flex-col min-w-0 bg-gray-50/50 overflow-y-auto scrollbar-hide">
                <header className="shrink-0 px-8 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                    <Header />
                </header>

                <main className="flex-1 px-8 pb-8">
                    <div className="max-w-5xl mx-auto md:mx-0 w-full">
                        <Outlet />

                        {/* Right Panel for Mobile/Tablet */}
                        <div className="xl:hidden mt-8">
                            <RightPanel className="w-full h-auto border-l-0 border-t pt-8 px-0" />
                        </div>
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