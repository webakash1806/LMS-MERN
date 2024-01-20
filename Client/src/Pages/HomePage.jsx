import React from 'react'
import { Link } from 'react-router-dom'

import HomeLayout from '../Layouts/HomeLayout'
const HomePage = () => {

    return (
        <HomeLayout>
            <div>
                <main className='text-white min-h-[90vh] py-8  md:pr-8 lg:pr-12 sm:py-4 flex flex-col-reverse md:flex-row items-center justify-center md:justify-around w-full bg-gradient-to-b  overflow-x-hidden from-[#15191E] via-[#320a17cb]   to-[#4b031b]'>
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
                            <Link to='/LMS-Client/course'>
                                <button className='bg-[#7479ff] p-2 px-8 font-[500] tracking-wide rounded-md text-[1.05rem] hover:bg-[#6368fa]'>
                                    Explore Courses
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="w-64 carousel rounded-box" >
                            <div className="carousel-item w-full">
                                <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                            </div>
                            <div className="carousel-item w-full">
                                <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                            </div>
                            <div className="carousel-item w-full">
                                <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                            </div>
                            <div className="carousel-item w-full">
                                <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                            </div>
                            <div className="carousel-item w-full">
                                <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                            </div>
                            <div className="carousel-item w-full">
                                <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                            </div>
                            <div className="carousel-item w-full">
                                <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                            </div>
                        </div>
                    </div>
                </main>
                <section>
                    <div className='w-full p-5 py-12 sm:px-20 md:px-[10vw] lg:px-[25vw]'>
                        <div className=" join join-vertical w-full rounded-md shadow-[2px_2px_9px_#000,-2px_-2px_1px_#3a3b3a]">
                            <div className="collapse collapse-arrow join-item border border-[#2d3a4b] bg-[#1A202A]">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-xl font-medium">
                                    Is the course live or recorded?
                                </div>
                                <div className="collapse-content text-white">
                                    <p>All lectures are recorded.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border border-[#2d3a4b] bg-[#1A202A]">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-xl font-medium">
                                    Do the courses start from the basics ?
                                </div>
                                <div className="collapse-content text-white">
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
