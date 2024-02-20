import { Sidebar } from '@/components/Sidebar'
import React from 'react'

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-full" >
            <Sidebar />
            <div className="w-full px-4 pt-5">
                {children}
            </div>

        </div>
    )
}
