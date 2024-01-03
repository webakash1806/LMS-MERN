import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../Layouts/HomeLayout'
import { loginAccount } from '../Redux/Slices/AuthSlice';

const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
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
        const { email, password } = loginData
        if (!email || !password) {
            return toast.error('Please fill all the fields!')
        }


        if (!email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            return toast.error('Email is Invalid!')
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            return toast.error('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!')
        }

        const response = await dispatch(loginAccount(loginData))
        console.log(response)

        if (response?.payload?.success) {
            navigate("/LMS-Client");
        }


        setLoginData({
            email: "",
            password: ""
        })

    }

    return (
        <HomeLayout>
            <div className='h-[100vh] flex items-center justify-center text-white'>
                <form noValidate onSubmit={login} action="" className='flex flex-col items-center justify-center gap-[8px] bg-black p-4 rounded-lg shadow-md shadow-[#ffb7275a]'>
                    <h1 className='font-semibold text-[1.4rem] tracking-[0.6px]'>Login</h1>



                    <div className="flex flex-col items-start justify-center gap-[0.5px]">
                        <label htmlFor="email" className='text-[0.82rem] font-semibold'>Email
                        </label>
                        <input type="email" required
                            className='p-1 px-2 rounded-md text-[0.92rem] min-w-[17rem] sm:w-[19.5rem] outline-none shadow-sm shadow-[#FFB827] text-[#FFB827] bg-[#2c2c2ca1]'
                            name='email'
                            id='email'
                            placeholder='Enter Email...'
                            onChange={handleUserInput}
                            value={loginData.email} />
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
                            value={loginData.password} />
                    </div>

                    <button type='submit' className='bg-[#FFB827] hover:bg-[#fbb66d] duration-300 mt-2 text-[#000] w-full rounded-md p-[5px] font-semibold text-[1.05rem]'>Login</button>

                    <p className='mt-2'>Don&#39;t have an account? <Link to='/LMS-Client/register' className='underline text-[#FFB827]'>Register</Link></p>
                </form>

            </div>
        </HomeLayout>
    )
}

export default LoginPage
