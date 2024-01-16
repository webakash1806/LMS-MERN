import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React, { useEffect } from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import { FaUsers } from 'react-icons/fa'
import { FcSalesPerformance } from 'react-icons/fc'
import { GiMoneyStack } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout'
import { deleteCourse, getAllCourses } from '../../Redux/Slices/CourseSlice'
import { allPayment } from '../../Redux/Slices/RazorpaySlice'
import { getStatsData } from '../../Redux/Slices/StatsSlice'


ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)


const AdminDashboard = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { allUsersCount, subscribedCount } = useSelector((state) => state.stats)

    const { finalMonths, monthlySalesRecord, allPayments } = useSelector((state) => state.razorpay)

    const getDashboardData = async () => {
        await dispatch(getAllCourses())
        await dispatch(getStatsData())
        await dispatch(allPayment())
    }

    const userStats = {
        labels: ['Registered User', 'Enrolled User'],
        datasets: [
            {
                label: 'User Details',
                data: [allUsersCount, subscribedCount],
                backgroundColor: ['#26a5f9', '#fb1dce'],
                borderWidth: 0,
                circumference: 330,
                cutout: 80,
                hoverOffset: 10,
                radius: 70,
                color: 'white'
            }
        ]
    }

    console.log(monthlySalesRecord)

    const salesData = {
        labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
        fontColor: 'white',
        datasets: [
            {
                label: 'Sales / Month',
                data: monthlySalesRecord,
                backgroundColor: ['#1292F6'],
                barThickness: 10,
                borderRadius: 10
            }
        ]
    }

    const { courseData } = useSelector((state) => state?.course)

    console.log(courseData)

    async function onCourseDelete(id) {
        if (window.confirm('Are you sure to delete this course?')) {
            const res = await dispatch(deleteCourse(id))
            if (res?.payload?.success) {
                await dispatch(getAllCourses())
            }
        }
    }

    useEffect(() => {
        getDashboardData()
    }, [])
    return (
        <HomeLayout>
            <div className='bg-[#0E1122] text-white min-h-[90vh] gap-5 w-full overflow-x-hidden flex flex-col items-center justify-center'>
                <h1>Admin Dashboard</h1>
                <div className='flex items-center flex-wrap gap-20 flex-col lg:gap-0 lg:flex-row justify-around h-full'>
                    <div className='flex items-center justify-center flex-col gap-4'>
                        <div className='bg-[#182037] p-4 w-[19rem] sm:w-[29rem] lg:w-[20rem] h-[19rem]  pb-0 rounded-lg text-white flex items-center justify-center flex-col'>
                            <p className='text-center text-[0.85rem] font-semibold tracking-wide'>User Data</p>
                            <Doughnut data={userStats} className='' />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-1'>
                            <div className='bg-[#182037] p-4 px-12 lg:px-14 rounded-lg flex  gap-10  items-center justify-center'>
                                <FaUsers className='text-[3rem] text-[#26a5f9]' />
                                <div className='text-center'>
                                    <p>Registered Users</p>
                                    <p className='text-[1.7rem] font-semibold'>{allUsersCount}</p>
                                </div>
                            </div>
                            <div className='bg-[#182037] p-4 px-12 lg:px-14 rounded-lg  flex gap-10  items-center justify-center'>
                                <FaUsers className='text-[3rem] text-[#fb1dce]' />
                                <div className='text-center'>
                                    <p>Subscribed Users</p>
                                    <p className='text-[1.7rem] font-semibold'>{subscribedCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='h-[20rem] w-[100vw] sm:w-[80vw] md:w-[35rem]'>
                            <Bar data={salesData} />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                            <div className='bg-[#182037] p-4 px-12   rounded-lg flex  gap-10  items-center justify-center'>
                                <FaUsers className='text-[3rem] text-[#26a5f9]' />
                                <div className='text-center'>
                                    <p>Total Subscription</p>
                                    <p className='text-[1.7rem] font-semibold'>{allPayments?.count}</p>
                                </div>
                            </div>
                            <div className='bg-[#182037] p-4 px-12  rounded-lg  flex gap-10  items-center justify-center'>
                                <FaUsers className='text-[3rem] text-[#fb1dce]' />
                                <div className='text-center'>
                                    <p>Total Revenue</p>
                                    <p className='text-[1.7rem] font-semibold'>{allPayments?.count * 499}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-around w-full'>
                        <h2>Courses overview</h2>
                        <button className='btn btn-secondary text-white tracking-wide text-[1.1rem]' onClick={() => navigate('/LMS-Client/course/create')}>
                            Create new course
                        </button>
                    </div>
                    <div className='overflow-x-scroll w-[90vw]'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>S No.</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Instructor</th>
                                    <th>Total Lectures</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseData?.map((course, index) => {
                                    return (
                                        <tr key={course?._id}>
                                            <td>{index + 1}.</td>
                                            <td>{course?.title}</td>
                                            <td>{course?.category}</td>
                                            <td>{course?.createdBy}</td>
                                            <td>{course?.numberOfLecture}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashboard
