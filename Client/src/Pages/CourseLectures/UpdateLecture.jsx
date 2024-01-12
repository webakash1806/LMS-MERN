import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import uploadImg from '../../assets/uploadImg.gif'
import HomeLayout from '../../Layouts/HomeLayout'
import { getCourseLectures, updateCourseLecture } from '../../Redux/Slices/LectureSlice'

const UpdateLecture = () => {

    const state = useLocation().state
    console.log(state)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const courseId = state.courseId
    const lecture = state?.lecture

    console.log(lecture?._id)

    const [input, setInput] = useState({
        title: lecture?.title,
        description: lecture?.description,
        lecture: lecture?.lecture,
        lectureVideo: lecture?.lecture?.secure_url
    })

    function getLectureVideo(e) {
        e.preventDefault()

        const uploadedVideo = e.target.files[0]
        if (uploadedVideo) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedVideo)
            fileReader.addEventListener('load', function () {
                setInput({
                    ...input,
                    lectureVideo: this.result,
                    lecture: uploadedVideo
                })
            })
        }
    }


    function handleLectureInput(e) {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }

    console.log(lecture._id)
    const lectureId = lecture?._id

    const updateLecture = async (e) => {
        e.preventDefault()

        const { title, description, lecture } = input

        console.log(title)

        if (!title || !description || !lecture) {
            return toast.error("Please fill all fields!")
        }

        let formData = new FormData()
        formData.set('title', title)
        formData.set('description', description)
        formData.set('lecture', lecture)


        console.log(formData)
        const data = [courseId, lectureId, formData]
        console.log(data)
        const response = await dispatch(updateCourseLecture(data))
        await dispatch(getCourseLectures(data[0]))
        console.log(response)
        if (response?.payload?.success) {
            navigate(-1)

        }


    }

    return (
        <HomeLayout>
            <div className='flex items-center justify-center min-h-[90vh] bg-gradient-to-b from-[#854ede] to-[#18b5cd] p-10 md:px-1'>
                <form onSubmit={updateLecture}
                    className='text-white bg-[#1A202A] p-4 rounded-lg relative rounded-tl-none mt-8 sm:p-12 sm:pt-6 md:p-10 md:px-5 items-center justify-center md:justify-between md:items-start flex flex-col md:flex-row gap-5 lg:gap-10 md:grid-cols-2 lg:px-8 '
                >
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center bg-[#1A202A] justify-between w-fit p-2 gap-6 pr-5 rounded-lg left-0 rounded-b-none absolute top-[-2.7rem] text-[1.1rem]'>
                            <Link onClick={() => navigate(-1)}
                                className=' p-1 rounded-tl-lg rounded-sm  bg-[#653aab]'>
                                <BsArrowLeft />
                            </Link>
                            <h1 className='tracking-wide'>Update <span className='text-[#BEC1FC] font-[500]'>Lecture</span></h1>
                        </div>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem]'>
                            <label htmlFor="lecture" className='capitalize cursor-pointer text-[#828D9A] font-semibold text-[0.9rem]  tracking-wide'>
                                <p className='mb-1'>Upload lecture video</p>
                                {
                                    input.lectureVideo ?

                                        (
                                            <video
                                                muted
                                                src={input.lectureVideo}
                                                controls
                                                controlsList="nodownload nofullscreen"
                                                disablePictureInPicture
                                                className='border w-[17.5rem] sm:w-[23rem] sm:h-[12rem] md:w-[43vw] lg:w-[28rem] h-[9rem] rounded object-fill'
                                            >

                                            </video>
                                        )
                                        : <img src={uploadImg} alt="" className='border w-[17.5rem] sm:w-[23rem] sm:h-[12rem] md:w-[43vw] lg:w-[28rem] h-[9rem] rounded object-cover' />
                                }
                            </label>
                            <input onChange={getLectureVideo} type="file" id='lecture' name='lecture' className='cursor-pointer border border-[#2d3a4b] p-2 focus:border-[#745FDC] w-full  outline-none' accept='.mp4' />
                        </div>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="title"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem] tracking-wide'
                            >Title</label>
                            <input
                                className='w-full rounded-[3px] border border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide'
                                type="text" name='title' id='title' placeholder='Enter lecture title'
                                onChange={handleLectureInput}
                                value={input.title} />
                        </div>

                    </div>
                    <div className='flex flex-col gap-8'>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="description"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem]  tracking-wide'
                            >description</label>
                            <textarea
                                className='w-full rounded-[3px] border md:h-[15.2rem] h-[9rem] border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                type="text" name='description' id='description' placeholder='Enter lecture description'
                                onChange={handleLectureInput}
                                value={input.description} />
                        </div>
                        <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Update Lecture</button>
                    </div>


                </form>
            </div>
        </HomeLayout>
    )
}

export default UpdateLecture
