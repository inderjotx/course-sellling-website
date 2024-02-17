"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { chapter } from "@/db/schema/course"






export const getChapters = async (courseId: string) => {

    const session = await auth()


    if (!session) {
        return null
    }


    const value = await db.query.chapter.findMany({
        where(fields, operators) {
            return operators.eq(fields.courseId, parseInt(courseId))
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

    return value

} 