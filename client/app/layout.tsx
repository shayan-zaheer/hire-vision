import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gilroy = localFont({
    src: [
        {
            path: "./fonts/Gilroy-Black.ttf",
            weight: "900",
            style: "normal",
        },
        {
            path: "./fonts/Gilroy-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "./fonts/Gilroy-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/Gilroy-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/Gilroy-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/Gilroy-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/Gilroy-Thin.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "./fonts/Gilroy-UltraLight.ttf",
            weight: "100",
            style: "normal",
        },
    ],
    variable: "--font-gilroy",
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
            <body className={gilroy.variable}>{children}</body>
        </html>
    );
}
