import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";

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
        <html lang="en">
            <body className={poppins.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
