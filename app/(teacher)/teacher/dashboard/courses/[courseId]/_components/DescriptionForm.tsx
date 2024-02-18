'use client'
import { CheckCircle2, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { simplePathCourse } from '@/actions/simplePatchCourse'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { CompleteTick } from './CompleteTick'




export function DescriptionForm({ description, id }: { description: string, id: number }) {


    console.log('descritpion clietn')
    const [editable, setEditable] = useState<boolean>(false)
    const [courseDescription, setCourseDescription] = useState<string>(description)
    const router = useRouter()



    const handleUpdate = async () => {


        setEditable(false)
        const response = await simplePathCourse(id, "description", courseDescription)
        console.log(response)
        if (response != courseDescription) {
            setCourseDescription("")
            toast.error("Error Updating Description, Retry")
        }
        else {
            router.refresh()
            toast.success(" Description updated Successfully")
        }

    }


    return (
        <div className='bg-blue-100/50 flex rounded-sm  flex-col gap-6 px-6 py-5 '>
            <div className='flex items-center justify-between'>
                <CompleteTick value={description} content='Description' />
                <div onClick={() => setEditable((prev) => !prev)} className='flex items-center gap-2 cursor-pointer'>
                    {
                        editable ?
                            <>
                                <Button variant={"link"} > Cancel </Button>
                            </>
                            :

                            <>
                                <Pencil className='h-3 w-3 '></Pencil>
                                <span className='text-[11px] lg:text-[14px]  '>Edit Description</span>
                            </>
                    }
                </div>
            </div>
            <div>
                {/* input and form and after chaning we will update / pathch the value and refrst the browser  */}
                {
                    editable ?
                        <div className='flex flex-col gap-3'>
                            <Textarea value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}  ></Textarea>
                            <div>
                                <Button onClick={handleUpdate} className='' variant={"default"} size={"sm"}>Save</Button>
                            </div>
                        </div>

                        :

                        <div className='font-light italic text-sm'>
                            {description}
                        </div>
                }
            </div>
        </div>
    )
}
