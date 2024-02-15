'use client'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { createCourse } from '@/actions/createCourse'
import { Button } from '@/components/ui/button'

export default function Page() {

    const [open, setOpen] = useState<boolean>(true)
    const [mounted, setMounted] = useState<boolean>(false)
    const [title, setTitle] = useState("")
    const router = useRouter()



    useEffect(() => {

        setMounted(true)

        if (open == false) {
            router.push('/teacher/dashboard/courses')
        }

    }, [open, router])


    if (!mounted) {
        return <></>
    }


    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Course Title</DialogTitle>
                    <DialogDescription>
                        You can change the name later
                    </DialogDescription>
                </DialogHeader>


                <form action={async () => {

                    await createCourse(title)

                }}  >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="courseName"
                                className="col-span-3"
                                placeholder='Course Name ....'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='flex '>
                            <Button className='ml-auto'>Submit</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
