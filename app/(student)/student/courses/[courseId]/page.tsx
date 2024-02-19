import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { chapter, purchases } from '@/db/schema/course'
import { and, asc, eq, gt } from 'drizzle-orm'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import React from 'react'
import { BuyButton } from './_components/BuyButton'
import Image from 'next/image'
import { NotepadText, NotepadTextIcon } from 'lucide-react'
import { IconBadge } from '../../_components/IconBadge'
import { ChapterList } from './_components/ChapterList'
import Link from 'next/link'



// icon bg , icon text 
// gradient start - end 



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



    // // if bought then redirect
    // if (hasBought && session) {

    //     // this will return the most recently completed chapter , and we have to go to next chapter then most recetly view one 
    //     const lastWathched = await db.query.progress.findFirst({
    //         where(fields, operators) {
    //             return operators.and(operators.eq(fields.userId, session.user.id), operators.eq(fields.courseId, params.courseId))
    //         },

    //         with: {
    //             chapter: {
    //                 columns: {
    //                     order: true
    //                 }
    //             }
    //         },

    //         orderBy(fields, operators) {
    //             return operators.desc(fields.completeOn)
    //         },
    //     })


    //     // next after that 

    //     if (!lastWathched) {
    //         // probaly bought but have not watched anything , go to first chapter then

    //         // get id of first chapter 
    //         const id = await db.select({ id: chapter.id }).from(chapter).where(and(eq(chapter.courseId, params.courseId), eq(chapter.isPublished, true))).orderBy(asc(chapter.order)).limit(1)
    //         redirect(`/student/courses/${params.courseId}/chapter/${id[0].id}`)
    //     }
    //     else {

    //         // next greate than prviouss 
    //         const id = await db.select({ id: chapter.id }).from(chapter).where(and(eq(chapter.courseId, params.courseId), gt(chapter.order, lastWathched.chapter.order))).orderBy(asc(chapter.order)).limit(1)

    //         if (id.length != 0) {
    //             redirect(`/student/courses/${params.courseId}/chapter/${id[0].id}`)
    //         }


    //     }




    // }




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


    const course = courseData[0].course
    const chapters = courseData
    const creator = courseData[0].creator

    return (
        // we will show udemy like page , 

        // title of course 

        // chapters show in form of file system 

        // drop down 

        // heading of each chpater


        // option to buy the course  


        // if chapter is build user can watch is also 

        // 
        <div className='h-full w-full'>

            {/* banner */}
            <div className='h-1/3 bg-gradient-to-r from-purple-100 to-purple-300 flex relative w-full border pl-4 rounded-md'>

                {/* text info/ */}
                <div className='flex w-full py-4 pl-4 flex-col h-full justify-center'>
                    <div className='flex flex-col '>
                        <div className='font-bold text-3xl '>{course.title}</div>
                        <div className='text-muted-foreground w-1/2 text-wrap'>{(course.description!.length > 100) ? course.description!.substring(100) + "..." : course.description}</div>
                    </div>
                    <div className='mt-5'>
                        <div className='text-sm' >Instructor: <span className='font-semibold'>{creator.name}</span> </div>
                        <div className='text-sm'>Email : <span className='font-semibold' >{creator.email}</span></div>
                    </div>
                </div>

                {/* image card  */}
                <div className='w-60 h-72 absolute top-1/3 bg-white   lg:right-20 right-4 rounded-sm px-4 py-4 border'>
                    <div className='relative h-2/3 w-full overflow-hidden rounded-sm '>
                        <Image src={course.thumbnail || ""} fill sizes='100%'
                            alt='course thumbain '
                        ></Image>
                    </div>
                    <div className='flex  flex-col items-center justify-center  h-1/3 '>
                        <div  >{course.title}</div>
                        <div className='text-muted-foreground text-sm'>{course.description}</div>
                        <div className='text-sm'  >${course.price} </div>
                    </div>
                </div>
            </div>


            <div className='mt-10 pl-4 flex flex-col gap-2'>
                <div className='text-2xl my-4 font-serif' >Chapters</div>
                {
                    chapters.map((chapter, index) => (
                        <Link key={index} href={`/student/courses/${params.courseId}/chapter/${chapter.id}`}  >
                            <ChapterList key={index} index={index} title={chapter.title} description={chapter.description || ""} />
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}





// {
//     session &&
//     <BuyButton userId={session.user.id} courseId={params.courseId} />
// }

