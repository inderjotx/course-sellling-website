import { Badge } from '@/components/ui/badge'
import { Grip, Pencil } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


interface ChapterColumnInterface {
    id: number,
    title: string,
    isPublished: boolean | null
}

export default function ChapterColumn({ title, id, isPublished }: ChapterColumnInterface) {
    console.log(title)
    return (
        <div className='w-full h-10 flex items-center overflow-hidden pr-1 rounded-md bg-blue-100/80'>

            <div className='p-2 cursor-pointer   bg-blue-200 h-full flex items-center'>
                <Grip className='h-4 w-4'></Grip>
            </div>

            <div className='pl-2 text-sm'>
                {title.substring(0, 5)}
            </div>
            <div className='ml-auto flex   h-full items-center'>
                <Badge className=''>{isPublished ? "Active" : "Drafted"}</Badge>
                <Link href={`/teachter/dashboard/courses/ /chapter/${id}`} >
                    <div className='p-2  h-full flex items-center'>
                        <Pencil className='h-3 w-3'></Pencil>
                    </div>
                </Link>
            </div>
        </div>
    )
}
