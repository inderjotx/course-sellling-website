"use server"

import { auth } from "@/auth"
import * as courseSchema from "@/db/schema/course"
import * as userSchema from "@/db/schema/user"
import { db } from '@/db'


export async function getCourses() {

    const session = await auth()

    if (!session) {
        return { failure: "No User Id " }
    }


}