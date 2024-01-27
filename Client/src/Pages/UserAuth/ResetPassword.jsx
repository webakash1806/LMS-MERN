import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BsPersonFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout'
import { resetPasswords } from '../../Redux/Slices/AuthSlice'

const ResetPassword = () => {

    const { resetToken } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        password: ""
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
        const { password } = loginData
        if (!password) {
            return toast.error('Please enter password!')
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            return toast.error('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!')
        }

        const data = [resetToken, loginData]

        const response = await dispatch(resetPasswords(data))
        console.log(response)

        if (response?.payload?.success) {
            navigate("/LMS-Client/login");
        }


        setLoginData({
            password: ""
        })

    }
    console.log(resetToken)

    return (
        <HomeLayout>
            <div className='min-h-[90vh] flex items-center justify-center pb-20 text-white bg-[#15191d]'>
                <form noValidate onSubmit={login} action="" className='relative h-fit py-8 flex flex-col items-center justify-center gap-[9px] mt-12 bg-[#1A202A] p-4 rounded-lg rounded-tl-none shadow-md shadow-[#6D75DE]'>
                    <div className='flex items-center bg-[#1A202A] justify-between w-fit p-2 gap-3 pr-5 rounded-lg left-0 rounded-b-none absolute top-[-2.7rem] text-[1.1rem]'>
                        <BsPersonFill className='text-[#BEC1FC] text-[1.3rem]' />
                        <h1 className='tracking-wide'>Reset Password</h1>
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
                            value={loginData.password} />
                    </div>
                    <Link to={'/zenstudy/forgot-password'}
                        className='text-[0.95rem] underline text-[#d3d5fc] w-full mt-2'>Resend reset link</Link>

                    <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Reset password</button>

                    <p className='mt-2'>Don&#39;t have an account? <Link to='/zenstudy/register' className='underline text-[#FFB827]'>Register</Link></p>
                </form>

            </div>
        </HomeLayout>
    )
}

export default ResetPassword
