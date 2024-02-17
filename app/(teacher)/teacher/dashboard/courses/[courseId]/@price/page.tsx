import { db } from '@/db'
import React from 'react'
import { toDollar } from '@/lib/formatCurrency'
import { PriceForm } from './_components/PriceForm'
import { CircleDollarSignIcon } from 'lucide-react'
import { CourseBadge } from '@/components/CourseBadge'

export default async function page({ params }: { params: { courseId: string } }) {

    // const value = await db.select().from(course).where(eq(course.id, params.courseId))

    // console.log(params.courseId)
    const value = await db.query.course.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, parseInt(params.courseId))
        },
        columns: {
            price: true
        }
    })






    return (
        // <TitleForm id={params.courseId} title={value?.title || ""} />
        <div className='flex flex-col gap-3'>
            <CourseBadge Icon={CircleDollarSignIcon} Heading='Sell Your Course' />

            <PriceForm id={params.courseId} price={value?.price?.toString() || ""} />
        </div>
    )
}
