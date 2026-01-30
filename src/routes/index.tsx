import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Dashboard /> }
        ]
    }
])