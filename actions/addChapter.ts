"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { chapter } from "@/db/schema/course"
import { count } from "console"
import { and, eq, ilike, like } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { title } from "process"




export const addChapter = async (courseId: number, chapterTitle: string) => {

    // is authencation or is the user 

    const session = await auth()

    if (!session) {
        return false
    }


    try {

        const chapterInCouse = await db.select({ id: chapter.order }).from(chapter).where(eq(chapter.courseId, courseId))
        const length = chapterInCouse.length
        console.log(length)


        const response = await db.insert(chapter).values({ title: chapterTitle, courseId: courseId, order: length, creatorId: session!.user.id }).returning({ title: chapter.title })
        console.log(response[0].title)
        return true
    }

    catch (error) {
        console.log(error)
        return false
    }


}

