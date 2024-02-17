'use client'
import { List, PlusCircle } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { addChapter } from '@/actions/addChapter'
import ChapterColumn from './ChapterColumn'
import { CourseBadge } from '@/components/CourseBadge'
import { Chapter } from '@/db'





export const ChapterForm = ({ chapters, id }: { chapters: Chapter[], id: number }) => {

    console.log('chpater form')
    const [editable, setEditable] = useState<boolean>(false)
    const [newChapter, setNewChapter] = useState<string>("")
    const [courseChapters, setcourseChapters] = useState<Chapter[]>(chapters)
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
        const response = await addChapter(id, newChapter)
        if (!response) {
            setNewChapter("")
            router.refresh()
            toast.error("Error Updating Title, Retry")
        }
        else {
            setEditable(false)
            setNewChapter("")
            router.refresh()
            toast.success("New chapter added Successfully")
        }


    }


    return (
        <div className='flex w-full  flex-col gap-2'>
            <CourseBadge Icon={List} Heading={'Course Chapters'} />
            <div className='bg-blue-100/50 flex rounded-sm  flex-col  px-6 py-5 '>
                <div className='flex items-center justify-between'>
                    <h1 className='text-md font-semibold'>Course Title </h1>
                    <div onClick={() => setEditable((prev) => !prev)} className='flex items-center gap-2 cursor-pointer'>
                        {
                            editable ?
                                <>
                                    <Button variant={"link"} > Cancel </Button>
                                </>
                                :

                                <>
                                    <PlusCircle className='h-4 w-4 '></PlusCircle>
                                    <span className='text-[11px] lg:text-[14px]  '>Edit Chapter</span>
                                </>
                        }
                    </div>
                </div>
                <div className='flex p-2 w-full gap-3  flex-col px-2'>
                    {

                        courseChapters.map((chapter, index) => (
                            <div key={index}
                                draggable
                                onDragStart={() => startPos.current = index}
                                onDragEnter={() => endPos.current = index}
                                onDragEnd={async () => await changePostion()}
                                className='w-full rounded-md overflow-hidden first:mt-4'  >
                                <ChapterColumn title={chapter.title} courseId={chapter.courseId} chapterId={chapter.id} isPublished={chapter.isPublished} />
                            </div>
                        ))
                    }

                </div>
                <div>
                    {/* input and form and after chaning we will update / pathch the value and refrst the browser  */}
                    {
                        editable &&
                        <div className='flex flex-col gap-3'>
                            <Input value={newChapter} placeholder='chapter name ...' onChange={(e) => setNewChapter(e.target.value)}  ></Input>
                            <div>
                                <Button onClick={handleChapterCreate} className='' variant={"default"} size={"sm"}>Save</Button>
                            </div>
                        </div>

                    }
                </div>
            </div>

        </div>
    )
}
