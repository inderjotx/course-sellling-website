'use server'

import { auth, signIn } from "@/auth"
import { db } from "@/db"
import { course } from "@/db/schema/course"
import { redirect } from "next/navigation"



export const createCourse = async (courseName: string) => {

    if (!courseName) {
        return { failure: "No course Name" }
    }

    const session = await auth()

    if (!session) {
        await signIn()
        return
    }

    const data = await db.insert(course).values({ title: courseName, creatorId: session?.user.id }).returning({ id: course.id })

    redirect(`/teacher/dashboard/courses/${data[0].id}`)
}