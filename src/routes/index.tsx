import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Tasks from "@/pages/Tasks/Tasks";
import Members from "@/pages/Members/Members";
import Settings from "@/pages/Settings/Settings";
import Profile from "@/pages/Profile/Profile";
import NotFound from "@/pages/NotFound/NotFound";
import Task from "@/pages/Tasks/Task/Task";

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