import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { headers } from "next/headers";
import { Toaster } from 'react-hot-toast'
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en" suppressHydrationWarning >
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
                />
            </Head>
            <body className={inter.className}>

                <Navbar />
                <Toaster />
                {children}
            </body>
        </html>
    );
}
