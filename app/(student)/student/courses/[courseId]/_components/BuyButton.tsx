import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { purchases } from "@/db/schema/course"
import { revalidatePath } from "next/cache"


export function BuyButton({ userId, courseId }: { userId: string, courseId: number }) {
    return (
        <div>
            <form action={async () => {
                "use server"
                // purchages 
                await db.insert(purchases).values({ courseId: courseId, userId: userId })

                revalidatePath(`/student/courses/${courseId}`)
                revalidatePath(`/student/my-courses`)


            }}>

                <Button>Buy Course</Button>

            </form>

        </div>
    )
}
