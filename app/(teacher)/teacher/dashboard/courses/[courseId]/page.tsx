import { Heading } from '@/components/Heading'
import { LayoutDashboard, Trash, Trash2 } from 'lucide-react'
import React from 'react'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/lib/uploadThing";
import { CourseBadge } from '@/components/CourseBadge';
import { TitleForm } from './_components/TitleForm';
import { DescriptionForm } from './_components/DescriptionForm';
import { ImageForm } from './_components/ImageForm';
import { ChapterForm } from './_components/ChapterForm';
import { PriceForm } from './_components/PriceForm';
import { auth, signIn } from '@/auth';
import { db } from '@/db';
import { DeleteButton } from './_components/DeleteCourse';
import PublishButton from './_components/PublishButton';




export default async function page({ params }: { params: { courseId: number } }) {

    const session = await auth()

    if (!session) {
        await signIn()
    }

    const course = await db.query.course.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(fields.id, params.courseId), operators.eq(fields.creatorId, session!.user.id))
        },
        with: {
            chapters: {
                orderBy(fields, operators) {
                    return operators.asc(fields.order)
                },
            }
        }
    })


    function getRatio() {
        let completed = 0
        completed += (course && (course.title != null || course.title != "")) ? 1 : 0
        completed += (course && (course.description != null || course.description != "")) ? 1 : 0
        completed += (course && (course.price != null)) ? 1 : 0
        completed += (course && (course.thumbnail != null)) ? 1 : 0
        const publishedChapters = course!.chapters.filter((chapter) => chapter.isPublished)
        completed += (publishedChapters.length != 0) ? 1 : 0
        return completed
    }

    const TOTAL_FIELDS = 5

    return (
        <div className='flex w-full h-screen flex-col gap-6'>
            <div className='flex px-4 justify-between mr-3 items-center mt-2'>
                <Heading title={"Create Setup"} description={`Complete all fields ${getRatio()}/${TOTAL_FIELDS}`} />
                <div className='flex gap-2'>
                    <PublishButton courseId={params.courseId} isPublished={course?.isPublished || false} isDisabled={getRatio() != TOTAL_FIELDS} />
                    <DeleteButton courseId={params.courseId} />
                </div>
            </div>
            <div className='w-full h-full grid grid-cols-2 '>
                <div className=' flex flex-col col-span-2 lg:col-span-1  gap-6  px-4 py-4'>
                    {/* first three block */}
                    <CourseBadge Icon={LayoutDashboard} Heading='Customize Your Course' >
                    </CourseBadge>
                    <NextSSRPlugin
                        routerConfig={extractRouterConfig(ourFileRouter)} />

                    <TitleForm title={course?.title || ""} id={params.courseId} />
                    <DescriptionForm description={course?.description || ""} id={params.courseId} />
                    <ImageForm imageUrl={course?.thumbnail || ""} id={params.courseId} />

                </div>

                <div className=' flex flex-col  col-span-2 lg:col-span-1 gap-6 py-4  px-4'>
                    {/* other three block */}
                    <ChapterForm chapters={course?.chapters || []} id={params.courseId} />
                    <PriceForm price={course?.price?.toString() || ""} id={params.courseId} />
                </div>
            </div>
        </div>
    )
}
