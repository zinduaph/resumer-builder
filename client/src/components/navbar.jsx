import logo from '../assets/plan-list-svgrepo-com.svg'
import { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'
const NavBar = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
     const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <>
        <div className="shadow bg-white">
            <nav className="flex items-center justify-between maw-w-7xl max-auto px-4 py-3.5 text-slate-800 trantion-all">
             <Link to='/'>
             <img src={logo} className='w-20' alt="" />
             </Link>

             <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden'>Hi {user?.name}</p>
                <button onClick={handleLogout} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full'>logout</button>
             </div>
            </nav>

        </div>

        </>
    )
}
export default NavBar