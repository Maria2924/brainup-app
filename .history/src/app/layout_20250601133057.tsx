"use client";
import "./globals.css";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
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
            <body className={`antialiased instrument`}>
            <QueryClientProvider client={queryClient}>
                <Suspensefal>
                    {children}
                </Suspense>
            </QueryClientProvider>
            </body>
        </html>
    );
}
