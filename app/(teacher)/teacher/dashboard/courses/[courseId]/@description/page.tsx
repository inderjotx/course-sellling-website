import { db } from '@/db'
import React from 'react'
import { DescriptionForm } from './_components/DescriptionForm'

export default async function page({ params }: { params: { courseId: string } }) {

    // const value = await db.select().from(course).where(eq(course.id, params.courseId))

    // console.log(params.courseId)
    const value = await db.query.course.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, parseInt(params.courseId))
        },
        columns: {
            description: true
        }
    })





    return (
        <DescriptionForm description={value?.description || ""} id={params.courseId} />
    )
}

