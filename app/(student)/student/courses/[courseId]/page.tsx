import { auth } from '@/auth'
import { db } from '@/db'
import { chapter } from '@/db/schema/course'
import { and, asc, eq, gt } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page({ params }: { params: { courseId: number } }) {


    const session = await auth()
    let hasBought: boolean = false

    if (!session) {
        hasBought = false
    }





    // check if one has bought or not 
    if (session && session.user) {

        hasBought = (await db.query.purchases.findFirst({
            where(fields, operators) {
                return operators.and(operators.eq(fields.userId, session.user.id), operators.eq(fields.courseId, params.courseId))
            },

        })) ? true : false


    }



    // if bought then redirect
    if (hasBought && session) {

        // this will return the most recently completed chapter , and we have to go to next chapter then most recetly view one 
        const lastWathched = await db.query.progress.findFirst({
            where(fields, operators) {
                return operators.and(operators.eq(fields.userId, session.user.id), operators.eq(fields.courseId, params.courseId))
            },

            with: {
                chapter: {
                    columns: {
                        order: true
                    }
                }
            },

            orderBy(fields, operators) {
                return operators.desc(fields.completeOn)
            },
        })


        // next after that 

        if (!lastWathched) {
            // probaly bought but have not watched anything , go to first chapter then

            // get id of first chapter 
            const id = await db.select({ id: chapter.id }).from(chapter).where(eq(chapter.courseId, params.courseId)).orderBy(asc(chapter.order)).limit(1)
            redirect(`/student/courses/${params.courseId}/chapter/${id[0].id}`)
        }
        else {

            // next greate than prviouss 
            const id = await db.select({ id: chapter.id }).from(chapter).where(and(eq(chapter.courseId, params.courseId), gt(chapter.order, lastWathched.chapter.order))).orderBy(asc(chapter.order)).limit(1)

            if (id.length != 0) {
                redirect(`/student/courses/${params.courseId}/chapter/${id[0].id}`)
            }


        }




    }




    const courseData = await db.query.chapter.findMany({
        where(fields, operators) {
            return operators.and(operators.eq(fields.courseId, params.courseId), operators.eq(fields.isPublished, true))
        },
        with: {
            course: true,
            creator: {
                columns: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        },

        columns: {
            id: true,
            title: true,
            description: true,
            isPublic: true,
            order: true,
        }
    })




    if (!courseData) {
        return <h1>Something weird happened !!!  </h1>
    }



    console.log(courseData)
    return (
        // we will show udemy like page , 

        // title of course 

        // chapters show in form of file system 

        // drop down 

        // heading of each chpater


        // option of download 

        // if chapter is build user can watch is also 

        // 
        <div>
            Course Data

        </div>
    )
}