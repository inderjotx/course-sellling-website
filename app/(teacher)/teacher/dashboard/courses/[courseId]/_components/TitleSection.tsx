'use client'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"



const formSchema = z.object({
    title: z.string().min(2).max(50),
})

type formSchemaType = typeof formSchema

export function TitleSection({ title, editText }
    : { title: string, editText: string }) {


    const form = useForm<z.infer<formSchemaType>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    return (
        <div className='bg-foreground/5 flex rounded-sm  flex-col gap-2 p-4 py-5'>
            <div className='flex items-center justify-between'>
                <h1 className='text-md font-semibold'>{title}</h1>
                <div className='flex items-center gap-2'>
                    <Pencil size={13} className=''></Pencil>
                    <span className='text-[14px] font-semibold'>{editText}</span>
                </div>
            </div>
            <div>
                <div className='font-light text-sm'>
                </div>
            </div>
        </div>
    )
}
