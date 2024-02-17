import { LucideIcon, LucideProps } from 'lucide-react'
import React from 'react'

export function CourseBadge({ Icon, Heading }:
    { Icon: React.ComponentType<any>, Heading: string }) {
    return (
        <div className='mb-4 text-xl flex gap-2 items-center font-semibold'>
            <div className='text-blue-700 p-2 rounded-full bg-blue-100'>
                <Icon className="w-6 h-6" />
            </div>
            <span>{Heading}</span>
        </div>
    )
}
