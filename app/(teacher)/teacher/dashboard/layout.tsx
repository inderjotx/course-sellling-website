import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const links = {
    teacher: [{
        href: '/teacher/dashboard/courses',
        title: 'Courses'
    },
    {
        href: '/teacher/dashboard/analytics',
        title: 'Analytics'
    }],
    student: [{
        href: '/',
        title: 'My Dashboard'
    },
    {
        href: '',
        title: 'Discover'
    }]
}

export const metadata: Metadata = {
    title: "Creator Dashboard",
    description: "View Your Creator Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}
) {
    return (
        <div className="flex h-screen w-full" >
            <div className="hidden lg:flex flex-col items-start border h-full  lg:w-1/6  ">
                {
                    links.teacher.map(({ title, href }) => (
                        <div key={title} className="w-full  cursor-pointer py-4 px-6 hover:bg-accent ">
                            <Link href={href} >
                                {title}
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="w-full">
                {children}
            </div>

        </div>

    );
}
