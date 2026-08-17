import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Members from "@/pages/Members";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Task from "@/pages/Task";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            {
                path: "tasks",
                children: [
                    { index: true, element: <Tasks /> },
                    { path: ":id", element: <Task /> },
                ]
            },
            {
                path: "members",
                children: [
                    { index: true, element: <Members /> },
                    { path: ":id", element: <Profile /> }
                ]
            },
            { path: "settings", element: <Settings /> },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])