import { Heading } from '@/components/Heading'
import React from 'react'


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
            <div className='flex p-6'>
                <Heading title={"Create Setup"} description={"Complete all fields"} />
            </div>
            <div className='flex w-full h-full '>
                <div className=' flex flex-col w-1/2 gap-4  px-4 py-4'>
                    {/* first three block */}
                    {title}
                    {description}
                    {image}
                </div>

                <div className=' flex flex-col w-1/2 gap-4 py-4  px-4'>
                    {/* other three block */}
                    {chapters}
                    {price}
                    {attachment}
                </div>
            </div>
        </div>
    )
}
