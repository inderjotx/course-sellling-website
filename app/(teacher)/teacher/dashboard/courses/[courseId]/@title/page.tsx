import { db } from '@/db'
import React from 'react'
import { TitleForm } from './_components/TitleForm'

export default async function page({ params }: { params: { courseId: string } }) {

    // const value = await db.select().from(course).where(eq(course.id, params.courseId))

    console.log('chpater title ')
    // console.log(params.courseId)
    const value = await db.query.course.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, parseInt(params.courseId))
        },
        columns: {
            title: true
        }
    })





    return (
        <TitleForm id={params.courseId} title={value?.title || ""} />
    )
}
