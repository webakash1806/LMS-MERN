import React from 'react'
import {
    BsEnvelope,
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsTelephone,
    BsTwitter,
    BsWhatsapp
} from 'react-icons/bs'

import zenstudyLogo from '../assets/zenstudyLogo.png'

const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <>
            <footer className=' bg-[#1B2124] text-white'>
                <div className='p-[2.5rem_1rem] md:p-[2.5_5rem] flex flex-col gap-8 lg:flex-row sm:justify-around'>
                    <div className='flex flex-col gap-2'>
                        <div className='mb-3'><img className='w-[8rem]' src={zenstudyLogo} alt="" /></div>
                        {/* <img src="" alt="" /> */}
                        <a href="" className='flex items-center gap-2 text-[0.83rem] font-[400] tracking-wide'><BsEnvelope /><span>itsakash18.06@gmail.com</span></a>
                        <a href="" className='flex items-center gap-2 text-[0.83rem] font-[400] tracking-wide'><BsTelephone /><span>+91 6207234759</span></a>
                        <div className='flex gap-6 mt-3'>
                            <a href="" className='text-[17px]'><BsLinkedin /></a>
                            <a href="" className='text-[17px]'><BsFacebook /></a>
                            <a href="" className='text-[17px]'><BsWhatsapp /></a>
                            <a href="" className='text-[17px]'><BsInstagram /></a>
                            <a href="" className='text-[17px]'><BsTwitter /></a>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 sm:flex-row sm:justify-around sm:mr-5 md:mr-[5rem] md:gap-[5rem]'>
                        <div className='w-[17rem] '>
                            <div>
                                <p className='text-[1.09rem] font-[600]'>Company</p>
                                <p className='w-[15rem] m-[9px_0] h-[3.4px] bg-[#ff9500] rounded-md'></p>
                            </div>
                            <div className='mt-6 flex gap-4 justify-between pr-6'>
                                <div className='flex flex-col gap-4 '>
                                    <p className="text-[0.82rem] text-slate-300">About Us</p>
                                    <p className="text-[0.82rem] text-slate-300">FAQ</p>
                                    <p className="text-[0.82rem] text-slate-300">Privacy policy</p>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <p className="text-[0.82rem] text-slate-300">Contact us</p>
                                    <p className="text-[0.82rem] text-slate-300">Job assurance</p>
                                    <p className="text-[0.82rem] text-slate-300">Terms & condition</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-[17rem] '>
                            <div>
                                <p className='text-[1.09rem] font-[600]'>Products</p>
                                <p className='w-[15rem] m-[9px_0] h-[3.3px] bg-[#ff9500] rounded-md'></p>
                            </div>
                            <div className='mt-6 flex gap-4 justify-between pr-6'>
                                <div className='flex flex-col gap-4'>
                                    <p className="text-[0.82rem] text-slate-300">PW Skills Lab</p>
                                    <p className="text-[0.82rem] text-slate-300">Experience Portal</p>
                                    <p className="text-[0.82rem] text-slate-300">Hall Of fame</p>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <p className="text-[0.82rem] text-slate-300">Job Portal</p>
                                    <p className="text-[0.82rem] text-slate-300">Become an affiliate</p>
                                    <p className="text-[0.82rem] text-slate-300">Blog</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center text-[1.05rem] font-[600] p-3 border-t'><span>&#169;</span> {year} | Copyright webakash1806</div>
            </footer>
        </>
    )
}

export default Footer
