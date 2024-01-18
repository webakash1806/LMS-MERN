import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import uploadImg from '../../assets/uploadImg.gif'
import HomeLayout from '../../Layouts/HomeLayout'
import { updateCourse } from '../../Redux/Slices/CourseSlice'

const UpdateCourse = () => {

    const courseData = useLocation().state
    const courseId = courseData._id
    console.log(courseId)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [input, setInput] = useState({
        title: courseData?.title,
        category: courseData?.category,
        createdBy: courseData?.createdBy,
        description: courseData?.description,
        price: courseData?.price,
        discount: courseData?.discount,
        skills: courseData?.skills,
        language: courseData?.language,
        thumbnail: courseData?.thumbnail,
        courseImage: courseData?.thumbnail?.secure_url
    })


    function getCourseImage(e) {
        e.preventDefault()

        const uploadedImage = e.target.files[0]

        if (uploadedImage) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load', function () {
                setInput({
                    ...input,
                    courseImage: this.result,
                    thumbnail: uploadedImage
                })
            })
        }
    }

    function handleCourseInput(e) {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }

    const addCourse = async (e) => {
        e.preventDefault()

        const { title, description, category, createdBy, thumbnail, price, discount, skills, language } = input

        if (!title || !description || !category || !createdBy || !thumbnail || !price || !discount || !skills || !language) {
            return toast.error("Please fill all fields!")
        }

        let formData = new FormData()
        formData.set('title', title)
        formData.set('description', description)
        formData.set('category', category)
        formData.set('createdBy', createdBy)
        formData.set('thumbnail', thumbnail)
        formData.set('price', price)
        formData.set('discount', discount)
        formData.set('skills', skills)
        formData.set('language', language)

        const data = [courseId, formData]

        const response = await dispatch(updateCourse(data))

        if (response?.payload?.success) {
            navigate('/LMS-Client/course')

        }

    }

    return (
        <HomeLayout>
            <div className='flex items-center justify-center min-h-[90vh] bg-gradient-to-b from-[#854ede] to-[#18b5cd] p-10 md:px-1'>
                <form onSubmit={addCourse}
                    className='text-white bg-[#1A202A] p-4 rounded-lg relative rounded-tl-none mt-8 sm:p-12 sm:pt-6 md:p-10 md:px-5 items-center justify-center md:justify-between md:items-start flex flex-col md:flex-row gap-5 lg:gap-10 md:grid-cols-2 lg:px-8 '
                >
                    <div className='flex flex-col gap-6'>
                        <div className='flex items-center bg-[#1A202A] justify-between w-fit p-2 gap-6 pr-5 rounded-lg left-0 rounded-b-none absolute top-[-2.7rem] text-[1.1rem]'>
                            <Link onClick={() => navigate(-1)}
                                className=' p-1 rounded-tl-lg rounded-sm  bg-[#653aab]'>
                                <BsArrowLeft />
                            </Link>
                            <h1 className='tracking-wide'>Update <span className='text-[#BEC1FC] font-[500]'>Course</span></h1>
                        </div>
                        <div>
                            <label htmlFor="image_uploads" className='capitalize cursor-pointer text-[#828D9A] font-semibold text-[0.9rem]  tracking-wide'>
                                <p className='mb-1'>Upload course thumbnail</p>
                                {
                                    input.courseImage ? <img src={input.courseImage} alt="" className='border w-[17.5rem] sm:w-[23rem] sm:h-[12rem] md:w-[43vw] lg:w-[28rem] h-[9rem] rounded object-cover' /> :
                                        <img src={uploadImg} alt="" className='border w-[17.5rem] sm:w-[23rem] sm:h-[12rem] md:w-[43vw] lg:w-[28rem] h-[9rem] rounded object-cover' />
                                }
                            </label>
                            <input onChange={getCourseImage} type="file" id='image_uploads' name='image_uploads' className='hidden' accept='.jpg, .jpeg, .png, .svg' />
                        </div>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="title"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem] tracking-wide'
                            >Title</label>
                            <input
                                className='w-full rounded-[3px] border border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide'
                                type="text" name='title' id='title' placeholder='Enter course title'
                                onChange={handleCourseInput}
                                value={input.title} />
                        </div>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="description"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem]  tracking-wide'
                            >description</label>
                            <textarea
                                className='w-full rounded-[3px] border md:h-[13.2rem] h-[9rem] border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                type="text" name='description' id='description' placeholder='Enter course description'
                                onChange={handleCourseInput}
                                value={input.description} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>

                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="category"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem] tracking-wide'
                            >category</label>
                            <input
                                className='w-full rounded-[3px] border border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide'
                                type="text" name='category' id='category' placeholder='Enter course category'
                                onChange={handleCourseInput}
                                value={input.category} />
                        </div>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="title"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem] tracking-wide'
                            >created By</label>
                            <input
                                className='w-full rounded-[3px] border border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide'
                                type="text" name='createdBy' id='createdBy' placeholder='Enter course Expert'
                                onChange={handleCourseInput}
                                value={input.createdBy} />
                        </div>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="skills"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem]  tracking-wide'
                            >skills</label>
                            <textarea
                                className='w-full rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                type="text" name='skills' id='skills' placeholder='skills'
                                onChange={handleCourseInput}
                                value={input.skills} />
                        </div>

                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="price"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem] tracking-wide'
                            >price before discount</label>
                            <input
                                className='w-full rounded-[3px] border border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide'
                                type="text" name='price' id='price' placeholder='Enter course price'
                                onChange={handleCourseInput}
                                value={input.price} />
                        </div>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="discount"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem] tracking-wide'
                            >discount</label>
                            <div className='flex items-center justify-between gap-12'>

                                <label
                                    className='flex items-center justify-center text-white text-[0.95rem] gap-2'
                                    htmlFor="discount"><input type="radio" name="discount" id="discount" onChange={handleCourseInput} value='25' />
                                    25%</label>
                                <label
                                    className='flex items-center justify-center text-white text-[0.95rem] gap-2'
                                    htmlFor="discount"><input type="radio" name="discount" id="discount" onChange={handleCourseInput} value='50' />
                                    50%</label><label
                                        className='flex items-center justify-center text-white text-[0.95rem] gap-2'
                                        htmlFor="discount"><input type="radio" name="discount" id="discount" onChange={handleCourseInput} value='75' />
                                    75%</label>
                            </div>
                        </div>
                        <div className='w-[17.5rem] sm:w-[23rem] md:w-[43vw] lg:w-[28rem] flex flex-col items-start gap-1'>
                            <label htmlFor="language"
                                className='capitalize cursor-pointer text-[#a6b0bb] font-semibold text-[0.9rem] tracking-wide'
                            >language</label>
                            <div className='flex items-center justify-between gap-8'>

                                <label
                                    className='flex items-center justify-center text-white text-[0.95rem] gap-2'
                                    htmlFor="language"><input type="radio" name="language" id="language" onChange={handleCourseInput} value='Hindi' />
                                    Hindi</label>
                                <label
                                    className='flex items-center justify-center text-white text-[0.95rem] gap-2'
                                    htmlFor="language"><input type="radio" name="language" id="language" onChange={handleCourseInput} value='English' />
                                    English</label>
                                <label
                                    className='flex items-center justify-center text-white text-[0.95rem] gap-2'
                                    htmlFor="language"><input type="radio" name="language" id="language" onChange={handleCourseInput} value='Hinglish' />
                                    Hinglish</label>
                            </div>
                        </div>
                        <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Update Course</button>
                    </div>


                </form>
            </div>
        </HomeLayout>
    )
}

export default UpdateCourse
