'use client'
import { Check, CheckCircle2, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { simplePathCourse } from '@/actions/simplePatchCourse'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { CompleteTick } from './CompleteTick'




export function TitleForm({ title, id }: { title: string, id: number }) {

    console.log('titel clietn')

    const [editable, setEditable] = useState<boolean>(false)
    const [courseTitle, setCourseTitle] = useState<string>(title)
    const router = useRouter()



    const handleUpdate = async () => {


        setEditable(false)
        const response = await simplePathCourse(id, "title", courseTitle)
        console.log(response)
        if (response != courseTitle) {
            setCourseTitle("")
            toast.error("Error Updating Title, Retry")
        }
        else {
            router.refresh()
            toast.success("Title update Successfully")
        }

    }


    return (
        <div draggable className='bg-blue-100/50 flex rounded-sm  flex-col gap-6 px-6 py-5 '>
            <div className='flex items-center justify-between'>
                <CompleteTick value={title} content='Title'  ></CompleteTick>
                <div onClick={() => setEditable((prev) => !prev)} className='flex items-center gap-2 cursor-pointer'>
                    {
                        editable ?
                            <>
                                <Button variant={"link"} > Cancel </Button>
                            </>
                            :

                            <>
                                <Pencil className='h-3 w-3 '></Pencil>
                                <span className='text-[11px] lg:text-[14px]  '>Edit Title</span>
                            </>
                    }
                </div>
            </div>
            <div>
                {/* input and form and after chaning we will update / pathch the value and refrst the browser  */}
                {
                    editable ?
                        <div className='flex flex-col gap-3'>
                            <Input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}  ></Input>
                            <div>
                                <Button onClick={handleUpdate} className='' variant={"default"} size={"sm"}>Save</Button>
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
