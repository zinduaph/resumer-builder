import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar"
import { useSelector } from "react-redux"
import Loader from "../components/loader"
import Login from "./login"


const Layout = () => {
    const {user,loading} = useSelector((state) => state.auth)

if(loading) {
    return <Loader />
}

    return (
        <>
        
       <div>
        {user ? (<div className="min-h-screen bg-gray-50">
            <NavBar />
            <Outlet />
        </div>) : <Login />}
         
       </div>
        </>
    )
}
export default Layout