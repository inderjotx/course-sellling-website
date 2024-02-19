import { teacherAnalytics } from '@/actions/analytics'
import React from 'react'
import { Chart } from './_components/Chart'

const dummyData = {
    "courseAnalytics": [
        { "sales": 0, "money": 0, "courseId": 1, "title": "React JS Course" },
        { "sales": 10, "money": 500, "courseId": 2, "title": "Python Programming Course" },
        { "sales": 15, "money": 750, "courseId": 3, "title": "Machine Learning Course" },
        { "sales": 5, "money": 250, "courseId": 4, "title": "Web Development Bootcamp" },
        { "sales": 8, "money": 400, "courseId": 5, "title": "Data Science Fundamentals" },
        { "sales": 12, "money": 600, "courseId": 6, "title": "Java Masterclass" }
    ],
    "totalSales": 50,
    "totalMoney": 2500
}



export default async function page() {


    return (
        <div className='w-full h-screen'>
            <div className='flex flex-col gap-6 h-full w-full mt-6  px-4'>
                <div className='flex gap-4 w-full'>
                    <div className='h-28 w-1/2 rounded-md border flex justify-center items-center flex-col' >

                        <div className='font-semibold' >Sales</div>
                        <div className='text-2xl font-bold' >{dummyData.totalSales}</div>


                    </div>
                    <div className='h-28 w-1/2 border flex justify-center items-center rounded-md flex-col' >
                        <div className='font-semibold' >Money</div>
                        <div className='text-2xl font-bold' >${dummyData.totalMoney}</div>
                    </div>
                </div>
                <Chart data={dummyData.courseAnalytics} />
            </div>
        </div>
    )
}
