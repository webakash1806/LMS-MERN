import React from 'react'
import toast from 'react-hot-toast'
import { BsPersonCircle, BsPersonFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '../Layouts/HomeLayout'
import { userProfile } from '../Redux/Slices/AuthSlice'
import { unsubscribe } from '../Redux/Slices/RazorpaySlice'

const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state?.auth?.data)

    const { avatar, email, fullName, role, userName } = userData

    async function handleCancellation() {
        toast("Initiating cancellation")
        await dispatch(unsubscribe())
        await dispatch(userProfile())

        toast.success("Cancellation completed")
        navigate('/LMS-Client')
    }

    return (
        <HomeLayout>
            <div className='min-h-[100vh] flex pt-[2rem] lg:pt-[4rem] justify-center text-white bg-gradient-to-b from-[#854ede] to-[#18b5cd]'>
                <form noValidate className='relative h-fit flex flex-col md:flex-row md:gap-[2rem] items-center justify-center gap-[9px] my-8 bg-[#1A202A] p-5 sm:p-10 rounded-lg rounded-tl-none shadow-md shadow-[#6D75DE]'>
                    <div className='flex items-center bg-[#1A202A] justify-between w-fit p-2 gap-3 pr-5 rounded-lg left-0 rounded-b-none absolute top-[-2.7rem] text-[1.1rem]'>
                        <BsPersonFill className='text-[#BEC1FC] text-[1.3rem]' />
                        <h1 className='tracking-wide'>Profile</h1>
                    </div>
                    <div className='flex gap-[12px] flex-col items-center md:items-start justify-start'>
                        <div className='md:mb-4'>
                            {
                                avatar?.secure_url ? <img src={avatar?.secure_url} alt="" className='w-[6rem] h-[6rem] border shadow-sm shadow-[#6D75DE] rounded-full' /> :
                                    <BsPersonCircle className='w-[6rem] h-[6rem] ' />
                            }
                        </div>
                        <div className="flex flex-col items-start justify-center gap-[0.5px]">
                            <label htmlFor="userName" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>UserName
                            </label>
                            <input type="text" readOnly disabled
                                className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                name='userName'
                                id='userName'
                                value={userName}
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-[0.5px]">
                            <label htmlFor="fullName" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Full Name
                            </label>
                            <input type="text" readOnly disabled
                                className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                name='fullName'
                                id='fullName'
                                placeholder='Enter Full Name...'
                                value={fullName}
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-[0.5px]">
                            <label htmlFor="email" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Email
                            </label>
                            <input type="email"
                                readOnly disabled
                                className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                name='email'
                                id='email'
                                placeholder='Enter Email...'
                                value={email}
                            />
                        </div>
                    </div>

                    <div className='flex gap-[9px] flex-col items-center justify-center'>

                        <div className="flex flex-col items-start justify-center gap-[0.5px]">
                            <label htmlFor="role" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Role
                            </label>
                            <input type="text" readOnly disabled
                                className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                name='role'
                                value={role}
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-[0.5px]">
                            <label htmlFor="subscription" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Subscription
                            </label>
                            <input type="text" readOnly disabled
                                className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                name='subscription'
                                value={userData?.subscription?.status === 'active' ? "Active" : "Inactive"}
                            />
                        </div>
                        <Link to={'/LMS-Client/profile/edit'} className='bg-[#FFB827] hover:bg-[#fbb66d] text-center duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Edit Profile</Link>
                        <Link to={'/LMS-Client/changePassword'} className='bg-[#FFB827] hover:bg-[#fbb66d] text-center duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Change Password</Link>
                        {userData?.subscription?.status === 'active' ?
                            <Link onClick={handleCancellation} className='bg-[#FFB827] hover:bg-[#fbb66d] text-center duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Unsubscribe</Link> : ""}
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Profile
