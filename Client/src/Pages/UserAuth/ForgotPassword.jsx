import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BsPersonFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout'
import { forgotPassword } from '../../Redux/Slices/AuthSlice'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: ""
    })

    function handleUserInput(e) {
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function login(e) {
        e.preventDefault()
        const { email } = loginData
        if (!email) {
            return toast.error('Please enter email')
        }


        if (!email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            return toast.error('Email is Invalid!')
        }

        const response = await dispatch(forgotPassword(loginData))
        console.log(response)

        if (response?.payload?.success) {
            navigate("/LMS-Client/login");
        }


        setLoginData({
            email: "",
            password: ""
        })

    }
    return (
        <HomeLayout>
            <div className='min-h-[90vh] flex items-center justify-center pb-20 text-white bg-[#15191d]'>
                <form noValidate onSubmit={login} action="" className='relative h-fit py-8 flex flex-col items-center justify-center gap-[9px] mt-12 bg-[#1A202A] p-4 rounded-lg rounded-tl-none shadow-md shadow-[#6D75DE]'>
                    <div className='flex items-center bg-[#1A202A] justify-between w-fit p-2 gap-3 pr-5 rounded-lg left-0 rounded-b-none absolute top-[-2.7rem] text-[1.1rem]'>
                        <BsPersonFill className='text-[#BEC1FC] text-[1.3rem]' />
                        <h1 className='tracking-wide'>Request Reset link</h1>
                    </div>

                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="email" className='text-[#a6b0bb] font-semibold text-[0.85rem] tracking-wide'>Email
                        </label>
                        <input type="email" required
                            className='min-w-[17rem] sm:w-[20.5rem] rounded-[3px] border h-full border-[#2d3a4b] p-2 focus:border-[#745FDC]  outline-none bg-transparent text-[0.95rem] tracking-wide resize-none'
                            name='email'
                            id='email'
                            placeholder='Enter registered email...'
                            onChange={handleUserInput}
                            value={loginData.email} />
                    </div>

                    <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Send reset link</button>
                    <p className='mt-2'>Don&#39;t have an account? <Link to='/zenstudy/register' className='underline text-[#FFB827]'>Register</Link></p>

                </form>

            </div>
        </HomeLayout>
    )
}

export default ForgotPassword
