'use server'

import { auth, signIn } from "@/auth"
import { db } from "@/db"
import { course, purchases } from "@/db/schema/course"
import { eq, sql } from "drizzle-orm"






/*

amount of money generated from all courses 
no of people bought courses 

sales of each course 
money from each course 



*/


interface courseAnalytics {

    sales: number,
    money: number,
    courseId: number,
    title: string

}

interface courseAnalyticsReturn {
    courseAnalytics: courseAnalytics[],
    totalSales: number,
    totalMoney: number
}







export const teacherAnalytics = async (): Promise<courseAnalyticsReturn> => {

    const session = await auth()
    let totalSales = 0;
    let totalMoney = 0;

    if (!session) {
        await signIn()
    }

    const userId = session!.user.id

    // all courses created by user 

    const allCourses = await db.query.course.findMany({
        where(fields, operators) {
            return operators.eq(fields.creatorId, userId)
        },
        columns: {
            id: true,
            title: true,
            price: true
        }
    })
    console.log(allCourses)


    const data: courseAnalytics[] = []


    await Promise.all(allCourses.map(async ({ id, price, title }) => {
        const salesRaw = await db
            .select({ count: sql<number>`COUNT(*)` })
            .from(purchases)
            .where(eq(purchases.courseId, id));

        //@ts-ignore
        const salesFiltered = parseInt(salesRaw[0].count)
        const moneyGained = (price || 0) * salesFiltered;
        totalSales += salesFiltered;
        totalMoney += moneyGained;

        data.push(
            {
                sales: salesFiltered,
                money: moneyGained,
                courseId: id,
                title: title
            }
        )
    }));

    console.log(data)

    return {
        courseAnalytics: data,
        totalSales: totalSales,
        totalMoney: totalMoney
    }


}


