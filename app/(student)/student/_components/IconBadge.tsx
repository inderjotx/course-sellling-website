import React, { ComponentType } from 'react'





export function IconBadge({ Icon, size, className }: {
    Icon: ComponentType<any>, size: "small" | "large" | "medium"
    className: string
}) {

    const Map = {
        "small": "w-4 h-4",
        "medium": "w-6 h-6",
        "large": "w-12 h-12",
    }


    return (
        <div className={className} > <Icon className={`${Map[size]} `} /> </div>
    )
}
