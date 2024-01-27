import React, { useEffect, useState } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout'
import { deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/LectureSlice'

const Lectures = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { state } = useLocation()
    const courseId = state._id

    const { lectures } = useSelector((state) => state?.lecture)
    const { role } = useSelector((state) => state?.auth)


    const [currentLecture, setCurrentLecture] = useState(0)
    const getLecturesList = async () => {
        await dispatch(getCourseLectures(courseId))
    }

    console.log(currentLecture)

    const currentLectureData = { courseId: courseId, lecture: lectures[currentLecture] }
    console.log({ ...currentLectureData })

    const removeLecture = async (data) => {
        await dispatch(deleteCourseLecture(data))
        await dispatch(getCourseLectures(courseId))
    }


    useEffect(() => {
        if (!state) {
            return navigate('/zenstudy/course')
        }
        getLecturesList()
    }, [])
    return (
        <div className='h-[100vh] overflow-hidden'>
            <HomeLayout>
                <div className='w-full h-[90vh] overflow-x-hidden flex flex-col scrollbar  scrollbar-thumb-gray-900 scrollbar-track-gray-600 scrollbar-thin'>
                    <div className='flex flex-col items-center gap-2 mx-1 text-white md:items-start'>
                        {lectures && (lectures.length > 0) ?
                            <div className='flex flex-col items-center justify-center w-full gap-4 overflow-hidden  md:flex-row md:gap-0 md:items-start'>
                                <div className='md:h-[90vh] scrollbar  scrollbar-thumb-gray-900 scrollbar-track-gray-600 scrollbar-thin overflow-x-hidden md:overflow-y-scroll flex md:items-start md:justify-start items-center justify-center flex-col'>
                                    <div className='flex items-center justify-start p-3 md:px-12 md:w-[62vw] lg:w-[67vw] w-[97vw] gap-4 bg-[#0d0f12] shadow-[2px_2px_9px_#808080,-2px_-2px_1px_#3a3b3a] border border-[#4d64aeb7]'>
                                        <BsArrowLeftCircle onClick={() => navigate(-1)} className='text-[1.7rem] md:text-[2.5rem] cursor-pointer' />
                                        <p className='text-[1.45rem] line-clamp-1 w-[80vw] capitalize font-semibold ml-4'> {lectures && lectures[currentLecture]?.title}</p>
                                    </div>
                                    <div><video
                                        className='md:w-[62vw] lg:w-[67vw] w-[97vw] cursor-pointer'
                                        controls
                                        controlsList='nodownload'
                                        src={lectures && lectures[currentLecture]?.lecture?.secure_url}></video></div>
                                    <div className=' w-full h-fit md:w-[50vw] p-3 sm:px-6'>
                                        <p className='lg:text-[1.7rem] text-[1.2rem] font-semibold mb-3'>{state.title} - Batch</p>
                                        <p className='text-[0.95rem] tracking-wide md:w-[55vw] lg:w-[60vw] w-[90vw]  overflow-x-hidden text-slate-300'>{lectures && lectures[currentLecture]?.description}</p>
                                    </div>
                                </div>
                                <div className=' flex scroll-smooth flex-col md:h-[90vh] rounded-sm md:overflow-y-scroll overflow-x-hidden w-full md:w-[38vw] lg:w-[33vw]  scrollbar  scrollbar-thumb-gray-900 scrollbar-track-gray-600 scrollbar-thin '>
                                    {role === 'ADMIN' ? <div className='flex justify-end w-full p-4'><button onClick={() => navigate('/zenstudy/course/lecture/add', { state: { ...state } })} className='cursor-pointer bg-[#ffc400] font-semibold text-black p-1 px-5 rounded-md text-[1.1rem]'>Add lecture</button></div>
                                        : ""}
                                    {lectures.map((data, index) =>
                                        <div key={data._id} >
                                            <div
                                                className={`flex cursor-pointer flex-col items-start justify-center gap-2 p-4 shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a] ${index === currentLecture ? "bg-[#170b3e]" : "bg-[#15191E]"}`}
                                                onClick={() => setCurrentLecture(index)}>
                                                <p className='w-[90vw] md:w-[33vw] lg:w-[30vw] capitalize text-[1.1rem] font-semibold line-clamp-1'>{index + 1}. {data.title}</p>
                                                <p className='w-[90vw] md:w-[33vw] lg:w-[30vw] line-clamp-1 text-[0.95rem] tracking-wide'>{data.description}</p>
                                                {role === 'ADMIN' ?
                                                    (<div className='flex items-center justify-center gap-3 font-semibold '>
                                                        <button className='duration-300 rounded-[4px] p-1 px-3 bg-[#fc4e09] hover:bg-[#f44500]'
                                                            onClick={() => {
                                                                navigate('/zenstudy/course/lecture/update', { state: { ...currentLectureData } })
                                                                setCurrentLecture(index)
                                                            }}>Update</button>
                                                        <button className='duration-300 rounded-[4px] p-1 px-3 bg-[#e70000] hover:bg-[#e70000dd]' onClick={() => {
                                                            removeLecture([courseId, data._id])
                                                        }}>Delete</button>
                                                    </div>) :
                                                    ""}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div> : <div className='flex flex-col items-center justify-center w-full gap-4 p-4 mt-20'><p className='text-[1.3rem]'>No lectures found</p>
                                {role === 'ADMIN' ? <button onClick={() => navigate('/zenstudy/course/lecture/add', { state: { ...state } })}
                                    className='cursor-pointer bg-[#ffc400] font-semibold text-black p-1 px-5 rounded-md text-[1.1rem]'>Add lecture</button> : ''}
                            </div>
                        }                    </div>
                </div >
            </HomeLayout >
        </div>
    )
}

export default Lectures
