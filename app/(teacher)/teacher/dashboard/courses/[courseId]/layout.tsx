import { Heading } from '@/components/Heading'
import { LayoutDashboard, LayoutTemplate } from 'lucide-react'
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
            <div className='flex px-4  mt-2'>
                <Heading title={"Create Setup"} description={"Complete all fields"} />
                {/* <div className='mb-4 text-xl flex gap-2 items-center font-semibold'>Create</div> */}
            </div>
            <div className='flex w-full h-full '>
                <div className=' flex flex-col w-1/2 gap-4  px-4 py-4'>
                    {/* first three block */}
                    <div className='mb-4 text-xl flex gap-2 items-center font-semibold'> <div className='text-blue-700 p-2 rounded-full bg-blue-100'><LayoutDashboard className='w-6 h-6 '></LayoutDashboard></div> <span>Cutsomize Your Course</span></div>
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
