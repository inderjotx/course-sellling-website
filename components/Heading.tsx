import React from 'react'

export function Heading({ title, description, ratio }: { ratio?: string, title: string, description: string }) {
    return (
        <div className='flex flex-col gap-1'>
            <div className='text-xl font-semibold'> {title}</div>
            <div className='text-[12px] text-muted-foreground'>{description} {ratio && `(${ratio})`}</div>
        </div>
    )
}
