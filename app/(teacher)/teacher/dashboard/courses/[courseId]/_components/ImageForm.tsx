'use client'
import { Divide, ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import React, { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import { simplePathCourse } from '@/actions/simplePatchCourse'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { UploadButton, UploadDropzone } from '@/components/UploadThingComponents'
import Image from "next/image"



export function ImageForm({ imageUrl, id }: { imageUrl: string, id: number }) {


    const [editable, setEditable] = useState<boolean>(false)
    const [courseImageUrl, setCourseImageUrl] = useState<string>(imageUrl)
    const router = useRouter()



    const handleUpdate = async (newImageUrl: string) => {

        const response = await simplePathCourse(id, "thumbnail", newImageUrl)
        console.log(response)
        if (response != newImageUrl) {
            setCourseImageUrl("")
            toast.error("Error Updating Image, Retry")
        }
        else {
            setCourseImageUrl("")
            setEditable(false)
            router.refresh()
            toast.success(" Image update Successfully")
        }

    }


    return (
        <div className='bg-blue-100/50 flex rounded-sm  flex-col gap-6 px-6 py-5 '>
            <div className='flex items-center justify-between'>
                <h1 className='text-md font-semibold'>Course Cover Image</h1>
                <div onClick={() => setEditable((prev) => !prev)} className='flex items-center justify-center gap-2 cursor-pointer'>
                    {
                        editable ?
                            <>
                                <Button variant={"link"} className='no-underline' > Cancel </Button>
                            </>
                            :

                            <>
                                <PlusCircle className='h-4 w-4 '></PlusCircle>
                                <span className='text-[11px] lg:text-[14px]  '>Edit Image</span>
                            </>
                    }
                </div>
            </div>


            <div className='relative w-full h-80 bg-blue-100/80 rounded-md flex justify-center items-center overflow-hidden'>
                {
                    editable ?
                        <div className='w-full h-full absolute'
                        >
                            <UploadDropzone
                                endpoint="imageUploader"
                                className='w-full h-full mt-0 '
                                onClientUploadComplete={async (res: { url: string }[]) => {

                                    await handleUpdate(res[0].url)
                                    console.log("Files: ", res);
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    alert(error)
                                }}
                            />
                        </div>
                        :

                        <div>
                            {imageUrl != "" ?
                                <Image src={imageUrl} priority fill alt={"course thumbnail image"} quality={100} sizes='100%' className='absolute object-cover' ></Image>
                                :
                                <ImageIcon size={30} ></ImageIcon>
                            }
                        </div>
                }
            </div>
        </div>
    )
}
