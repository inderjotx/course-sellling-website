
import { cn } from '@/lib/utils'
import { ListVideo, LockIcon, School } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function DataSideBar({ data }: { data: { title: string, href: string, isPublic: boolean }[] }) {


    return (
        <div className="hidden lg:flex rounded-t flex-col group items-start border h-full  lg:w-1/6  ">
            {
                data.map(({ title, href, isPublic }, index) => (
                    <div key={title} className={cn("w-full text-sm first:text-lg flex gap-2   first:border-b  cursor-pointer py-4 px-6  hover:bg-accent ")}>
                        {

                            index != 0 ?
                                isPublic ?
                                    <div> <ListVideo></ListVideo> </div>
                                    :
                                    <div>
                                        <LockIcon></LockIcon>
                                    </div>


                                :
                                <div>
                                    <School></School>
                                </div>


                        }
                        <Link className='flex ' href={href} >
                            {title}
                        </Link> </div>
                ))
            }
        </div>
    )
}