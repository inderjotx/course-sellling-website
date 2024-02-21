import { db } from '@/db'
import React from 'react'
import { ChapterView } from '../../_components/Chapter'
import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation'

export default async function page({ params }: { params: { courseId: number, chapterId: number } }) {


    const session = await auth()
    if (!session) {
        await signIn()
        return
    }

    const userId = session.user.id

    const hasPurchaged = (await db.query.purchases.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(fields.courseId, params.courseId), operators.eq(fields.userId, userId))
        },
    })) ? true : false



    const curChapter = await db.query.chapter.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, params.chapterId)
        }
        ,
        with: {
            course: {
                columns: {
                    title: true,
                    isPublic: true
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


    const progress = await db.query.progress.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(fields.courseId, params.courseId), operators.eq(fields.chapterId, params.chapterId), operators.eq(fields.userId, userId))
        },
    })

    let hasCompleted = false
    console.log("progresss")

    if (progress) {
        hasCompleted = true
    }



    // if not pulic or purchaded redirect back to purchage page 
    if (!course.isPublic && !hasPurchaged && !curChapter.isPublic) {
        redirect(`/student/courses/${params.courseId}`)
    }



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

            <ChapterView chapter={curChapter} hasCompleted={hasCompleted} hasPurchased={hasPurchaged} courseId={params.courseId} />
            {/* banner */}
        </div>
    )
}
