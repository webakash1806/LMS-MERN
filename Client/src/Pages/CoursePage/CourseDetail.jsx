import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import discountImg from '../../assets/discount.png'
import eligibleImg from '../../assets/eligible.png'
import mailImg from '../../assets/mail.png'
import skillsImg from '../../assets/skills.png'
import videoImg from '../../assets/video.png'
import HomeLayout from '../../Layouts/HomeLayout'
import { deleteCourse } from '../../Redux/Slices/CourseSlice'

const CourseDetail = () => {
    const { state } = useLocation()
    const [coursePrice, setCoursePrice] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { role, data } = useSelector((state) => state?.auth)

    const courseId = state?._id
    console.log(courseId)

    const removeCourse = async (e) => {
        e.preventDefault()
        const response = await dispatch(deleteCourse(courseId))

        if (response?.payload?.success) {
            navigate('/LMS-Client/course')
        }
    }

    const priceAfterDiscount = () => {
        const { price, discount } = state
        const discountPrice = (discount / 100) * price
        const originalPrice = price - discountPrice
        setCoursePrice(originalPrice)
    }

    useEffect(() => {
        priceAfterDiscount()
    }, [])

    return (
        <HomeLayout>
            <div className='flex flex-col w-full items-center justify-center '>
                <div className='min-h-[90vh] w-full bg-gradient-to-b  overflow-x-hidden from-[#15191E]   to-[#111371ea]  flex flex-col text-white items-center gap-6 p-5 py-12 sm:px-20 md:px-4 lg:px-[10vw]'>
                    <div className='flex flex-col md:w-[90%] md:flex-row-reverse w-full items-center justify-around md:justify-between gap-3 md:gap-6'>
                        <img
                            className='min-w-[95%] sm:min-w-[90%] md:min-w-[20rem]  border h-[11rem] sm:h-[13rem] md:h-[11rem] rounded-md object-cover'
                            src={state?.thumbnail?.secure_url} alt={`${state?.title} thumbnail`} />
                        <div className=' w-[95%] sm:w-[90%] md:w-[60vw] lg:w-[40vw]'>
                            <h2 className='text-[1.8rem] capitalize font-[600] tracking-wide '>{state?.title}</h2>
                            <p className='text-[0.95rem] text-[rgb(219,219,219)] my-2 '>{state?.description}</p>

                            {role === 'ADMIN' || data?.subscription?.status === 'ACTIVE' ? (
                                <div className='flex flex-wrap gap-x-4'>
                                    <button className='bg-[#FF6700] hover:bg-[#f94b00] duration-300 p-2 mt-4 px-6 text-[1.1rem] font-semibold rounded-md'>Watch Lectures</button>
                                    {role === 'ADMIN' ?
                                        <div className='flex flex-wrap gap-x-4'> <button className='bg-[#FF6700] hover:bg-[#f94b00] duration-300 p-2 mt-4 px-6 text-[1.1rem] font-semibold rounded-md'>Update Course</button>
                                            <button onClick={removeCourse} className='bg-[#FF6700] hover:bg-[#f94b00] duration-300 p-2 mt-4 px-6 text-[1.1rem] font-semibold rounded-md'>Delete Course</button>
                                        </div>
                                        : ""}
                                </div>
                            ) :
                                (
                                    <div className='mt-5'>
                                        <div className='text-[1.15rem] font-semibold tracking-wide flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4' >
                                            <div className='flex items-center gap-3'><p>&#8377;{coursePrice.toFixed(2)}</p>
                                                <strike>{state?.price.toFixed(2)}</strike></div>
                                            <p className='text-[#00ff59] text-[1rem] flex items-center gap-2'><img src={discountImg} alt="" className='w-[19px]' />{`${state?.discount}% Discount`}</p>
                                        </div>
                                        <button className='bg-[#FF6700] hover:bg-[#f94b00] duration-300 p-2 mt-4 px-10 text-[1.1rem] font-semibold rounded-md'>Enroll now</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='mt-4 flex gap-2 flex-col w-[95%] sm:w-[90%] sm:flex-row sm:justify-evenly rounded-md bg-[#15191E] shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a] p-2 flex-wrap items-start justify-center md:gap-6'>
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
                        <div className=' sm:text-center p-2'>
                            <p className='text-[1.25rem] capitalize font-semibold tracking-wide'>10+</p>
                            <p className='text-[0.85rem] font text-[#dbdbdb] tracking-wide'>Hours of learning</p>
                        </div>
                    </div>
                    <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4'>
                        <div className='flex flex-col items-center w-[12rem]'>
                            <div className='p-[13px] w-fit rounded-full bg-[#C9F1FE]'><img className='w-[1.8rem]'
                                src={eligibleImg} alt='Eligibility image' /></div>
                            <p className='text-[1.15rem] capitalize font-semibold tracking-wide'>Minimum Eligibility</p>
                            <p className='text-[0.82rem] font text-[#dbdbdb] tracking-wide'>Anyone</p>
                        </div>
                        <div className='flex flex-col items-center w-[12rem]'>
                            <div className='p-[13px] w-fit rounded-full bg-[#FFF6E5]'><img className='w-[1.8rem]'
                                src={mailImg} alt='Eligibility image' /></div>
                            <p className='text-[1.15rem] capitalize font-semibold tracking-wide'>Email Support</p>
                            <p className='text-[0.82rem] font text-[#dbdbdb] tracking-wide'>lms@gmail.com</p>
                        </div>
                        <div className='flex flex-col items-center w-[12rem]'>
                            <div className='p-[13px] w-fit rounded-full bg-[#FEE7E9]'><img className='w-[1.8rem]'
                                src={skillsImg} alt='Eligibility image' /></div>
                            <p className='text-[1.15rem] capitalize font-semibold tracking-wide'>Skills You will gain</p>
                            <p className='text-[0.82rem] capitalize font text-[#dbdbdb] tracking-wide text-center'>{state?.skills}</p>
                        </div>
                        <div className='flex flex-col items-center w-[12rem]'>
                            <div className='p-[13px] w-fit rounded-full bg-[#E3EFE0]'><img className='w-[1.8rem]'
                                src={videoImg} alt='Eligibility image' /></div>
                            <p className='text-[1.15rem]  font-semibold tracking-wide'>Lecture Mode</p>
                            <p className='text-[0.82rem] capitalize font text-[#dbdbdb] tracking-wide'>Recorded</p>
                        </div>
                    </div>
                </div>
                <div className='w-full p-5 py-12 sm:px-20 md:px-[10vw] lg:px-[25vw]'>
                    <div className=" join join-vertical w-full rounded-md shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a]">
                        <div className="collapse collapse-arrow join-item border border-[#2d3a4b] bg-[#1A202A]">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                                Is the course live or recorded?
                            </div>
                            <div className="collapse-content text-white">
                                <p>All lectures are recorded.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border border-[#2d3a4b] bg-[#1A202A]">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                                Do the courses start from the basics ?
                            </div>
                            <div className="collapse-content text-white">
                                <p>Yes every course starts from the very basics until it is specifically mentioned otherwise.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDetail
