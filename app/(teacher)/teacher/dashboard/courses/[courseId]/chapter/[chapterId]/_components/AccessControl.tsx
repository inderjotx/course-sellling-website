'use client'
import { Eye, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { simplePathCourse } from '@/actions/simplePatchCourse'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { CourseBadge } from '@/components/CourseBadge'
import { updateChapter } from '@/actions/updateChapter'




export function AccessControl({ isPublic, courseId, chapterId }: { isPublic: boolean, courseId: number, chapterId: number }) {


    const [editable, setEditable] = useState<boolean>(false)
    const [courseIsPublic, setcourseIsPublic] = useState<boolean>(isPublic)
    const router = useRouter()



    const handleUpdate = async () => {


        setEditable(false)
        console.log(courseIsPublic)
        const response = await updateChapter(courseId, chapterId, "isPublic", courseIsPublic)
        console.log(response)
        if (response != courseIsPublic) {
            toast.error("Error Updating Title, Retry")
        }
        else {
            router.refresh()
            toast.success("Title update Successfully")
        }

    }


    return (
        <div className='flex w-full  flex-col gap-2'>
            <CourseBadge Icon={Eye} Heading={'Access Control'} />
            <div className='bg-blue-100/50 flex rounded-sm  flex-col gap-6 px-6 py-5 '>
                <div className='flex items-center justify-between'>
                    <h1 className='text-md font-semibold'>Access Control</h1>
                    <div onClick={() => setEditable((prev) => !prev)} className='flex items-center gap-2 cursor-pointer'>
                        {
                            editable ?
                                <>
                                    <Button variant={"link"} > Cancel </Button>
                                </>
                                :

                                <>
                                    <Pencil className='h-3 w-3 '></Pencil>
                                    <span className='text-[11px] lg:text-[14px]  '>Edit Access Control</span>
                                </>
                        }
                    </div>
                </div>
                <div>
                    {/* input and form and after chaning we will update / pathch the value and refrst the browser  */}
                    {
                        editable ?
                            <div className='flex flex-col gap-6'>
                                <div className='flex gap-4  items-center '>
                                    <Checkbox checked={courseIsPublic} onCheckedChange={(state: boolean) => setcourseIsPublic(state)} >
                                    </Checkbox>
                                    <Label>Is this chapter free for Preview ? </Label>
                                </div>
                                <div>
                                    <Button onClick={handleUpdate} className='' variant={"default"} size={"sm"}>Save</Button>
                                </div>
                            </div>

                            :
                            <div className='text-sm'>This chapter is <span className='font-bold'>{!isPublic ? "not free" : "free"}</span> for preview </div>
                    }
                </div>
            </div>
        </div>
    )
}
