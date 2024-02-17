'use client'
import { Pencil, PlusCircle } from 'lucide-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { simplePathCourse } from '@/actions/simplePatchCourse'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { addChapter } from '@/actions/addChapter'
import ChapterColumn from './ChapterColumn'
import { getChapters } from '@/actions/getChapters'



interface ChapterFormProps {
    title: string,
    id: number,
    order: number,
    isPublished: boolean | null
}


export const ChapterForm = ({ courseId }: { courseId: string }) => {


    const [editable, setEditable] = useState<boolean>(false)
    const [newChapter, setNewChapter] = useState<string>("")
    const [courseChapters, setcourseChapters] = useState<ChapterFormProps[]>([])
    const [fetch, setFetch] = useState(false)
    const router = useRouter()
    const startPos = useRef<number>(0)
    const endPos = useRef<number>(0)



    const changePostion = async () => {

        const cloneArray = [...courseChapters]
        const temp = cloneArray[startPos.current]
        cloneArray[startPos.current] = cloneArray[endPos.current]
        cloneArray[endPos.current] = temp

        setcourseChapters(cloneArray)

    }


    const handleUpdate = async () => {


        // setEditable(false)
        // const response = await simplePathCourse(id, "title", courseChapters)
        // console.log(response)
        // if (response != courseChapters) {
        //     setcourseChapters("")
        //     toast.error("Error Updating Title, Retry")
        // }
        // else {
        //     router.refresh()
        //     toast.success("Title update Successfully")
        // }

    }


    const handleChapterCreate = async () => {

        // console.log(newChapter)
        const response = await addChapter(parseInt(courseId), newChapter)
        if (!response) {
            setNewChapter("")
            router.refresh()
            toast.error("Error Updating Title, Retry")
        }
        else {
            setFetch((prev) => !prev)
            setEditable(false)
            setNewChapter("")
            router.refresh()
            toast.success("Title update Successfully")
        }


    }


    return (
        <div className='bg-blue-100/50 flex rounded-sm  flex-col gap-6 px-6 py-5 '>
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
                                <PlusCircle className='h-4 w-4 '></PlusCircle>
                                <span className='text-[11px] lg:text-[14px]  '>Edit Chapter</span>
                            </>
                    }
                </div>
            </div>
            <div className='flex p-2 w-full gap-3 flex-col px-2'>
                {

                    courseChapters.map((chapter, index) => (
                        <div key={index}
                            draggable
                            onDragStart={() => startPos.current = index}
                            onDragEnter={() => endPos.current = index}
                            onDragEnd={async () => await changePostion()}
                            className='w-full rounded-md overflow-hidden'  >
                            <ChapterColumn title={chapter.title} id={chapter.order} isPublished={chapter.isPublished} />
                        </div>
                    ))
                }

            </div>
            <div>
                {/* input and form and after chaning we will update / pathch the value and refrst the browser  */}
                {
                    editable ?
                        <div className='flex flex-col gap-3'>
                            <Input value={newChapter} placeholder='chapter name ...' onChange={(e) => setNewChapter(e.target.value)}  ></Input>
                            <div>
                                <Button onClick={handleChapterCreate} className='' variant={"default"} size={"sm"}>Save</Button>
                            </div>
                        </div>

                        :

                        <div className='font-light text-sm'>
                            { }
                        </div>
                }
            </div>
        </div>
    )
}
