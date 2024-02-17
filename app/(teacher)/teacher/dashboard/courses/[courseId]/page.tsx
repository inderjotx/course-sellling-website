import { Heading } from '@/components/Heading'
import { LayoutDashboard } from 'lucide-react'
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
import { redirect } from 'next/dist/server/api-utils';
import { db } from '@/db';
import { time } from 'console';

export default async function page({ params }: { params: { courseId: string } }) {

    const session = await auth()

    if (!session) {
        await signIn()
    }

    const course = await db.query.course.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(fields.id, parseInt(params.courseId)), operators.eq(fields.creatorId, session!.user.id))
        },
    })




    return (
        <div className='flex w-full h-screen flex-col'>
            <div className='flex px-4  mt-2'>
                <Heading title={"Create Setup"} description={"Complete all fields"} />
            </div>
            <div className='flex w-full h-full '>
                <div className=' flex flex-col w-1/2 gap-6  px-4 py-4'>
                    {/* first three block */}
                    <CourseBadge Icon={LayoutDashboard} Heading='Customize Your Course' >
                    </CourseBadge>
                    <NextSSRPlugin
                        routerConfig={extractRouterConfig(ourFileRouter)} />

                    <TitleForm title={course?.title || ""} id={params.courseId} />
                    <DescriptionForm description={course?.description || ""} id={params.courseId} />
                    <ImageForm imageUrl={course?.thumbnail || ""} id={params.courseId} />

                </div>

                <div className=' flex flex-col w-1/2 gap-6 py-4  px-4'>
                    {/* other three block */}
                    <ChapterForm chapters={[]} id={params.courseId} />
                    <PriceForm price={course?.price?.toString() || ""} id={params.courseId} />
                </div>
            </div>
        </div>
    )
}
