import { auth } from '@/auth'
import { DataSideBar } from '@/components/DataSideBar'
import { db } from '@/db'
import React from 'react'

export default async function layout({ children, params }: {
    children: React.ReactNode,
    params: { courseId: number }
}) {


    const session = await auth()


    const userId = session?.user.id || "no-user"




    const courseData = await db.query.course.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(fields.id, params.courseId), operators.eq(fields.isPublished, true))
        },

        with: {
            chapters: {
                columns: {
                    id: true,
                    isPublic: true,
                    title: true
                }
            }
        }
    })


    const hasPurchaged = (await db.query.purchases.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(fields.courseId, params.courseId), operators.eq(fields.userId, userId))
        },
    })) ? true : false


    if (!courseData) {
        return <></>
    }

    const sideBarData = courseData.chapters.map(({ title, id, isPublic }) => ({
        title,
        isPublic: hasPurchaged || isPublic || courseData.isPublic || false,
        href: `/student/courses/${courseData.id}/chapter/${id}`
    }))

    sideBarData.splice(0, 0, {
        title: courseData.title,
        isPublic: true,
        href: `/student/courses/${courseData.id}`
    })


    return (
        <div>

            <div className="flex h-screen w-full" >
                <DataSideBar data={sideBarData} />
                <div className="w-full px-4 pt-5">
                    <div className='h-full w-full'>

                        {children}

                    </div>
                </div>
            </div>
        </div>
    )
}
