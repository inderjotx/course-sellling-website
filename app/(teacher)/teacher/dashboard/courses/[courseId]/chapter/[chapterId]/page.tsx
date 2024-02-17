import { CourseBadge } from '@/components/CourseBadge'
import { Heading } from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { ourFileRouter } from '@/lib/uploadThing'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { LayoutDashboard, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { extractRouterConfig } from 'uploadthing/server'
import { TitleForm } from '../../_components/TitleForm'
import { DescriptionForm } from '../../_components/DescriptionForm'
import { ImageForm } from '../../_components/ImageForm'
import { db } from '@/db'
import { chapter } from '@/db/schema/course'

export default async function page({ params }: { params: { chapterId: number, courseId: number } }) {

    const value = await db.query.chapter.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(chapter.id, params.chapterId))
        },
    })


    return (
        <div className='flex w-full h-screen flex-col gap-6'>
            <div className='flex px-4 justify-between mr-3 items-center mt-2'>
                <Heading title={"Create Setup"} description={"Complete all fields"} />
                <Button variant={"destructive"} size={"icon"} ><Trash2></Trash2> </Button>
            </div>
            <div className='flex w-full h-full '>
                <div className=' flex flex-col w-1/2 gap-6  px-4 py-4'>
                    {/* first three block */}
                    <CourseBadge Icon={LayoutDashboard} Heading='Customize Your Course' >
                    </CourseBadge>
                    <NextSSRPlugin
                        routerConfig={extractRouterConfig(ourFileRouter)} />

                    <TitleForm title={value?.title || ""} id={params.courseId} />
                    <DescriptionForm description={value?.description || ""} id={params.courseId} />

                </div>

                <div className=' flex flex-col w-1/2 gap-6 py-4  px-4'>
                    {/* other three block */}
                </div>
            </div>
        </div>
    )
}
