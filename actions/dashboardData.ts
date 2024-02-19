
import { Course, db } from '@/db'
import { progress, purchases } from '@/db/schema/course'
import { auth, signIn, signOut } from '@/auth'
import { int } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'



// all courses , user taken
// each course's progess , 
// chapters has completed / total chapter 
// next() ---> return next chapter ,if there other wise   which chapter ,  one he has to do now 
//  



// 

export interface CourseWithProgress extends Course {
    isCompleted: boolean,
    percentage: number,
    noOfChapters: number,
    noOfChaptersDone: number
}




export async function userSpecificCourseData(): Promise<CourseWithProgress[]> {

    const session = await auth()

    if (!session) {
        await signIn()
    }



    const userId = session!.user.id


    // all purchased courses 
    const purchasedCourses = await db.query.purchases.findMany({
        where(fields, operators) {
            return operators.and(operators.eq(fields.userId, userId))
        },
        with: {
            course: true,
        }
    })



    // all chapters in a course 
    // promise 
    const totalChapterEachCoursePromise = purchasedCourses.map(({ courseId }) => {
        return db.query.chapter.findMany({
            where(fields, operators) {
                return operators.eq(fields.courseId, courseId)
            },
            columns: {
                id: true
            }
        })
    })


    const allChpater = await Promise.all(totalChapterEachCoursePromise)





    // chapter completed per course 
    const courseProgressStatusPromise = purchasedCourses.map(({ courseId }) => {
        return db.query.progress.findMany({
            where(fields, operators) {
                return operators.and(operators.eq(fields.courseId, courseId), operators.eq(fields.userId, userId))
            },
            columns: {
                chapterId: true
            }

        })
    })



    const chapterDone = await Promise.all(courseProgressStatusPromise)

    const data: CourseWithProgress[] = purchasedCourses.map(({ course }, index) => {
        return {
            ...course,
            isCompleted: chapterDone[index].length == allChpater[index].length,
            noOfChapters: allChpater[index].length,
            noOfChaptersDone: chapterDone[index].length,
            percentage: (chapterDone[index].length / allChpater[index].length) * 100
        }
    })
    return data

} 