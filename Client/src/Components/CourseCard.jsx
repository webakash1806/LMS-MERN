import React from 'react'
import { BsBook, BsCameraVideo, BsPersonVideo2 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ data }) => {

    console.log(data)

    const navigate = useNavigate()

    return (
        <div className='w-[17.5rem] h-[27rem] cursor-pointer flex mt-2 flex-col border items-start gap-2 rounded-md overflow-hidden'
            onClick={() => navigate("/LMS-Client/course/description", { state: { ...data } })}>
            <img className='w-full h-[40%] object-cover' src={data?.thumbnail?.secure_url} alt={`${data?.title} image`} />
            <div className='text-white flex flex-col gap-2 p-3'>
                <h2 className='text-[1.35rem] font-[600] capitalize'>{data?.title}</h2>
                <p className='text-[0.9rem] line-clamp-2'>{data?.description}</p>
                <div className='flex flex-wrap gap-2 mt-1'>
                    <div className='border w-fit p-1 px-2 rounded-full text-[0.95rem] flex gap-2 items-center '><BsPersonVideo2 /><span className='text-[0.7rem] tracking-wide'>{data?.createdBy}</span></div>
                    <div className='border w-fit p-1 px-2 rounded-full text-[0.95rem] flex gap-2 items-center '><BsBook /><span className='text-[0.7rem] tracking-wide'>{data?.category}</span></div>
                    <div className='border w-fit p-1 px-2 rounded-full text-[0.95rem] flex gap-2 items-center '><BsCameraVideo /><span className='text-[0.7rem] tracking-wide'>Total Lectures : {data?.numberOfLecture}</span></div>
                </div>
                {/* <div>
                    <div></div>
                    <div></div>
                </div> */}
            </div>
        </div>
    )
}

export default CourseCard
