import React from 'react'
import CountUp, { useCountUp } from 'react-countup'
import { Link } from 'react-router-dom'

import customerIcon from '../assets/customer.png'
import eduIcon from '../assets/edu.png'
import jobIcon from '../assets/job.png'
import perfIcon from '../assets/perf.png'
import HomeLayout from '../Layouts/HomeLayout'
const HomePage = () => {

    useCountUp({
        ref: 'counter',
        enableScrollSpy: true,
    });

    return (

        <HomeLayout>
            <div>
                <main className='text-white min-h-[90vh] py-6 flex flex-col items-center justify-center md:justify-around w-full bg-gradient-to-b  overflow-x-hidden from-[#15191E] via-[#320a17cb]   to-[#4b031b]'>
                    <div className='flex flex-col-reverse items-center justify-center w-full md:pr-8 lg:pr-12 md:flex-row md:justify-around'>
                        <div className='p-3 px-5 text-center md:text-left md:w-[27rem] lg:w-[37rem]'>
                            <h1 className='text-[2.2rem] md:text-[2.4rem] lg:text-[2.6rem] font-semibold flex flex-col lg:gap-3 lg:flex-row'>
                                Find Out Best
                                <span className='text-yellow-400'>
                                    Online Courses
                                </span>
                            </h1>
                            <p className='font-[400] text-[0.97rem] py-3 tracking-[0.4px] lg:pb-8'>
                                Explore diverse coding courses, master programming languages, and build real-world projects with expert-led online tutorials for comprehensive skill development.
                            </p>
                            <div>
                                <Link to='/zenstudy/course'>
                                    <button className='bg-[#7479ff] p-2 px-8 font-[500] tracking-wide rounded-md text-[1.05rem] hover:bg-[#6368fa]'>
                                        Explore Courses
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div>
                            <div className="w-64 carousel rounded-box" >
                                <div className="w-full carousel-item">
                                    <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                                </div>
                                <div className="w-full carousel-item">
                                    <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                                </div>
                                <div className="w-full carousel-item">
                                    <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                                </div>
                                <div className="w-full carousel-item">
                                    <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                                </div>
                                <div className="w-full carousel-item">
                                    <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                                </div>
                                <div className="w-full carousel-item">
                                    <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                                </div>
                                <div className="w-full carousel-item">
                                    <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center justify-center w-full gap-4'>
                        <div className='mt-4 flex w-fit gap-4 px-4 pr-6 rounded-md bg-[#15191E] shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a] p-2 flex-wrap items-center justify-center'>
                            <img src={perfIcon} alt="" className='p-[5px] rounded-sm w-10 bg-[#ff770062] ' />
                            <div className='min-w-[9.5rem]'>
                                <h1 className='font-bold text-[1.1rem] text-white'>60%</h1>
                                <p className='text-[0.87rem]'>Average Salary Hike</p>
                            </div>
                        </div>
                        <div className='mt-4 flex w-fit gap-4 px-4 pr-6 rounded-md bg-[#15191E] shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a] p-2 flex-wrap items-center justify-center'>
                            <img src={eduIcon} alt="" className='p-[5px] rounded-sm w-10 bg-[#6f7fe762]' />
                            <div className='min-w-[9.5rem]'>
                                <h1 className='font-bold text-[1.1rem] text-white'>150+</h1>
                                <p className='text-[0.87rem]'>Different Courses</p>
                            </div>
                        </div>
                        <div className='mt-4 flex w-fit gap-4 px-4 pr-6 rounded-md bg-[#15191E] shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a] p-2 flex-wrap items-center justify-center'>
                            <img src={jobIcon} alt="" className='p-[5px] rounded-sm w-10 bg-[#00ff0062]' />
                            <div className='min-w-[9.5rem]'>
                                <h1 className='font-bold text-[1.1rem] text-white'>50+</h1>
                                <p className='text-[0.87rem]'>Hiring Partners</p>
                            </div>
                        </div>
                        <div className='mt-4 flex w-fit gap-4 px-4 pr-6 rounded-md bg-[#15191E] shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a] p-2 flex-wrap items-center justify-center'>
                            <img src={customerIcon} alt="" className='p-[5px] rounded-sm w-10 bg-[#00d0ff62]' />
                            <div className='min-w-[9.5rem]'>
                                <h1 className='font-bold text-[1.1rem] text-white'>24&#xd7;7</h1>
                                <p className='text-[0.87rem]'>Customer Support</p>
                            </div>
                        </div>
                    </div>
                </main>
                <section className='flex flex-wrap items-center justify-center w-full py-6 bg-white shadow-[0px_-5px_5px_#000_inset]'>
                    <div className='flex w-[17rem] flex-col items-center justify-center  py-6'>
                        <div className='text-[2.3rem] font-semibold tracking-wide text-black'><CountUp end={100000} enableScrollSpy /><span className='font-[450] text-[2.7rem]'>+</span>
                        </div>
                        <p className='text-[1.4rem] font-[500] tracking-wide text-[#ab4444]'>Student&apos;s Enrolled</p>
                    </div>
                    <div className='flex flex-col items-center justify-center py-6 w-[17rem]'>
                        <div className='text-[2.3rem] font-semibold tracking-wide text-black'><CountUp end={106} enableScrollSpy /><span className='font-[450] text-[2.7rem]'><span className='text-[2.1rem] font-semibold'>K</span>+</span>
                        </div>
                        <p className='text-[1.4rem] font-[500] tracking-wide text-[#ab4444]'>Linkedin Member</p>
                    </div>
                    <div className='flex flex-col items-center justify-center py-6 w-[17rem]'>
                        <div className='text-[2.3rem] font-semibold tracking-wide text-black'><CountUp end={1000} enableScrollSpy /><span className='font-[450] text-[2.7rem]'>+</span>
                        </div>
                        <p className='text-[1.4rem] font-[500] tracking-wide text-[#ab4444]'>Career Transition</p>
                    </div>
                    <div className='flex flex-col items-center justify-center py-6 w-[17rem]'>
                        <div className='text-[2.3rem] font-semibold tracking-wide text-black'><CountUp end={1060} enableScrollSpy /><span className='font-[450] text-[2.7rem]'>+</span>
                        </div>
                        <p className='text-[1.4rem] font-[500] tracking-wide text-[#ab4444]'>Student&apos;s Placed</p>
                    </div>

                </section>
                <section>
                    <div className='w-full p-5 py-12 sm:px-20 md:px-[10vw] lg:px-[25vw]'>
                        <div className=" join join-vertical w-full rounded-md shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a]">
                            <div className="collapse collapse-arrow join-item border border-[#2d3a4b] bg-[#1A202A]">
                                <input type="radio" name="my-accordion-4" />
                                <div className="text-xl font-medium collapse-title">
                                    Is the course live or recorded?
                                </div>
                                <div className="text-white collapse-content">
                                    <p>All lectures are recorded.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border border-[#2d3a4b] bg-[#1A202A]">
                                <input type="radio" name="my-accordion-4" />
                                <div className="text-xl font-medium collapse-title">
                                    Do the courses start from the basics ?
                                </div>
                                <div className="text-white collapse-content">
                                    <p>Yes every course starts from the very basics until it is specifically mentioned otherwise.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </HomeLayout>
    )
}

export default HomePage
