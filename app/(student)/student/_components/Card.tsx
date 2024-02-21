import { Course } from '@/db'
import Image from 'next/image';
import React from 'react'
import { IconBadge } from './IconBadge';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CourseWithProgress } from '@/actions/dashboardData';



export default function Card({ course, isPurchased, progress, numberOfChapter }: { course: Course, isPurchased: boolean, numberOfChapter: number, progress: number }) {


    return (
        <div className='w-72 h-80 flex rounded-md gap-3 flex-col p-3 border'>
            <div className='h-40  w-full relative rounded-md overflow-hidden' >
                <Image src={course?.thumbnail || ""} alt='course-thumbnail' fill sizes='100%' className='absolute object-cover' />
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
                        <div className='h-2 border rounded-sm relative overflow-hidden ' >
                            <div className={cn('absolute bg-blue-500 h-full rounded-sm rounded-r-none', ('isCompleted' in course && course.isCompleted == true) && "bg-green-700")} style={{ width: `${progress}%` }}  ></div>
                        </div>
                        <div className={cn('text-blue-800 text-[12px] ', (progress == 100) && "text-green-800")}>{progress} % Complete</div>
                    </div>
                    :
                    <div className='flex py-1 '>
                        <div className='text-[14px] font-semibold' >${course.price}</div>
                    </div>
            }
        </div>
    )
}
