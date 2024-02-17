import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page({ params }: { params: { chapterId: number, courseId: number } }) {
    return (
        <div>
            <Link href={`/teacher/dashboard/courses/${params.courseId}`} >
                prev
            </Link>
            <div>{params.chapterId}</div>
            <div>{params.courseId}</div>
        </div>
    )
}
