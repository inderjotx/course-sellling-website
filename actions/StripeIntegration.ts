'use server'
import { db } from '@/db'
import { course } from '@/db/schema/course'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-10-16"
})



export async function getStripeIntent(courseId: number) {

    const headersList = headers()
    const couseData = await getCourseData(courseId)
    const lineItems = {
        price_data: {
            currency: "USD",
            product_data: {
                name: couseData.name,
            },
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
            cancel_url: `${headersList.get("origin")}/student/courses`
        })


        return session.id


    }

    catch (error) {
        console.log(error)
        return null
    }

}


const getCourseData = async (courseId: number) => {
    const courseData = await db.select({ name: course.title, price: course.price }).from(course).where(eq(course.id, courseId))
    return courseData[0]
}