import { DataSideBar } from '@/components/DataSideBar'
import { db } from '@/db'
import React from 'react'

export default async function page({ params }: { params: { courseId: number, chapterId: number } }) {

    const courseData = await db.query.chapter.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, params.chapterId)
        }
        ,
        with: {
            course: {
                columns: {
                    title: true,
                }
            }
        }
    })

    if (!courseData) {
        return
    }

    const course = courseData.course

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


    console.log(courseData)
    if (!courseData) {
        return <h1>Something weird happened !!!  </h1>
    }



    // show the chapter 


    return (
        <div className="flex h-screen w-full" >
            <DataSideBar data={sideBarData} />

            <div className="w-full px-4 pt-5">
                <div className='h-full w-full'>


                    {/* banner */}
                    We are in the chapter data page
                </div>
            </div>
        </div>
    )
}
