import { DataSideBar } from '@/components/DataSideBar'
import { db } from '@/db'
import React from 'react'
import { ChapterView } from '../../_components/Chapter'

export default async function page({ params }: { params: { courseId: number, chapterId: number } }) {

    const curChapter = await db.query.chapter.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, params.chapterId)
        }
        ,
        with: {
            course: {
                columns: {
                    title: true,
                }
            },
            muxData: {
                columns: {
                    playbackId: true
                }

                ,
                limit: 1
            }
        }
    })

    if (!curChapter) {
        return
    }

    const course = curChapter.course

    const chapters = await db.query.chapter.findMany({
        where(fields, operators) {
            return operators.eq(fields.courseId, params.courseId)
        },
        columns: {
            title: true,
            isPublic: true,
            id: true
        }
    })


    const sideBarData = chapters.map(({ title, isPublic, id }, index) => ({
        title: title,
        isPublic: isPublic || false,
        href: `/student/courses/${params.courseId}/chapter/${id}`
    }))

    sideBarData.splice(0, 0, {
        title: course.title,
        isPublic: true,
        href: `/student/courses/${params.courseId}`
    })


    console.log(curChapter)
    if (!curChapter) {
        return <h1>Something weird happened !!!  </h1>
    }



    // show the chapter 


    return (
        <div className='h-full w-full'>

            <ChapterView chapter={curChapter} courseId={params.courseId} />
            {/* banner */}
        </div>
    )
}
