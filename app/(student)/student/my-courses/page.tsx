import React from 'react'
import Card from '../_components/Card'
import { userSpecificCourseData } from '@/actions/dashboardData'

export default async function page() {



    const data = await userSpecificCourseData()

    // no of chapter completed , total chapters  
    console.log(data)

    return (
        <div className='grid grid-cols-4'>
            <div className=''>
                {
                    data.map((CouseData, index) => (
                        <Card key={index} course={CouseData} numberOfChapter={CouseData.noOfChaptersDone} progress={CouseData.percentage} isPurchased={true} />
                    ))
                }
            </div>

        </div>
    )
}
