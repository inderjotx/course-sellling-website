'use client'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'




export function TitleForm({ title }: { title: string }) {


    const [editable, setEditable] = useState<boolean>(false)
    const [courseTitle, setCourseTitle] = useState<string>(title)




    return (
        <div className='bg-foreground/5 flex rounded-sm  flex-col gap-3 px-6 py-5 '>
            <div className='flex items-center justify-between'>
                <h1 className='text-md font-semibold'>Course Title </h1>
                <div onClick={() => setEditable((prev) => !prev)} className='flex items-center gap-2 cursor-pointer'>
                    {
                        editable ?
                            <>
                                <Button variant={"ghost"} > Cancel </Button>
                            </>
                            :

                            <>
                                <Pencil size={15} className=''></Pencil>
                                <span className='text-[14px] font-semibold'>Edit title</span>
                            </>
                    }
                </div>
            </div>
            <div>
                {/* input and form and after chaning we will update / pathch the value and refrst the browser  */}
                {
                    editable ?
                        <div className='flex flex-col gap-1'>
                            <Input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}  ></Input>
                            <div>
                                <div className='text-sm p-1 h-8 w-12 rounded-sm flex items-center justify-center bg-black text-white'  >Save</div>
                            </div>
                        </div>

                        :

                        <div className='font-light text-sm'>
                            {title}
                        </div>
                }
            </div>
        </div>
    )
}
