'use client'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { simplePathCourse } from '@/actions/simplePatchCourse'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { updateChapter } from '@/actions/updateChapter'




export function TitleForm({ title, courseId, chapterId }: { title: string, courseId: number, chapterId: number }) {


    const [editable, setEditable] = useState<boolean>(false)
    const [courseTitle, setCourseTitle] = useState<string>(title)
    const router = useRouter()



    const handleUpdate = async () => {


        setEditable(false)
        const response: any = await updateChapter(courseId, chapterId, "title", courseTitle)
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
        <div className='bg-blue-100/50 flex rounded-sm  flex-col gap-6 px-6 py-5 '>
            <div className='flex items-center justify-between'>
                <h1 className='text-md font-semibold'>Title </h1>
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
