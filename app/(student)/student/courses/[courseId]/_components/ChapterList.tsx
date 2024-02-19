import React from 'react'
import { IconBadge } from '../../../_components/IconBadge'
import { NotepadTextIcon } from 'lucide-react'

export function ChapterList({ title, description, index }: {
    title: string,
    description: string, index: number
}) {
    return (
        <div key={index} className='flex gap-3 items-center w-2/3 lg:w-full py-2 px-2 rounded-md  ' >
            <IconBadge Icon={NotepadTextIcon} size='medium' className='text-lg bg-purple-100 rounded-full p-1 text-purple-600' />
            <div>{title}</div>

        </div>
    )
}
