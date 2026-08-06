import Profile from "../components/Profile"

import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <Profile />

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout