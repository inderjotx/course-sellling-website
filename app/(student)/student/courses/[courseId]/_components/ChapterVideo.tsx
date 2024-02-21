'use client'
import MuxPlayer from '@mux/mux-player-react'
import React from 'react'

export function ClientVideoPlayer({ playbackId }: { playbackId: string }) {
    return (
        <div className='w-full h-full'>
            <MuxPlayer
                onEnded={() => { }}
                className='w-full h-full '
                playbackId={playbackId}
            />
        </div>
    )
}
