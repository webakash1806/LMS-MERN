import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Error404 from '../assets/Error404.png'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-[#eaffff] w-screen md:flex-row-reverse md:justify-around h-screen flex flex-col items-center justify-center'>
            <img className='w-[19rem] sm:w-[22rem] lg:w-[26rem]' src={Error404} alt="404 Page not found Image!" />
            <div className='flex flex-col items-center justify-center'>
                <p className='text-[#000] font-bold text-[1.5rem] text-center mx-8'>Looks Like you&#39;re lost the address!</p>
                <button onClick={() => navigate(-1)} className='mt-4 bg-[#FFB827] text-black p-[5px] px-4 font-semibold rounded-md animate-bounce shadow-sm hover:bg-black hover:text-[#FFB827]'>Go Back!</button>
            </div>
        </div>
    )
}

export default PageNotFound
