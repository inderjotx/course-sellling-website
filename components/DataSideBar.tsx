
import Link from 'next/link'
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
export function DataSideBar({ data }: { data: { title: string, href: string, isPublic: boolean }[] }) {


    return (
        <div className="hidden lg:flex rounded-t flex-col group items-start border h-full  lg:w-1/6  ">
            {
                data.map(({ title, href }) => (
                    <div key={title} className="w-full text-sm first:text-lg  first:border-b  cursor-pointer py-4 px-6  hover:bg-accent ">
                        <Link className='flex ' href={href} >
                            {title}
                        </Link> </div>
                ))
            }
        </div>
    )
}