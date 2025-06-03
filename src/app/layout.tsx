"use client";
import "./globals.css";
import React, {useEffect} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { Suspense } from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const queryClient = new QueryClient();
export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const [animationParent] = useAutoAnimate();
    return (
        <html lang="en">
            <head>
                <title>BrainUp</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
                    rel="stylesheet"/>
            </head>
            <body className={`antialiased instrument`} ref={animationParent}>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<></>}>
                    {children}
                </Suspense>
            </QueryClientProvider>
            </body>
        </html>
    );
}
