import React from 'react'
import { BsHouseFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import successPng from '../../assets/successPng.png'
import HomeLayout from '../../Layouts/HomeLayout'

const CheckoutSuccess = () => {

    const navigate = useNavigate()
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[90vh] '>
                <div
                    className='bg-gradient-to-t  overflow-x-hidden from-[#171e15]   to-[#1db215f7] relative h-[24rem] pt-3 flex flex-col items-center justify-between text-white  rounded-md shadow-md shadow-[#14a024f7]'>
                    <div className='flex items-center w-fit justify-between  p-2 gap-3 pr-5 rounded-lg left-0 rounded-b-none text-[1.1rem]'>
                        <BsHouseFill onClick={() => navigate('/LMS-Client')} className='text-[#000000] cursor-pointer text-[1.3rem] absolute left-4' />
                        <h1 className='tracking-wide ml-5 text-[1.2rem] font-semibold'>Payment Successfull</h1>
                    </div>
                    <div className='h-[19.5rem] bg-[#1A202A] mx-5 p-3 w-[15rem] flex flex-col items-center justify-around rounded-md rounded-b-none'>
                        <p className='text-center text-[0.92rem]'>Your Payments get successfull. Now you can access all courses for 1 year.</p>
                        <img src={successPng} alt="" className='w-20' />
                        <div className='text-center text-[0.8rem] tracking-wide text-slate-400'>
                            <p>100% refundable</p>
                            <p>*Terms and Condition applied</p>
                        </div>
                        <button onClick={() => navigate('/LMS-Client/course')} className='bg-[#FF6700] hover:bg-[#ff4d00] p-2 text-[1.1rem]  rounded-md w-full font-semibold tracking-wide'>Go back to courses</button>
                    </div>

                </div>
            </div>
        </HomeLayout>
    )
}

export default CheckoutSuccess
