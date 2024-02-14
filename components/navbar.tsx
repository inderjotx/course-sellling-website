import { auth, signIn, signOut } from '@/auth'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export async function Navbar() {
    const session = await auth()

    const user = session?.user


    return (
        <div className='flex items-center  h-16 w-full pt-2 px-6 '>
            <div className='text-lg'>
                Logo
            </div>

            <div className='flex ml-auto gap-3'>
                {
                    user
                        ?
                        <form action={async () => {
                            "use server"
                            await signOut()
                        }}>
                            <Button size={"icon"} variant={"ghost"} >
                                <LogOut className='w-6 h-6 '>
                                </LogOut>
                            </Button>
                        </form>
                        :
                        <form action={async () => {
                            "use server"
                            await signIn()
                        }}>
                            <Button className="rounded-[20px]"  >
                                Sign In
                            </Button>
                        </form>
                }
                <div>
                    {
                        user &&
                        <Avatar>
                            <AvatarImage src={user.image || ""} ></AvatarImage>
                            <AvatarFallback>{user.name?.substring(0, 2)} </AvatarFallback>
                        </Avatar>
                    }
                </div>
            </div>
        </div>
    )
}
