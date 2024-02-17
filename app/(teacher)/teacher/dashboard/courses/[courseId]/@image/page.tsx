import { db } from '@/db'
import React from 'react'
import { ImageForm } from './_components/ImageForm'

export default async function page({ params }: { params: { courseId: string } }) {


    const value = await db.query.course.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, parseInt(params.courseId))
        },
        columns: {
            thumbnail: true
        }
    })





    return (
        <div>
            <ImageForm id={params.courseId} imageUrl={value?.thumbnail || ""} />
        </div>
    )
}

