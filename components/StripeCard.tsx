'use client'
import { getStripeIntent } from "@/actions/StripeIntegration";
import React from "react";
import { Button } from "./ui/button";
import getStripe from "@/lib/getStripe";


export function StripePay({ courseId }: { courseId: number }) {



    return (
        <form action={async () => {

            const stripePromise = getStripe()
            const stripe = await stripePromise

            if (stripe) {

                const session = await getStripeIntent(courseId)
                console.log(session)

                if (session) {
                    const stripeError = await stripe.redirectToCheckout({ sessionId: session })
                    if (stripeError) {
                        console.log(stripeError)
                    }
                    else {
                        // precesses user purchage not as there was no errors
                    }
                }

            }




        }} >
            <Button type="submit">Pay</Button>
        </form>
    )
        ;
}
