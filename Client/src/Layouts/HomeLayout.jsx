import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../Components/Footer'
import { logout } from '../Redux/Slices/AuthSlice'

const HomeLayout = ({ children }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)

    const role = useSelector((state) => state?.auth?.role)

    useEffect(() => {

    }, [isLoggedIn, role])

    const handleLogout = async (e) => {
        e.preventDefault()
        const res = await dispatch(logout())

        if (res?.payload?.success) {
            navigate("/LMS-Client")
        }
    }

    return (
        <>
            <div>
                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="w-full navbar bg-base-300">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2">Navbar Title</div>
                            <div className="flex-none hidden lg:block">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    <li><Link to='/LMS-Client'>Home</Link></li>

                                    {isLoggedIn && role === 'ADMIN' && (
                                        <li><Link to='/LMS-Client/admin/dashboard'>Dashboard</Link></li>
                                    )}
                                    {isLoggedIn && role === 'ADMIN' && (
                                        <li><Link to='/LMS-Client/course/create'>Create Course</Link></li>
                                    )}

                                    <li><Link to='/LMS-Client/course'>Course</Link></li>
                                    <li><Link to='/LMS-Client/about'>About</Link></li>
                                    <li><Link to='/LMS-Client/contact'>Contact</Link></li>

                                    {!isLoggedIn ?
                                        <div className='flex items-center justify-center gap-3 mt-1 '>
                                            <Link to='/LMS-Client/login' className='btn btn-primary btn-sm rounded-md px-5 text-[1.03rem] tracking-wide'>
                                                Login
                                            </Link>
                                            <Link to='/LMS-Client/register' className='btn btn-secondary btn-sm rounded-md px-5 text-[1.03rem] tracking-wide'>
                                                Register
                                            </Link>
                                        </div>
                                        :
                                        <div className='flex items-center justify-center gap-3 mt-1'>
                                            <Link to='/LMS-Client/me' className='btn btn-primary btn-sm rounded-md px-5 text-[1.03rem] tracking-wide'>
                                                Profile
                                            </Link>
                                            <Link to='/LMS-Client/logout' onClick={handleLogout} className='btn btn-secondary btn-sm rounded-md px-5 text-[1.03rem] tracking-wide'>
                                                Logout
                                            </Link>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* Page content here
                    Content */}
                        {children}

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200">
                            {/* Sidebar content here */}
                            <li><Link to='/LMS-Client'>Home</Link></li>
                            {isLoggedIn && role === 'ADMIN' && (
                                <li><Link to='/LMS-Client/admin/dashboard'>Dashboard</Link></li>
                            )}
                            {isLoggedIn && role === 'ADMIN' && (
                                <li><Link to='/LMS-Client/course/create'>Create Course</Link></li>
                            )}
                            <li><Link to='/LMS-Client/course'>Course</Link></li>
                            <li><Link to='/LMS-Client/about'>About</Link></li>
                            <li><Link to='/LMS-Client/contact'>Contact</Link></li>
                            {!isLoggedIn ?
                                <div className='flex items-center justify-center gap-3 mt-4 '>
                                    <Link to='/LMS-Client/login' className='btn btn-primary btn-sm rounded-md px-9 text-[1.03rem] tracking-wide'>
                                        Login
                                    </Link>
                                    <Link to='/LMS-Client/register' className='btn btn-secondary btn-sm rounded-md px-9 text-[1.03rem] tracking-wide'>
                                        Register
                                    </Link>
                                </div>
                                :
                                <div className='flex items-center justify-center gap-3 mt-4 '>
                                    <Link to='/LMS-Client/me' className='btn btn-primary btn-sm rounded-md px-9 text-[1.03rem] tracking-wide'>
                                        Profile
                                    </Link>
                                    <Link to='/LMS-Client/logout' onClick={handleLogout} className='btn btn-secondary btn-sm rounded-md px-9 text-[1.03rem] tracking-wide'>
                                        Logout
                                    </Link>
                                </div>
                            }
                        </ul>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default HomeLayout
