import React from 'react'
import { BsHouseFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import failPng from '../../assets/failPng.png'
import HomeLayout from '../../Layouts/HomeLayout'

const CheckoutFail = () => {
    const navigate = useNavigate()
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[90vh] '>
                <div
                    className='bg-gradient-to-t  overflow-x-hidden from-[#1e1515]   to-[#dd1010f7] relative h-[25.3rem] pt-3 flex flex-col items-center justify-between text-white  rounded-md shadow-md shadow-[#dd1010f7]'>
                    <div className='flex items-center w-fit justify-between  p-2 gap-3 pr-5 rounded-lg left-0 rounded-b-none text-[1.1rem]'>
                        <BsHouseFill onClick={() => navigate('/zenstudy')} className='text-[#000000] cursor-pointer text-[1.3rem] absolute left-4' />
                        <h1 className='tracking-wide ml-5 text-[1.2rem] font-semibold'>Payment Failed</h1>
                    </div>
                    <div className='h-[21rem] bg-[#1A202A] mx-5 p-3 w-[15rem] flex flex-col items-center justify-around rounded-md rounded-b-none'>
                        <p className='text-center text-[0.92rem]'>Your Payments got failed. Please try once again for subscription.</p>
                        <img src={failPng} alt="" className='w-20' />
                        <div className='text-center text-[0.8rem] tracking-wide text-slate-400'>
                            <p>In case if money had been detected from your account then it will be back in 24 hrs.</p>
                            <p>*Terms and Condition applied</p>
                        </div>
                        <button onClick={() => navigate('/zenstudy/course')} className='bg-[#FF6700] hover:bg-[#ff4d00] p-2 text-[1.1rem]  rounded-md w-full font-semibold tracking-wide'>Go back to courses</button>
                    </div>

                </div>
            </div>
        </HomeLayout>
    )
}

export default CheckoutFail
