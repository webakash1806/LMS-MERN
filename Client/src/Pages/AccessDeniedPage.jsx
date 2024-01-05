import React from 'react'
import { useNavigate } from 'react-router-dom'

import Error403 from '../assets/403error.png'

const AccessDeniedPage = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-[#eaffff] w-screen md:flex-row-reverse md:justify-around h-screen flex flex-col items-center justify-center'>
            <img className='w-[19rem] sm:w-[22rem] lg:w-[26rem]' src={Error403} alt="403 acess denied Image!" />
            <div className='flex flex-col items-center justify-center'>
                <p className='text-[#000] font-bold text-[1.6rem] text-center mx-8'>Access Denied!</p>
                <p className='text-[#343434] text-[1.1rem] text-center px-4'>We are sorry but you don&#39;t have access to this page or resource!</p>
                <button onClick={() => navigate(-1)} className='mt-4 bg-[#FFB827] text-black p-[5px] px-4 duration-300 font-semibold rounded-md animate-bounce shadow-sm hover:bg-black hover:text-[#FFB827]'>Go Back!</button>
            </div>
        </div>
    )
}

export default AccessDeniedPage
