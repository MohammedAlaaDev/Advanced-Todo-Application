import { Outlet } from "react-router"

const RootLayout = () => {
    return (
        <>
            <div>Test</div>
            <Outlet />
        </>
    )
}

export default RootLayout