'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const links = {
    student: [{
        href: '/student/courses',
        title: 'Courses'
    },
    {
        href: '/student/my-courses',
        title: 'My Courses'
    }]
    ,
    teacher: [{
        href: '/teacher/dashboard/courses',
        title: 'Courses'
    },
    {
        href: '/teacher/dashboard/analytics',
        title: 'Analytics'
    }],
}
export function Sidebar() {

    const params = usePathname()
    console.log(params)
    const key = (params.includes('/student')) ? "student" : "teacher"
    console.log(key)

    // /student/course/courseId/chapter/chapterId

    return (
        <div className="hidden lg:flex flex-col items-start border h-full  lg:w-1/6  ">
            {
                links[key].map(({ title, href }) => (
                    <div key={title} className="w-full  cursor-pointer py-4 px-6 hover:bg-accent ">
                        <Link href={href} >
                            {title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
