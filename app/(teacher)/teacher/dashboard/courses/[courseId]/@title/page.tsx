import { db } from '@/db'
import { Pencil } from 'lucide-react'
import React from 'react'
import { TitleForm } from './_components/TitleForm'
import { time } from 'console'

export default async function page({ params }: { params: { courseId: number } }) {

    // const value = await db.select().from(course).where(eq(course.id, params.courseId))

    // console.log(params.courseId)
    const value = await db.query.course.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, params.courseId)
        },
        columns: {
            title: true
        }
    })





    return (
        <TitleForm title={value?.title || ""} />
    )
}
