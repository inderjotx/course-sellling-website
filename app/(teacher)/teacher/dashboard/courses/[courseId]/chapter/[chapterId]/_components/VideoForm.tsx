'use client'
import { Divide, ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react'
import React, { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { UploadDropzone } from '@/components/UploadThingComponents'
import { CourseBadge } from '@/components/CourseBadge'
import MuxPlayer from '@mux/mux-player-react'
import { handleUpload } from '@/actions/handleVideoUpload'


export function VideoForm({ assetId, courseId, chapterId }: { assetId: string, courseId: number, chapterId: number }) {


    const [editable, setEditable] = useState<boolean>(false)
    const router = useRouter()
    console.log("assetId")
    console.log(assetId)


    const handleUpdate = async (newVideoUrl: string) => {

        const response = await handleUpload(chapterId, courseId, newVideoUrl)
        console.log(response)
        if (!response) {
            toast.error("Error Updating Vidoe, Retry")
        }
        else {
            setEditable(false)
            router.refresh()
            toast.success(" Video uploaded Successfully")
        }

    }


    return (


        <div className='flex w-full  flex-col gap-2'>
            <CourseBadge Icon={Video} Heading={'Course Video'} />
            <div className='bg-blue-100/50 flex rounded-sm  flex-col gap-6 px-6 py-5 '>
                <div className='flex items-center justify-between'>
                    <h1 className='text-md font-semibold'>Chapter Video </h1>
                    <div onClick={() => setEditable((prev) => !prev)} className='flex items-center justify-center gap-2 cursor-pointer'>
                        {
                            editable ?
                                <>
                                    <Button variant={"link"} className='no-underline' > Cancel </Button>
                                </>
                                :

                                <>
                                    <PlusCircle className='h-4 w-4 '></PlusCircle>
                                    <span className='text-[11px] lg:text-[14px]  '>Change  Video </span>
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
                                    endpoint="videoUploader"
                                    className='w-full h-full mt-0 '
                                    onClientUploadComplete={async (res: { url: string }[]) => {

                                        await handleUpdate(res[0].url)
                                    }}
                                    onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        alert(error)
                                    }}
                                />
                            </div>
                            :

                            <div className='w-full h-full absolute'>
                                {assetId != "" ?
                                    <MuxPlayer
                                        className='w-full h-full '
                                        playbackId={assetId}
                                        metadata={{
                                            videoId: assetId
                                        }} >

                                    </MuxPlayer>
                                    :
                                    <Video size={30} className='absolute top-1/2 left-1/2' ></Video>
                                }
                            </div>
                    }
                </div>
                <div className='text-muted-foreground text-sm'>Videos can sometimes take time to transcode , you can either refresh the page or publish chapter </div>
            </div>
        </div>
    )
}
