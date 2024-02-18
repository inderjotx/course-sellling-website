import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { db } from '@/db';
import { Course } from './_components/columns';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';



export default async function page() {

    const session = await auth()

    if (!session) {
        redirect('/')
    }

    const userId = session.user.id
    const data = await db.query.course.findMany({
        where(fields, operators) {
            return operators.ilike(fields.creatorId, userId)
        },
    })

    console.log(data)
    const filteredData = data.map((course) => ({
        title: course.title,
        status: (course.isPublished) ? "Active" : "Inactive",
        price: course.price || 0,
        id: course.id
    }))



    return (
        <div className='flex'>
            <DataTable columns={columns} data={filteredData} />
        </div>
    )
}
