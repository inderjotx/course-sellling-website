'use client'
import { CourseBadge } from '@/components/CourseBadge'
import { db } from '@/db'
import { chapter } from '@/db/schema/course'
import { List } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ChapterForm } from './_components/ChapterForm'
import { getChapters } from '@/actions/getChapters'


interface ChapterFormProps {
    title: string,
    id: number,
    order: number,
    isPublished: boolean | null
}

export default function Chapter() {


    const [chapters, setChapters] = useState<ChapterFormProps[]>([])


    useEffect(() => {

        const updateChpaters = async () => {
            const data = await getChapters('1')
            console.log(data)
            if (data) {
                setChapters(data)
            }
        }

        updateChpaters()

    }, [])

    // const value = await db.query.chapter.findMany({
    //     where(fields, operators) {
    //         return operators.eq(fields.courseId, parseInt(params.courseId))
    //     },
    //     columns: {
    //         title: true,
    //         id: true,
    //         order: true,
    //         isPublished: true,
    //     }
    //     ,
    //     orderBy: chapter.order
    // })




    return (
        <div>
            <div>
                <CourseBadge Icon={List} Heading={'Course Chapters'} />
            </div>
            <div>
                <ChapterForm chapters={chapters} courseId={'1'} />
            </div>
        </div>
    )
}

