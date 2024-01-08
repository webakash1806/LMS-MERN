import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BsPersonCircle, BsPersonFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '../Layouts/HomeLayout'
import { editProfile, userProfile } from '../Redux/Slices/AuthSlice'

const EditProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setImage] = useState('')
    const [data, setData] = useState({
        fullName: "",
        avatar: "",
        userId: useSelector((state) => state?.auth?.data?._id)
    })

    const userData = useSelector((state) => state?.auth?.data)
    const { avatar, email, fullName, role, userName } = userData


    function imgUpload(e) {
        e.preventDefault()
        const uploadedImg = event.target.files[0]

        if (uploadedImg) {
            setData({
                ...data,
                avatar: uploadedImg
            })
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImg)
            fileReader.addEventListener('load', function () {
                setImage(this.result)
            })
        }
    }

    function handleUpdateProfile(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    async function updateProfile(e) {
        e.preventDefault()

        if (!data?.fullName) {
            return toast.error("Full name is required!")
        }


        if (!data?.fullName.length > 6) {
            return toast.error("Name cannot be of less than 6 characters!")
        }

        const formData = new FormData()

        formData.append('fullName', data.fullName)
        formData.append('avatar', data.avatar)

        const response = await dispatch(editProfile([data.userId, formData]))

        await dispatch(userProfile())

        if (response?.payload?.success)
            navigate('/LMS-Client/me')
        setData({
            fullName: "",
            avatar: "",
        })
        setImage('')

    }

    return (
        <HomeLayout>
            <div className='min-h-[100vh] flex pt-[2rem] lg:pt-[4rem] justify-center text-white bg-gradient-to-b from-[#854ede] to-[#18b5cd]'>
                <form noValidate onSubmit={updateProfile} className='relative h-fit flex flex-col md:flex-row md:gap-[2rem] items-center justify-center gap-[9px] my-8 bg-[#1A202A] p-5 sm:p-10 rounded-lg rounded-tl-none shadow-md shadow-[#6D75DE]'>
                    <div className='flex items-center bg-[#1A202A] justify-between w-fit p-2 gap-3 pr-5 rounded-lg left-0 rounded-b-none absolute top-[-2.7rem] text-[1.1rem]'>
                        <BsPersonFill className='text-[#BEC1FC] text-[1.3rem]' />
                        <h1 className='tracking-wide'>Update Profile</h1>
                    </div>
                    <div className='flex gap-[12px] flex-col items-center md:items-start justify-start'>
                        <div className='md:mb-4'>
                            <label htmlFor="image_uploads" className='cursor-pointer'>
                                {
                                    image ? <img src={image} alt="" className='w-[3.8rem] h-[3.8rem] border-[2px] border-[#FFB827] rounded-full' /> :
                                        <img src={avatar?.secure_url} alt="" className='w-[3.8rem] h-[3.8rem] border-[2px] border-[#FFB827] rounded-full' />

                                }
                            </label>
                            <input onChange={imgUpload} type="file" id='image_uploads' name='image_uploads' className='hidden' accept='.jpg, .jpeg, .png, .svg' />

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
                            <input type="text" required
                                className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                                name='fullName'
                                id='fullName'
                                placeholder='Enter Full Name...'
                                onChange={handleUpdateProfile}
                                value={data.fullName}
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
                        <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] text-center duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Update Profile</button>

                    </div>
                </form>

            </div>
        </HomeLayout>
    )
}

export default EditProfile
