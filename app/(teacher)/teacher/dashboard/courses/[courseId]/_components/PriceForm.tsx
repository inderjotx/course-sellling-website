'use client'
import { CircleDollarSignIcon, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { simplePathCourse } from '@/actions/simplePatchCourse'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { toDollar } from '@/lib/formatCurrency'
import { CourseBadge } from '@/components/CourseBadge'
import { CompleteTick } from './CompleteTick'




export function PriceForm({ price, id }: { price: string, id: number }) {

    const [editable, setEditable] = useState<boolean>(false)
    const [coursePrice, setcoursePrice] = useState<string>(price)
    const router = useRouter()



    const handleUpdate = async () => {


        setEditable(false)
        const response = await simplePathCourse(id, "price", parseInt(coursePrice))
        console.log(response)
        if (response != coursePrice) {
            setcoursePrice("")
            toast.error("Error Updating Price, Retry")
        }
        else {
            router.refresh()
            toast.success("Price update Successfully")
        }

    }


    return (
        <div className='flex w-full h-full flex-col gap-2'>

            <CourseBadge Icon={CircleDollarSignIcon} Heading='Sell Your Course' />
            <div className='bg-blue-100/50 flex rounded-sm  flex-col gap-6 px-6 py-5 '>
                <div className='flex items-center justify-between'>
                    <CompleteTick value={price} content='Price'  ></CompleteTick>
                    <div onClick={() => setEditable((prev) => !prev)} className='flex items-center gap-2 cursor-pointer'>
                        {
                            editable ?
                                <>
                                    <Button variant={"ghost"} > Cancel </Button>
                                </>
                                :

                                <>
                                    <Pencil className='h-3 w-3 '></Pencil>
                                    <span className='text-[11px] lg:text-[14px]  '>Edit Price</span>
                                </>
                        }
                    </div>
                </div>
                <div>
                    {/* input and form and after chaning we will update / pathch the value and refrst the browser  */}
                    {
                        editable ?
                            <div className='flex flex-col gap-3'>
                                <Input type='number' value={coursePrice} onChange={(e) => setcoursePrice(e.target.value)}  ></Input>
                                <div>
                                    <Button onClick={handleUpdate} className='' variant={"default"} size={"sm"}>Save</Button>
                                </div>
                            </div>

                            :

                            <div className='font-light text-sm'>
                                {coursePrice != "" ? `${toDollar(coursePrice)}` : ""}
                            </div>
                    }
                </div>
            </div>

        </div>
    )
}
