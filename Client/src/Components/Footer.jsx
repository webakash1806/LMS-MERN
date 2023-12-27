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

const Footer = () => {
    return (
        <>
            <footer className='h-[10vh]'>
                <div>
                    <div>Logo</div>
                    {/* <img src="" alt="" /> */}
                    <a href="" className='flex items-center gap-2'><BsEnvelope /><span>itsakash18.06@gmail.com</span></a>
                    <a href="" className='flex items-center gap-2'><BsTelephone /><span>+91 6207234759</span></a>
                    <div className='flex gap-2'>
                        <a href="" className=''><BsLinkedin /></a>
                        <a href="" className=''><BsFacebook /></a>
                        <a href="" className=''><BsWhatsapp /></a>
                        <a href="" className=''><BsInstagram /></a>
                        <a href="" className=''><BsTwitter /></a>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <p className='text-[1.09rem] font-[600]'>Company</p>
                            <p className='w-[15rem] mt-1 h-[3.9px] bg-[#ff9500] rounded-md'></p>
                        </div>
                        <div>
                            <div>
                                <p>About Us</p>
                                <p>FAQ</p>
                                <p>Privacy policy</p>
                            </div>
                            <div>
                                <p>Contact us</p>
                                <p>Job assurance</p>
                                <p>Terms & condition</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className='text-[1.09rem] font-[600]'>Products</p>
                            <p className='w-[15rem] mt-1 h-[3.8px] bg-[#ff9500] rounded-md'></p>
                        </div>
                        <div>
                            <div>
                                <p>PW Skills Lab</p>
                                <p>Experience Portal</p>
                                <p>Hall Of fame</p>
                            </div>
                            <div>
                                <p>Job Portal</p>
                                <p>Become an affiliate</p>
                                <p>Blog</p>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer
