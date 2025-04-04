import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
    variable: "--font-ubuntu",
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
            <body className={ubuntu.variable}>
                <div className="bg-[url('/purple-bg.png')] bg-cover bg-center min-h-screen py-6">
                    <Toaster />
                    <Navbar />
                    {children}
                </div>
            </body>
        </html>
    );
}
