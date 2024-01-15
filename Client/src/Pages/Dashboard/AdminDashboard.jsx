import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React, { useEffect } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import { FaUsers } from 'react-icons/fa'
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
                backgroundColor: ['yellow', 'green'],
                borderwidth: 1,
                bordercolor: 'white'
            }
        ]
    }

    const salesData = {
        lebels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
        fontColor: 'white',
        datasets: [
            {
                label: 'Sales/Month',
                data: monthlySalesRecord,
                backgroundColor: ['rgb(255,99,132)'],
                bordercolor: ['white'],
                borderwidth: 2
            }
        ]
    }

    const { courseData } = useSelector((state) => state?.course)

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
            <div className='text-white h-[90vh] flex flex-col items-center justify-center'>
                <h1>Admin Dashboard</h1>
                <div className='flex items-center justify-center flex-col gap-4'>
                    <div>
                        <Doughnut data={userStats} />
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <div className='flex flex-col  items-center justify-center'>
                            <FaUsers className='text-[2.7rem]' />
                            <div className='text-center'>
                                <p>Registered Users</p>
                                <p>{allUsersCount}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <FaUsers className='text-[2.7rem]' />
                            <div className='text-center'>
                                <p>Subscribed Users</p>
                                <p>{subscribedCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashboard
