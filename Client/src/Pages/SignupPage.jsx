import React, { useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import HomeLayout from '../Layouts/HomeLayout'

const SignupPage = () => {

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
                console.log(this.result)
            })
        }
    }

    return (
        <HomeLayout>
            <div className='h-[100vh] flex items-center justify-center text-white'>
                <form action="" className='flex flex-col items-center justify-center gap-[8px] bg-black p-4 rounded-lg shadow-md shadow-[#ffb7275a]'>
                    <h1 className='font-semibold text-[1.4rem] tracking-[0.6px]'>Register</h1>
                    <label htmlFor="image_uploads" className='cursor-pointer'>
                        {
                            image ? <img src={image} alt="" className='w-[3.8rem] h-[3.8rem] border-[2px] border-[#FFB827] rounded-full' /> :
                                <BsPersonCircle className='w-[3.8rem] h-[3.8rem]' />
                        }
                    </label>
                    <input onChange={getImage} type="file" id='image_uploads' name='image_uploads' className='hidden' accept='.jpg, .jpeg, .png, .svg' />
                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="userName" className='text-[0.82rem] font-semibold'>UserName
                        </label>
                        <input type="text" required
                            className='p-1 px-2 rounded-md text-[0.92rem] min-w-[17rem] sm:w-[19.5rem] outline-none shadow-sm shadow-[#FFB827] text-[#FFB827] bg-[#2c2c2ca1]'
                            name='userName'
                            id='userName'
                            placeholder='Enter User Name...'
                            onChange={handleUserInput}
                            value={registerData.userName} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="fullName" className='text-[0.82rem] font-semibold'>Full Name
                        </label>
                        <input type="text" required
                            className='p-1 px-2 rounded-md text-[0.92rem] min-w-[17rem] sm:w-[19.5rem] outline-none shadow-sm shadow-[#FFB827] text-[#FFB827] bg-[#2c2c2ca1]'
                            name='fullName'
                            id='fullName'
                            placeholder='Enter Full Name...'
                            onChange={handleUserInput}
                            value={registerData.fullName} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="email" className='text-[0.82rem] font-semibold'>Email
                        </label>
                        <input type="email" required
                            className='p-1 px-2 rounded-md text-[0.92rem] min-w-[17rem] sm:w-[19.5rem] outline-none shadow-sm shadow-[#FFB827] text-[#FFB827] bg-[#2c2c2ca1]'
                            name='email'
                            id='email'
                            placeholder='Enter Email...'
                            onChange={handleUserInput}
                            value={registerData.email} />
                    </div>

                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="password" className='text-[0.82rem] font-semibold'>Password
                        </label>
                        <input type="password" required
                            className='p-1 px-2 rounded-md text-[0.92rem] min-w-[17rem] sm:w-[19.5rem] outline-none shadow-sm shadow-[#FFB827] text-[#FFB827] bg-[#2c2c2ca1]'
                            name='password'
                            id='password'
                            placeholder='Enter Password...'
                            onChange={handleUserInput}
                            value={registerData.password} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="confirmPassword" className='text-[0.82rem] font-semibold'>Confirm Password
                        </label>
                        <input type="password" required
                            className='p-1 px-2 rounded-md text-[0.92rem] min-w-[17rem] sm:w-[19.5rem] outline-none shadow-sm shadow-[#FFB827] text-[#FFB827] bg-[#2c2c2ca1]'
                            name='confirmPassword'
                            id='confirmPassword'
                            placeholder='Enter Confirm Password...'
                            onChange={handleUserInput}
                            value={registerData.confirmPassword} />
                    </div>
                    <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Register</button>

                    <p className='mt-2'>Already have an account? <Link to='LMS-Client/login' className='underline text-[#FFB827]'>Login</Link></p>
                </form>

            </div>
        </HomeLayout>
    )
}

export default SignupPage
