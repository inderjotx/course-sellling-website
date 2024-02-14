'use client'
import React, { useState } from 'react'

export default function Page() {

    const [section, setSection] = useState<string>("courses")

    return (
        <div className="flex h-screen w-full" >
            <div className="flex flex-col items-start border   h-full md:w-1/4 lg:w-1/6 ">
                <div className="w-full cursor-pointer py-4 px-6 hover:bg-accent ">
                    Courses
                </div>
                <div className="w-full  cursor-pointer py-4 px-6 hover:bg-accent ">
                    Analytics
                </div>
            </div>
            <div className="">
            </div>
        </div>
    )
}
