import { CourseBadge } from '@/components/CourseBadge'
import { db } from '@/db'
import { chapter } from '@/db/schema/course'
import { List } from 'lucide-react'
import React from 'react'
import { ChapterForm } from './_components/ChapterForm'



export default async function page({ params }: { params: { courseId: string } }) {


    const value = await db.query.chapter.findMany({
        where(fields, operators) {
            return operators.eq(fields.courseId, parseInt(params.courseId))
        },
        columns: {
            title: true,
            id: true,
            order: true,
            isPublished: true,
        }
        ,
        orderBy: chapter.order
    })




    return (
        <div>
            <div>
                <CourseBadge Icon={List} Heading={'Course Chapters'} />
            </div>
            <div>
                <ChapterForm courseId={params.courseId} />
            </div>
        </div>
    )
}

