import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import eligibleImg from '../../assets/eligible.png'
import mailImg from '../../assets/mail.png'
import skillsImg from '../../assets/skills.png'
import videoImg from '../../assets/video.png'
import HomeLayout from '../../Layouts/HomeLayout'

const CourseDetail = () => {
    const { state } = useLocation()

    console.log(state)

    const { role, data } = useSelector((state) => state?.auth)

    useEffect(() => {

    }, [])

    return (
        <HomeLayout>
            <div className='bg-gradient-to-b from-[#15191E] from-35% via-[#1c0f25] via-65%  to-[#3d003e]  flex flex-col text-white items-center gap-6  p-5 py-8 sm:px-20 md:px-4 lg:px-[10rem]'>
                <div className='flex flex-col md:w-[90%] md:flex-row-reverse w-full items-center justify-around md:justify-between gap-3'>
                    <img
                        className='min-w-[95%] sm:min-w-[90%] md:min-w-[20rem]  border h-[11rem] sm:h-[13rem] md:h-[11rem] rounded-md object-cover'
                        src={state?.thumbnail?.secure_url} alt={`${state?.title} thumbnail`} />
                    <div className=' w-[95%] sm:w-[90%] md:w-[60vw]'>
                        <h2 className='text-[1.5rem] capitalize font-[600] tracking-wide '>{state?.title}</h2>
                        <p className='text-[0.95rem] text-[#dbdbdb] my-2'>{state?.description}</p>

                        {role === 'ADMIN' || data?.subscription?.status === 'ACTIVE' ? (
                            <button className='bg-[#FF6700] hover:bg-[#f94b00] duration-300 p-2 mt-4 px-10 text-[1.1rem] font-semibold rounded-md'>Watch Lectures</button>

                        ) :
                            <button className='bg-[#FF6700] hover:bg-[#f94b00] duration-300 p-2 mt-4 px-10 text-[1.1rem] font-semibold rounded-md'>Enroll now</button>
                        }
                    </div>
                </div>
                <div className='mt-4 flex gap-2 flex-col w-[95%] sm:w-[90%] sm:flex-row sm:justify-around rounded-md bg-[#15191E] shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a] p-2 flex-wrap items-start justify-center md:gap-6'>
                    <div className=' sm:text-center p-2'>
                        <p className='text-[1.25rem] capitalize font-semibold tracking-wide'>{state?.category}</p>
                        <p className='text-[0.85rem] font text-[#dbdbdb] tracking-wide'>Category</p>
                    </div>
                    <div className=' sm:text-center p-2'>
                        <p className='text-[1.25rem] capitalize font-semibold tracking-wide'>{state?.numberOfLecture}</p>
                        <p className='text-[0.85rem] font text-[#dbdbdb] tracking-wide'>Total Lectures</p>
                    </div>
                    <div className=' sm:text-center p-2'>
                        <p className='text-[1.25rem] capitalize font-semibold tracking-wide'>{state?.createdBy}</p>
                        <p className='text-[0.85rem] font text-[#dbdbdb] tracking-wide'>Instructor</p>
                    </div>
                </div>
                <div className='mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4'>
                    <div className='flex flex-col items-center w-[12rem]'>
                        <div className='p-[13px] w-fit rounded-full bg-[#C9F1FE]'><img className='w-[1.8rem]'
                            src={eligibleImg} alt='Eligibility image' /></div>
                        <p className='text-[1.15rem] capitalize font-semibold tracking-wide'>Minimum Eligibility</p>
                        <p className='text-[0.82rem] font text-[#dbdbdb] tracking-wide'>Instructor</p>
                    </div>
                    <div className='flex flex-col items-center w-[12rem]'>
                        <div className='p-[13px] w-fit rounded-full bg-[#FFF6E5]'><img className='w-[1.8rem]'
                            src={mailImg} alt='Eligibility image' /></div>
                        <p className='text-[1.15rem] capitalize font-semibold tracking-wide'>Email Support</p>
                        <p className='text-[0.82rem] font text-[#dbdbdb] tracking-wide'>Instructor</p>
                    </div>
                    <div className='flex flex-col items-center w-[12rem]'>
                        <div className='p-[13px] w-fit rounded-full bg-[#FEE7E9]'><img className='w-[1.8rem]'
                            src={skillsImg} alt='Eligibility image' /></div>
                        <p className='text-[1.15rem] capitalize font-semibold tracking-wide'>Skills You will gain</p>
                        <p className='text-[0.82rem] font text-[#dbdbdb] tracking-wide'>Instructor</p>
                    </div>
                    <div className='flex flex-col items-center w-[12rem]'>
                        <div className='p-[13px] w-fit rounded-full bg-[#E3EFE0]'><img className='w-[1.8rem]'
                            src={videoImg} alt='Eligibility image' /></div>
                        <p className='text-[1.15rem] capitalize font-semibold tracking-wide'>Lecture Mode</p>
                        <p className='text-[0.82rem] font text-[#dbdbdb] tracking-wide'>Instructor</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDetail
