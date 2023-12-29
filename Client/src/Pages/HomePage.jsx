import React from 'react'
import { Link } from 'react-router-dom'

import HomeLayout from '../Layouts/HomeLayout'
const HomePage = () => {

    return (
        <HomeLayout>
            <main className='text-white min-h-[90vh] py-8 flex flex-col-reverse items-center justify-center'>
                <div className='p-3 px-5 text-center'>
                    <h1 className='text-[2.2rem] font-semibold flex flex-col'>
                        Find Out Best
                        <span className='pl-2 text-yellow-400'>
                            Online Courses
                        </span>
                    </h1>
                    <p className='font-[330] text-[0.97rem] py-3 tracking-[0.3px]'>
                        Explore diverse coding courses, master programming languages, and build real-world projects with expert-led online tutorials for comprehensive skill development.
                    </p>
                    <div>
                        <Link to='/courses'>
                            <button className='bg-yellow-600 p-2 px-8 font-[500] tracking-wide rounded-md text-[1.05rem] hover:bg-yellow-700'>
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
        </HomeLayout>
    )
}

export default HomePage
