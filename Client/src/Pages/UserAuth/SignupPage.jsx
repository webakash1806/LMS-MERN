import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsPersonCircle, BsPersonFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout'
import { createAccount } from '../../Redux/Slices/AuthSlice';

const SignupPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [image, setImage] = useState('');
    const [registerData, setRegisterData] = useState({
        userName: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
    })

    function handleUserInput(e) {
        const { name, value } = e.target
        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    const getImage = (event) => {
        event.preventDefault()
        const uploadedImg = event.target.files[0]

        if (uploadedImg) {
            setRegisterData({
                ...registerData,
                avatar: uploadedImg
            })
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImg)
            fileReader.addEventListener('load', function () {
                setImage(this.result)
            })
        }
    }

    async function createNewAccount(e) {
        e.preventDefault()
        const { userName, fullName, email, password, confirmPassword, avatar } = registerData
        if (!userName || !fullName || !email || !password || !confirmPassword || !avatar) {
            return toast.error('Please fill all the fields!')
        }

        if (userName.length < 6) {
            return toast.error('User name is too short!')
        }

        if (fullName.length < 6) {
            return toast.error('Full name is too short!')
        }

        if (!email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            return toast.error('Email is Invalid!')
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            return toast.error('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!')
        }



        const formData = new FormData()
        formData.append('userName', userName)
        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        formData.append('avatar', avatar)

        const response = await dispatch(createAccount(formData))



        if (response?.payload?.success) {
            navigate("/zenstudy");
        }


        setRegisterData({
            userName: "",
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            avatar: "",
        })

        setImage('')
    }

    return (
        <HomeLayout>
            <div className='min-h-[100vh] flex pt-[2rem] justify-center text-white bg-[#15191d]'>
                <form noValidate onSubmit={createNewAccount} action="" className='relative flex flex-col items-center justify-center gap-[9px] my-8 bg-[#1A202A] p-4 rounded-lg rounded-tl-none shadow-md shadow-[#6D75DE]'>
                    <div className='flex items-center bg-[#1A202A] justify-between w-fit p-2 gap-3 pr-5 rounded-lg left-0 rounded-b-none absolute top-[-2.7rem] text-[1.1rem]'>
                        <BsPersonFill className='text-[#BEC1FC] text-[1.3rem]' />
                        <h1 className='tracking-wide'>Register</h1>
                    </div>
                    <label htmlFor="image_uploads" className='cursor-pointer'>
                        {
                            image ? <img src={image} alt="" className='w-[3.8rem] h-[3.8rem] border-[2px] border-[#FFB827] rounded-full' /> :
                                <BsPersonCircle className='w-[3.8rem] h-[3.8rem]' />
                        }
                    </label>
                    <input onChange={getImage} type="file" id='image_uploads' name='image_uploads' className='hidden' accept='.jpg, .jpeg, .png, .svg' />
                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="userName" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>UserName
                        </label>
                        <input type="text" required
                            className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                            name='userName'
                            id='userName'
                            placeholder='Enter User Name...'
                            onChange={handleUserInput}
                            value={registerData.userName} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="fullName" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Full Name
                        </label>
                        <input type="text" required
                            className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                            name='fullName'
                            id='fullName'
                            placeholder='Enter Full Name...'
                            onChange={handleUserInput}
                            value={registerData.fullName} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="email" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Email
                        </label>
                        <input type="email" required
                            className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                            name='email'
                            id='email'
                            placeholder='Enter Email...'
                            onChange={handleUserInput}
                            value={registerData.email} />
                    </div>

                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="password" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Password
                        </label>
                        <input type="password" required
                            className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                            name='password'
                            id='password'
                            placeholder='Enter Password...'
                            onChange={handleUserInput}
                            value={registerData.password} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="confirmPassword" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Confirm Password
                        </label>
                        <input type="password" required
                            className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                            name='confirmPassword'
                            id='confirmPassword'
                            placeholder='Enter Confirm Password...'
                            onChange={handleUserInput}
                            value={registerData.confirmPassword} />
                    </div>
                    <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Register</button>

                    <p className='mt-2'>Already have an account? <Link to='/zenstudy/login' className='underline text-[#FFB827]'>Login</Link></p>
                </form>

            </div>
        </HomeLayout>
    )
}

export default SignupPage
