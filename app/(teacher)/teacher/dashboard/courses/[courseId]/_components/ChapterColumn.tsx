'use client'
import { Badge } from '@/components/ui/badge'
import { Grip, Pencil } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


interface ChapterColumnInterface {
    courseId: number,
    chapterId: number,
    title: string,
    isPublished: boolean | null
}

export default function ChapterColumn({ title, chapterId, courseId, isPublished }: ChapterColumnInterface) {
    console.log(title)


    return (
        <div className='w-full h-10 flex items-center overflow-hidden pr-1 rounded-md bg-blue-100/80'>

            <div className='p-2 cursor-pointer   bg-blue-200 h-full flex items-center'>
                <Grip className='h-4 w-4'></Grip>
            </div>

            <div className='pl-2 mr-1  text-sm flex-grow whitespace-nowrap overflow-hidden'>
                {title}
            </div>

            <div className='ml-auto flex flex-none   h-full items-center'>
                <Badge className=''>{isPublished ? "Active" : "Drafted"}</Badge>
                <Link href={`/teacher/dashboard/courses/${courseId}/chapter/${chapterId}`} >
                    <div className='p-2  h-full flex items-center'>
                        <Pencil className='h-3 w-3'></Pencil>
                    </div>
                </Link>
            </div>
        </div>
    )
}
