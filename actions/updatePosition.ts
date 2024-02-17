'use server'

import { auth, signIn } from "@/auth"
import { db } from "@/db"
import { chapter } from "@/db/schema/course"
import { and, eq } from "drizzle-orm"



// chapterId , new order , courseid 
export async function updatePostion(courseId: number, chapterId: number, order: number) {

    console.log(chapterId + ":::" + order)
    const session = await auth()

    if (!session) {
        await signIn()
    }

    try {

        const updateOrder = await db.update(chapter).set({ order: order }).where(and(eq(chapter.id, chapterId), eq(chapter.courseId, courseId), eq(chapter.creatorId, session!.user.id)))

        return true
    }

    catch (error) {
        console.log(error)
        return false
    }





}