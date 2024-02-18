import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'
import React from 'react'

export function CompleteTick({ value, content, isCompleted }: { value?: string, content: string, isCompleted?: boolean }) {
    return (
        <div className='flex gap-2 items-center'>
            <div className={cn(((value && value != "") || (isCompleted)) ? "text-green-400" : "text-gray-500")}>
                <CheckCircle2 className='w-5 h-5  ' ></CheckCircle2>
            </div>
            <h1 className='text-md font-semibold'> {content} </h1>
        </div>
    )
}
