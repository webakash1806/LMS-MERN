import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CourseCard from '../../Components/CourseCard'
import HomeLayout from '../../Layouts/HomeLayout'
import { getAllCourses } from '../../Redux/Slices/CourseSlice'

const CourseList = () => {
    const dispatch = useDispatch()

    const { courseData } = useSelector((state) => state.course)

    async function loadCourse() {
        await dispatch(getAllCourses())
    }

    useEffect(() => {
        loadCourse()
    }, [])
    return (
        <HomeLayout>
            <div className='min-h-[90vh] flex flex-col items-center justify-center'>
                <h1 className='p-6 text-[1.5rem] font-semibold text-white text-center'>Explore the Course by
                    <span className='text-[#F6C915] text-[1.65rem]'> Industry Experts</span></h1>
                <div className='flex flex-wrap gap-6 lg:w-[80vw] items-center justify-center'>
                    {courseData?.map((res) => {
                        return <CourseCard key={res._id} data={res} />
                    })}
                </div>

            </div>
        </HomeLayout>
    )
}

export default CourseList
