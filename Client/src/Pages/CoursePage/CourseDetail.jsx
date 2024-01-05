import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout'

const CourseDetail = () => {
    const { state } = useLocation()

    console.log(state)

    useEffect(() => {

    }, [])

    return (
        <HomeLayout>
            <div className='flex flex-col text-white items-center gap-6  p-5 py-8 sm:px-20 md:px-4 lg:px-[10rem]'>
                <div className='flex flex-col md:w-[90%] md:flex-row-reverse w-full items-center justify-around md:justify-between gap-3'>
                    <img
                        className='min-w-[95%] sm:min-w-[90%] md:min-w-[20rem]  border h-[11rem] sm:h-[13rem] md:h-[11rem] rounded-md object-cover'
                        src={state?.thumbnail?.secure_url} alt={`${state?.title} thumbnail`} />
                    <div className=' w-[95%] sm:w-[90%] md:w-[60vw]'>
                        <h2 className='text-[1.5rem] capitalize font-[600] tracking-wide '>{state?.title}</h2>
                        <p className='text-[0.95rem] text-[#dbdbdb] my-2'>{state?.description}</p>
                        <button className='bg-[#FF6700] hover:bg-[#f94b00] duration-300 p-2 mt-4 px-10 text-[1.1rem] font-semibold rounded-md'>Enroll now.</button>
                    </div>
                </div>
                <div className='flex flex-col w-[95%] sm:w-[90%] sm:flex-row sm:justify-around rounded-md bg-transparent shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a] p-2 flex-wrap items-start justify-center md:gap-6'>
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
            </div>
        </HomeLayout>
    )
}

export default CourseDetail
