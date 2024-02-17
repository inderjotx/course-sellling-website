"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { chapter } from "@/db/schema/course"
import { and, eq } from "drizzle-orm"




export const updateChapter = async (courseId: number, chapterId: number, key: "title" | "description" | "videoUrl" | "isPublic", value: string | boolean) => {

    const session = await auth()

    if (!session) {
        return null
    }
    // we have course id 
    try {
        let isUpdate: any;
        if (key == "isPublic" && value == true) {
            isUpdate = await db.update(chapter).set({ isPublic: true }).where(and(eq(chapter.id, chapterId), eq(chapter.courseId, courseId), eq(chapter.creatorId, session!.user.id))).returning({ [key]: chapter[`${key}`] })
        }
        else {
            isUpdate = await db.update(chapter).set({ [key]: [value] }).where(and(eq(chapter.id, chapterId), eq(chapter.courseId, courseId), eq(chapter.creatorId, session!.user.id))).returning({ [key]: chapter[`${key}`] })
        }

        console.log(isUpdate)
        return isUpdate[0][`${key}`]


    }
    catch (error) {
        console.log(error)
        return null
    }

}