import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import uploadImg from '../../assets/uploadImg.gif'
import HomeLayout from '../../Layouts/HomeLayout'
import { addCourseLectures } from '../../Redux/Slices/LectureSlice'



const AddLecture = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const courseData = useLocation().state
    const courseId = courseData._id
    console.log(courseId)

    const [input, setInput] = useState({
        title: "",
        description: "",
        lecture: null,
        lectureVideo: ""
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

    const addLecture = async (e) => {
        e.preventDefault()

        const { title, description, lecture } = input

        if (!title || !description || !lecture) {
            return toast.error("Please fill all fields!")
        }

        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('lecture', lecture)

        const data = [courseId, formData]
        const response = await dispatch(addCourseLectures(data))

        if (response?.payload?.success) {
            setInput({
                title: "",
                category: "",
                lecture: null,
                lectureVideo: ""
            })
            navigate('/LMS-Client/course')

        }


    }

    return (
        <HomeLayout>
            <div className='flex items-center justify-center min-h-[90vh] bg-gradient-to-b from-[#854ede] to-[#18b5cd] p-10 md:px-1'>
                <form onSubmit={addLecture}
                    className='text-white bg-[#1A202A] p-4 rounded-lg relative rounded-tl-none mt-8 sm:p-12 sm:pt-6 md:p-10 md:px-5 items-center justify-center md:justify-between md:items-start flex flex-col md:flex-row gap-5 lg:gap-10 md:grid-cols-2 lg:px-8 '
                >
                    <div className='flex flex-col gap-6'>
                        <div className='flex items-center bg-[#1A202A] justify-between w-fit p-2 gap-6 pr-5 rounded-lg left-0 rounded-b-none absolute top-[-2.7rem] text-[1.1rem]'>
                            <Link onClick={() => navigate(-1)}
                                className=' p-1 rounded-tl-lg rounded-sm  bg-[#653aab]'>
                                <BsArrowLeft />
                            </Link>
                            <h1 className='tracking-wide'>Create <span className='text-[#BEC1FC] font-[500]'>Lecture</span></h1>
                        </div>
                        <div>
                            <label htmlFor="lecture" className='capitalize cursor-pointer text-[#828D9A] font-semibold text-[0.9rem]  tracking-wide'>
                                <p className='mb-1'>Upload lecture video</p>
                                {
                                    input.lectureVideo ? <video controls controlsList='nodownload' src={input.lectureVideo} alt="" className='border w-[17.5rem] sm:w-[23rem] sm:h-[12rem] md:w-[43vw] lg:w-[28rem] h-[9rem] rounded object-cover' /> :
                                        <img src={uploadImg} alt="" className='border w-[17.5rem] sm:w-[23rem] sm:h-[12rem] md:w-[43vw] lg:w-[28rem] h-[9rem] rounded object-cover' />
                                }
                            </label>
                            <input onChange={getLectureVideo} type="file" id='lecture' name='lecture' className='hidden' accept='.mp4' />
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
                    <div className='flex flex-col gap-6'>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="description"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem]  tracking-wide'
                            >description</label>
                            <textarea
                                className='w-full rounded-[3px] border md:h-[13.2rem] h-[9rem] border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                type="text" name='description' id='description' placeholder='Enter lecture description'
                                onChange={handleLectureInput}
                                value={input.description} />
                        </div>
                        <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Create Lecture</button>
                    </div>


                </form>
            </div>
        </HomeLayout>
    )
}

export default AddLecture
