import React from 'react'
import Card from '../_components/Card'
import { userSpecificCourseData } from '@/actions/dashboardData'
import { Sidebar } from '@/components/Sidebar'

export default async function page() {



    const data = await userSpecificCourseData()

    // no of chapter completed , total chapters  
    console.log(data)

    return (

        <div className="flex h-screen w-full" >
            <Sidebar />
            <div className="w-full px-4 pt-5">
                <div className='grid grid-cols-4'>
                    <div className=''>
                        {
                            data.map((CouseData, index) => (
                                <Card key={index} course={CouseData} numberOfChapter={CouseData.noOfChapters} progress={CouseData.percentage} isPurchased={true} />
                            ))
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}
