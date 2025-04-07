import type { Metadata } from "next";
import { Ubuntu, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
    variable: "--font-ubuntu",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "HireVision",
    description: "HireVision Admin Panel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ubuntu.variable} ${poppins.variable}`}>
                <div className="bg-[url('/purple-bg.png')] bg-cover bg-center">
                    <Toaster />
                    <Navbar />
                    {children}
                </div>
            </body>
        </html>
    );
}
