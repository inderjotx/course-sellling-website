'use server'

import { auth } from "@/auth";
import { db } from "@/db";
import { course } from "@/db/schema/course";
import { and, eq } from "drizzle-orm";





export const simplePathCourse = async (id: string, key: "title" | "description" | "price" | "thumbnail", value: string | number) => {


    const session = await auth()
    console.log(value)

    if (!session) {
        return false
    }
    // we have course id 

    const isUpdate = await db.update(course).set({ [key]: [value] }).where(and(eq(course.id, parseInt(id, 10)))).returning({ [key]: course[`${key}`] })

    console.log(isUpdate)

    return isUpdate[0][`${key}`]






}