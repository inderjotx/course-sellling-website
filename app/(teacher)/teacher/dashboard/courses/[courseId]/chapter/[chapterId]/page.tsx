import { CourseBadge } from '@/components/CourseBadge'
import { Heading } from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { ourFileRouter } from '@/lib/uploadThing'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { ArrowLeft, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { extractRouterConfig } from 'uploadthing/server'
import { TitleForm } from './_components/ChapterTitle'
import { db } from '@/db'
import { chapter } from '@/db/schema/course'
import { ChapterDescriptionForm } from './_components/ChapterDescription'
import { AccessControl } from './_components/AccessControl'
import { VideoForm } from './_components/VideoForm'
import { revalidatePath } from 'next/cache'
import { DeleteButton } from './_components/DeleteButton'

export default async function page({ params }: { params: { chapterId: number, courseId: number } }) {

    const value = await db.query.chapter.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(chapter.id, params.chapterId))
        },
        with: {
            muxData: true
        }
    })



    if (!value) {
        return <></>
    }


    return (
        <div className='flex w-full h-screen flex-col gap-6'>
            <div className='px-4 h-10'>

                <Link href={`/teacher/dashboard/courses/${params.courseId}`} className='' >
                    <div className='flex gap-3'>
                        <ArrowLeft className=''></ArrowLeft>
                        <span>Back to Course Setup
                        </span>
                    </div>
                </Link>
            </div>
            <div className='flex px-4 justify-between mr-3 items-center mt-2'>
                <Heading title={"Chapter Creation"} description={"Complete all fields"} />
                <div className='flex items-center justify-center gap-2'>
                    <form action={async () => {
                        "use server"
                        await db.update(chapter).set({ isPublished: !value.isPublished })
                        revalidatePath(`/teacher/dashboard/courses/${params.courseId}/chapter/${params.chapterId}`)
                    }} >
                        <Button>{value.isPublished ? "Archive" : "Publish"}</Button>
                    </form>
                    <DeleteButton courseId={params.courseId} chapterId={params.chapterId} />
                </div>
            </div>
            <div className='flex w-full h-full '>
                <div className=' flex flex-col w-1/2 gap-6  px-4 py-4'>
                    {/* first three block */}
                    <CourseBadge Icon={LayoutDashboard} Heading='Customize Your Course' >
                    </CourseBadge>
                    <NextSSRPlugin
                        routerConfig={extractRouterConfig(ourFileRouter)} />

                    <TitleForm title={value?.title || ""} courseId={params.courseId} chapterId={value.id} />
                    <ChapterDescriptionForm description={value?.description || ""} courseId={params.courseId} chapterId={value?.id} />
                    <AccessControl isPublic={value?.isPublic || false} courseId={params.courseId} chapterId={value?.id} />

                </div>

                <div className=' flex flex-col w-1/2 gap-6 py-4  px-4'>
                    {/* other three block */}
                    <VideoForm courseId={params.courseId} chapterId={value.id} assetId={value?.muxData?.[0]?.playbackId || ""} />
                </div>
            </div>
        </div>
    )
}
