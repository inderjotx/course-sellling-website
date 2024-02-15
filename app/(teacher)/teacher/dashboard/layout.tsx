import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "700", "800", "400", "500", "600"] });

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
            <div className="flex flex-col items-start border   h-full md:w-1/4 lg:w-1/6 ">
                <div className="w-full cursor-pointer py-4 px-6 hover:bg-accent ">
                    <Link href={'/teacher/dashboard/courses'} >
                        Courses
                    </Link>
                </div>
                <div className="w-full  cursor-pointer py-4 px-6 hover:bg-accent ">
                    <Link href={'/teacher/dashboard/analytics'} >
                        Analytics
                    </Link>
                </div>
            </div>
            <div className="w-full">
                {children}
            </div>

        </div>
    );
}
