'use server'
import { auth } from '@/auth'
import { db } from '@/db'
import { course } from '@/db/schema/course'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-10-16"
})



export async function getStripeIntent(courseId: number,) {

    const headersList = headers()

    const session = await auth()
    const userId = session?.user.id
    if (!userId) {
        return null
    }

    const couseData = await getCourseData(courseId)




    const lineItems = {
        price_data: {
            currency: "USD",
            product_data: {
                name: couseData.name,
            },
            userId: userId,
            unit_amount: (couseData.price || 100) * 100,
        },
        quantity: 1
    };

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [lineItems],
            mode: "payment",
            success_url: `${headersList.get("origin")}/teacher/dashboard/courses`,
            cancel_url: `${headersList.get("origin")}/student/courses`,
            metadata: {
                courseId: couseData.id,
                userId: userId
            }
        })


        return session.id


    }

    catch (error) {
        console.log(error)
        return null
    }

}


const getCourseData = async (courseId: number) => {
    const courseData = await db.select({ name: course.title, price: course.price, id: course.id }).from(course).where(eq(course.id, courseId))
    return courseData[0]
}