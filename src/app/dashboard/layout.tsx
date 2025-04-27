"use client"

import type {ReactNode} from "react"
import Header from "@/src/components/header"
import QuickLogButton from "@/src/components/quick-log-button"
import {motion} from "framer-motion"
import Sidebar from "@/src/components/sidebar"
import {useAuth} from "@/src/contexts/auth-context";

export default function DashboardLayout({children}: { children: ReactNode }) {
    const {user, isLoading} = useAuth()

    // Show a loading indicator while auth state is being determined
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar/>
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header/>
                <motion.main
                    className="flex-1 overflow-y-auto p-6"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.3}}
                >
                    {children}
                </motion.main>
                <QuickLogButton/>
            </div>
        </div>
    )
}
