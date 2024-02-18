import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { course } from '@/db/schema/course'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import React from 'react'

export default function PublishButton({ isDisabled, courseId, isPublished }: { isDisabled: boolean, courseId: number, isPublished: boolean }) {
    return (
        <div>
            <form action={async () => {
                "use server"
                await db.update(course).set({ isPublished: !isPublished }).where(eq(course.id, courseId))
                revalidatePath(`/teacher/dashboard/courses/${courseId}`)
            }} >
                <Button type='submit' disabled={isDisabled} >{isPublished ? "Unpublish" : "Publish"}</Button>
            </form>
        </div>
    )
}
