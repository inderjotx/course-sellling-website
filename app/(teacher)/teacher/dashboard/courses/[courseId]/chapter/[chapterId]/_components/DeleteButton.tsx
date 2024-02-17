import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { chapter } from "@/db/schema/course"
import { eq } from "drizzle-orm"
import { Trash2 } from "lucide-react"
import { redirect } from "next/navigation"

export function DeleteButton({ chapterId, courseId }: { chapterId: number, courseId: number }) {


    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button variant="destructive" size={"icon"} >
                    <Trash2></Trash2>
                </Button>
            </AlertDialogTrigger>




            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete chapter from you course.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>


                    <form action={async () => {
                        "use server"
                        await db.delete(chapter).where(eq(chapter.id, chapterId))
                        redirect(`/teacher/dashboard/courses/${courseId}`)
                    }} >

                        <AlertDialogCancel type="button" >Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit" >Continue</AlertDialogAction>
                    </form>


                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
