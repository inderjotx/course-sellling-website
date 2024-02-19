import { db } from '@/db'
import React from 'react'

export default async function page({ params }: { params: { courseId: number, chapterId: number } }) {

    const courseData = await db.query.chapter.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, params.chapterId)
        }
    })

    console.log(courseData)
    if (!courseData) {
        return <h1>Something weird happened !!!  </h1>
    }


    // show the chapter 


    return (
        <div>
            We are in the chapter data page
        </div>
    )
}
