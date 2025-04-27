import type React from "react"
import type {Metadata} from "next"
import {Inter, JetBrains_Mono} from "next/font/google"
import "./globals.css"
import {ThemeProvider} from "@/src/components/theme-provider"
import {Toaster} from "@/src/components/ui/toaster"
import {AuthProvider} from "@/src/contexts/auth-context"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
})

export const metadata: Metadata = {
    title: "DevDay",
    description:
        "Track your daily progress, set goals, and accelerate your growth as a developer with AI-powered insights"
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>
                {children}
                <Toaster/>
            </AuthProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
