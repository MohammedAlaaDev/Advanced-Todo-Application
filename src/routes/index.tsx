import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Projects from "@/pages/Projects/Projects";
import Members from "@/pages/Members/Members";
import Settings from "@/pages/Settings/Settings";
import Profile from "@/pages/Profile/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "projects", element: <Projects /> },
            { path: "members", element: <Members /> },
            { path: "profile", element: <Profile /> },
            { path: "settings", element: <Settings /> }
        ]
    }
])