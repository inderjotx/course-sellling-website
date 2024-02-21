
import { Chapter, db } from '@/db'
import MuxPlayer from '@mux/mux-player-react'
import React, { use } from 'react'
import { ClientVideoPlayer } from './ChapterVideo'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { progress } from '@/db/schema/course'

interface ChapterProps extends Chapter {
    muxData: {
        playbackId: string
    }[]
}


export async function ChapterView({ chapter, courseId }: { chapter: ChapterProps, courseId: number }) {

    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
        return
    }


    return (
        <div className='flex w-full h-full items-center flex-col px-6 gap-8  ' >

            {/* title */}
            <div className='text-2xl ' >{chapter.title} </div>
            <form action={async () => {
                "use server"
                await db.insert(progress).values({ courseId: courseId, chapterId: chapter.id, userId: userId })

            }}>
                <Button type='submit'  >MarkComplete</Button>
            </form>


            {/*  vidoe player */}
            <div className='w-full '>
                <ClientVideoPlayer playbackId={chapter.muxData[0].playbackId} />
            </div>



            {/*  description */}

            <div className='text-xl' > Description </div>
            <div className='mb-10' dangerouslySetInnerHTML={{ __html: chapter.description || "" }}  ></div>


        </div>
    )
}
