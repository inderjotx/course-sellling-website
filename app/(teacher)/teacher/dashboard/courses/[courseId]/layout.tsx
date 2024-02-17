import { Heading } from '@/components/Heading'
import { LayoutDashboard, LayoutTemplate } from 'lucide-react'
import React from 'react'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/lib/uploadThing";
import { CourseBadge } from '@/components/CourseBadge';

export default function layout({
    attachment,
    chapters,
    description,
    image,
    price,
    title
}: {
    attachment: React.ReactNode,
    chapters: React.ReactNode,
    description: React.ReactNode,
    image: React.ReactNode,
    price: React.ReactNode,
    title: React.ReactNode
}) {

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
                    {title}
                    {description}
                    {image}
                </div>

                <div className=' flex flex-col w-1/2 gap-6 py-4  px-4'>
                    {/* other three block */}
                    {chapters}
                    {price}
                    {attachment}
                </div>
            </div>
        </div>
    )
}
