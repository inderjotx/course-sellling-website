import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { db } from '@/db';
import { Course } from './_components/columns';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';


const courses = [
    {
        title: "Introduction to JavaScript",
        price: "20.44",
        status: "active",
        id: "294029"
    },
    {
        title: "Advanced React Development",
        price: "35.99",
        status: "active",
        id: "294029"
    },
    {
        title: "Python Fundamentals",
        price: "25.75",
        status: "drafted",
        id: "294029"
    },
    {
        title: "Machine Learning Basics",
        price: "40.20",
        status: "archived",
        id: "294029"
    }
];

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

    const filteredCourses = data.map((course) => ({
        id: course.id,
        title: course.title,
        price: course.price,
        status: course.isArchived ? "archived" : "active"
    })) satisfies Course[]

    console.log(data)


    return (
        <div className='flex'>
            <DataTable columns={columns} data={courses} />
        </div>
    )
}
