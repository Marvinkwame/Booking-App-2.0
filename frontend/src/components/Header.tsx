
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import LogoutBtn from './LogoutBtn'

const Header = () => {
    const { isLoggedIn } = useAppContext()
    return (
        <header className='bg-transparent py-6 fixed w-full z-90'>
            <div className='container mx-auto flex items-center justify-between'>
                <span className="text-white text-3xl font-semibold tracking-tight">
                    <Link to="/" className=''>Duplex</Link>
                </span>

                <span className='flex space-x-2'>
                    {isLoggedIn ? <>
                        <Link className='border-none px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white font-bold' to="/bookings">My Bookings</Link>
                        <Link className='border-none px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white font-bold' to="/my-hotels">My Hotels</Link>
                        <LogoutBtn />
                    </> : <><Link to="/login"
                        className='bg-transparent text-white px-6 py-2 rounded-lg flex items-center border-2 border-white font-bold hover:text-black hover:bg-white'>Sign In
                    </Link>
                        <Link to="/register"
                            className='bg-white text-black px-6 py-2 rounded-lg flex items-center font-bold hover:bg-transparent border-2 hover:border-white'>Sign Up
                        </Link></>}

                </span>
            </div>
        </header>
    )
}

export default Header