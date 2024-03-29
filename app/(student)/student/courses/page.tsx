import { db } from '@/db'
import { course } from '@/db/schema/course'
import React from 'react'
import Card from '../_components/Card'
import Link from 'next/link'
import { Sidebar } from '@/components/Sidebar'

export default async function page() {

    const data = await db.query.course.findMany({
        with: {
            chapters: {
                columns: {
                    id: true
                }
            }
        }
        ,
        where(fields, operators) {
            return operators.eq(fields.isPublished, true)
        },
    })


    return (

        <div className="flex h-screen w-full" >
            <Sidebar />
            <div className="w-full px-4 pt-5">

                <div className='grid grid-cols-4'>
                    <div className=''>
                        {
                            data.map((CouseData, index) => (
                                <Link key={index} href={`/student/courses/${CouseData.id}`}>
                                    <Card key={index} progress={0} isPurchased={false} numberOfChapter={CouseData.chapters.length} course={CouseData} />
                                </Link>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
