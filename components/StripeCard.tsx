'use client'
import { getStripeIntent } from "@/actions/StripeIntegration";
import React from "react";
import { Button } from "./ui/button";
import getStripe from "@/lib/getStripe";
import { useSession } from "next-auth/react"


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
                        // show error 
                    }
                }

            }




        }} >
            <Button type="submit">Pay</Button>
        </form>
    )
        ;
}


/*

 switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

*/