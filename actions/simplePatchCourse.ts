'use server'

import { auth } from "@/auth";
import { db } from "@/db";
import { course } from "@/db/schema/course";
import { users } from "@/db/schema/user";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";





export const simplePathCourse = async (key: "title" | "description" | "price", value: string | number) => {


    const headersList = headers()
    const urlPath = headersList.get('next-url')!.split('/')

    const session = await auth()
    const userId = session?.user.id


    const id = urlPath[urlPath.length - 1]
    console.log(id)


    // we have course id 

    const isUpdate = await db.update(course).set({ [key]: [value] }).where(and(eq(course.id, parseInt(id, 10)))).returning({ title: course.title })


    return isUpdate[0].title






}