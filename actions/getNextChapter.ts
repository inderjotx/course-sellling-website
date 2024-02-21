'use server'

import { db } from "@/db"
import { chapter } from "@/db/schema/course"
import { and, asc, eq, gt } from "drizzle-orm"
import { redirect } from "next/navigation"



export const moveNextChapter = async (courseId: number, order: number) => {


    const id = await db.select({ id: chapter.id }).from(chapter).where(and(eq(chapter.courseId, courseId), gt(chapter.order, order))).orderBy(asc(chapter.order)).limit(1)
    if (id && id[0].id) {
        redirect(`/student/courses/${courseId}/chapter/${id[0].id}`)
    }

    redirect(`/student/my-courses`)
}