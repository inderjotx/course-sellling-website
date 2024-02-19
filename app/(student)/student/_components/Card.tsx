import { Course } from '@/db'
import Image from 'next/image';
import React from 'react'
import { IconBadge } from './IconBadge';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';



// + user progess + No of chapters 
const course = {
    id: 1,
    title: "Introduction to JavaScript",
    description: "Learn the fundamentals of JavaScript programming language.",
    isPublished: true,
    thumbnail: "https://images.unsplash.com/photo-1536065998491-91b0ffda8909?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0ODkxNTM0fHxlbnwwfHx8fHw%3D",
    price: 49.99,
    creatorId: "user123",
    isArchived: false
};



export default function Card({ dummy }: { dummy?: Course }) {

    const isCompleted = false
    const isPurchased = true
    const numberOfChapter = 3
    const progress = "44.00%"

    return (
        <div className='w-72 h-80 flex rounded-md gap-3 flex-col p-3 border'>
            <div className='h-40  w-full relative rounded-md overflow-hidden' >
                <Image src={course.thumbnail} alt='course-thumbnail' fill sizes='100%' className='absolute object-cover' />
            </div>
            <div>
                <div className='text-md font-semibold' >{course.title}</div>
                <div className='text-sm text-muted-foreground' >Filming</div>
            </div>
            <div>
                {/* badge */}
                <div className='text-sm text-muted-foreground  flex items-center  gap-2'>

                    <IconBadge Icon={BookOpen} size='small' className='text-blue-800 rounded-full bg-blue-100 p-1.5 ' />
                    <span className='text-[12px]'>{numberOfChapter} Chapters</span>
                </div>

            </div>

            {/* show process bar if user had taken the course */}
            {
                isPurchased ?

                    <div className={cn("flex flex-col gap-2")}>
                        <div className='h-2 border rounded-sm relative' >
                            <div className={cn('absolute bg-blue-500 h-full rounded-sm rounded-r-none', isCompleted && "bg-green-700")} style={{ width: `${progress}` }}  ></div>
                        </div>
                        <div className={cn('text-blue-800 text-[12px]', isCompleted && "text-green-800")}>{parseInt(progress).toFixed(0)}% Complete</div>
                    </div>
                    :
                    <div className='flex py-1 '>
                        <div className='text-[14px] font-semibold' >${course.price}</div>
                    </div>
            }
        </div>
    )
}
