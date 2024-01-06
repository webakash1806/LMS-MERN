import React from 'react'

import commmitmentImg from '../assets/commitment.png'
import innovationImg from '../assets/innovative.png'
import missionImg from '../assets/mission.png'
import robustImg from '../assets/robust.png'
import userCentricDesignImg from '../assets/userCentricDesign.png'
import visionariesImg from '../assets/visionaries.png'
import HomeLayout from '../Layouts/HomeLayout'

const AboutUs = () => {
    return (
        <HomeLayout>
            <div className='p-2 px-4 md:px-10 sm:pt-6'>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-2 text-white'>
                    <div className='text-center sm:w-[33vw]'>
                        <h1 className='text-[1.8rem] font-[610]  mb-3'>About Us</h1>
                        <p className='text-[0.9rem] font-[350] tracking-wide'>Welcome to [Your LMS Name], where education meets innovation! We are passionate about transforming the way people learn and grow, making education accessible, engaging, and effective.</p>
                    </div>
                    <img
                        className=' w-[90vw] p-4 sm:w-[30vw] sm:p-1'
                        src={missionImg} alt="Our Mission Image" />
                    <div className='text-center sm:w-[33vw]'>
                        <h1 className='text-[1.8rem] font-[610]  mb-3'>Our Mission</h1>
                        <p className='text-[0.9rem] font-[350] tracking-wide'>At [Your LMS Name], our mission is to empower individuals and organizations with the tools they need to thrive in the digital age. We believe that learning is a lifelong journey, and our goal is to provide a dynamic and user-friendly platform that fosters continuous learning and professional development.</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 text-white py-10'>
                    <h1 className='text-[1.8rem] font-[610]  mb-3 bg-[#1D232A] p-1 px-5 rounded-md'>Who We Are?</h1>
                    <div className='flex flex-col gap-2 md:gap-4 sm:flex-row items-center justify-center'>
                        <div className='flex flex-col gap-2 md:gap-4'>
                            <div className="card max-w-[19rem] rounded-md bg-[#d0faf3e5] text-primary-content">
                                <div className="card-body">
                                    <img src={visionariesImg} alt="" className='w-10 shadow-md rounded-md bg-[#80808034]' />
                                    <h2 className="card-title">Visionaries!</h2>
                                    <p>We are a team of dedicated professionals who share a common vision - to revolutionize education through cutting-edge technology.</p>
                                </div>
                            </div>
                            <div className="card max-w-[19rem] rounded-md bg-[#f1f9dbe5] text-primary-content">
                                <div className="card-body">
                                    <img src={commmitmentImg} alt="" className='w-10 shadow-md rounded-md bg-[#80808034]' />
                                    <h2 className="card-title">Commitment!</h2>
                                    <p>Driven by a commitment to excellence, we strive to set the highest standards in the field of online learning.</p>
                                </div>
                            </div>
                        </div>
                        <div className="card max-w-[19rem] rounded-md bg-[#dbddf9e5] text-primary-content h-[17rem] ">
                            <div className="card-body">
                                <img src={innovationImg} alt="" className='w-10 shadow-md rounded-md bg-[#80808034]' />
                                <h2 className="card-title">Innovative!</h2>
                                <p>We understand that every learner is unique, and that&#39;s why we offer a range of innovative solutions to cater to various learning styles.</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 text-white py-10'>
                    <h1 className='text-[1.8rem] font-[610]  mb-3 bg-[#1D232A] p-1 px-5 rounded-md '>What Sets Us Apart?</h1>
                    <div className='flex flex-col gap-2 md:gap-4 sm:flex-row items-center justify-center'>
                        <div className="card max-w-[19rem] rounded-md bg-[#e6c2fbfb] text-primary-content h-[18.5rem] ">
                            <div className="card-body">
                                <img src={userCentricDesignImg} alt="" className='w-10 shadow-md rounded-md bg-[#80808034]' />
                                <h2 className="card-title">User-Centric Design!</h2>
                                <p>Our LMS is built with a focus on the user experience. We believe that intuitive design enhances the learning journey, and our platform reflects this commitment to user-centricity. </p>

                            </div>
                        </div>
                        <div className='flex flex-col gap-2 md:gap-4'>
                            <div className="card max-w-[19rem] rounded-md bg-[#faf4d0e5] text-primary-content">
                                <div className="card-body">
                                    <img src={robustImg} alt="" className='w-10 shadow-md rounded-md bg-[#80808034]' />
                                    <h2 className="card-title">Robust Features!</h2>
                                    <p>From interactive multimedia content to advanced analytics, our platform is equipped with everything you need to create, deliver, and track effective learning experiences.</p>
                                </div>
                            </div>
                            <div className="card max-w-[19rem] rounded-md bg-[#dedbf9e5] text-primary-content">
                                <div className="card-body">
                                    <img src={innovationImg} alt="" className='w-10 shadow-md rounded-md bg-[#80808034]' />
                                    <h2 className="card-title">Continuous Innovation!</h2>
                                    <p>Our team is dedicated to continuous innovation, ensuring that [Your LMS Name] remains at the forefront of educational technology.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs
