import React from 'react'
import { StateComponet } from './_components/StateComponent'
import { Heading } from '@/components/Heading'

export default function page() {
    return (
        <div className='p-6'>
            <Heading title={"Create Setup"} description={"Complete all fields"} />
            <StateComponet />
        </div>
    )
}
