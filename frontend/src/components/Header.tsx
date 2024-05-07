
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import LogoutBtn from './LogoutBtn'
import { useEffect, useState } from 'react'

const Header = () => {
  const { isLoggedIn } = useAppContext()
  const [navbar, setNavBar] = useState(false);


  function changeBackground() {
    if (window.scrollY >= 50) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  }

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <header className={` py-6 fixed w-full z-90 ${navbar ? "bg-blue-700 ease-in-out duration-300 z-10 shadow-lg backdrop-blur-9" : "bg-transparent ease-in-out duration-300"}`}>
      <div className='container mx-auto flex items-center justify-center md:justify-between gap-4'>
        <span className="text-white text-3xl font-semibold tracking-tight">
          <Link to="/" className=''>Duplex</Link>
        </span>

        <span className='flex space-x-2'>
          {isLoggedIn ? <>
            <Link className='border-none ml-2 px-2 py-1 md:px-4 md:py-2 bg-teal-950 hover:bg-teal-900 text-white font-bold' to="/my-bookings">My Bookings</Link>
            <Link className='border-none px-2 py-1 md:px-4 md:py-2 bg-teal-950 hover:bg-teal-900 text-white font-bold' to="/my-hotels">My Hotels</Link>
            <LogoutBtn />
          </> : <>
            <Link to="/login"
              className='bg-transparent text-white px-3 py-1 md:px-6 md:py-2 rounded-lg flex items-center border-2 border-white font-bold hover:text-black hover:bg-white'>Sign In
            </Link>
            <Link to="/register"
              className='bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-lg flex items-center font-bold hover:bg-transparent border-2 hover:border-white'>Sign Up
            </Link>
          </>}

        </span>
      </div>
    </header>
  )
}

export default Header