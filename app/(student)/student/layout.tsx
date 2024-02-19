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
}
export default function layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex h-screen w-full" >
            <div className="hidden lg:flex flex-col items-start border h-full  lg:w-1/6  ">
                {
                    links.student.map(({ title, href }) => (
                        <div key={title} className="w-full  cursor-pointer py-4 px-6 hover:bg-accent ">
                            <Link href={href} >
                                {title}
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="w-full">
                {children}
            </div>

        </div>
    )
}
