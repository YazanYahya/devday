"use client"

import {usePathname} from "next/navigation"
import Link from "next/link"
import {motion} from "framer-motion"
import {cn} from "@/src/utils/utils"
import {Button} from "@/src/components/ui/button"
import {CalendarDays, ClipboardList, LayoutDashboard, LogOut, Menu, Settings, Target, X,} from "lucide-react"
import {useState} from "react"
import {useAuth} from "@/src/contexts/auth-context"

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const {signOut} = useAuth()

    const mainRoutes = [
        {
            label: "Today",
            icon: <LayoutDashboard className="h-5 w-5"/>,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Goals",
            icon: <Target className="h-5 w-5"/>,
            href: "/dashboard/goals",
            active: pathname === "/dashboard/goals" || pathname.startsWith("/dashboard/goals/"),
        },
        {
            label: "Logs",
            icon: <ClipboardList className="h-5 w-5"/>,
            href: "/dashboard/logs",
            active: pathname === "/dashboard/logs" || pathname.startsWith("/dashboard/logs/"),
        },
    ]

    return (
        <>
            <div className="flex h-14 items-center justify-between border-b border-border bg-background px-4 md:hidden">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <span className="text-lg font-medium">DevDay</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-8 w-8">
                    {isOpen ? <X className="h-4 w-4"/> : <Menu className="h-4 w-4"/>}
                </Button>
            </div>

            <motion.div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 transform border-r border-border bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out md:static md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                )}
                initial={false}
            >
                <div className="flex h-14 items-center border-b border-border px-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="relative h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                            <CalendarDays className="h-4 w-4 text-primary"/>
                        </div>
                        <span className="text-lg font-semibold tracking-tight">DevDay</span>
                    </Link>
                </div>
                <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto">
                    <div className="flex-1 py-4">
                        <nav className="space-y-1 px-3">
                            {mainRoutes.map((route) => (
                                <Link key={route.href} href={route.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-3 px-4 py-3 h-auto text-base font-medium text-muted-foreground hover:bg-accent/50 rounded-lg transition-all",
                                            route.active && "bg-accent text-foreground shadow-sm",
                                        )}
                                    >
                                        <div
                                            className={cn("p-1.5 rounded-md", route.active ? "bg-primary/10" : "bg-muted")}>
                                            {route.icon}
                                        </div>
                                        <span>{route.label}</span>
                                        {route.active && (
                                            <motion.div
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                                                layoutId="sidebar-indicator"
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                transition={{duration: 0.2}}
                                            />
                                        )}
                                    </Button>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="px-3 pb-4 border-t border-border pt-4 space-y-1">
                        <Link href="/dashboard/settings">
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 px-4 py-3 h-auto text-base font-medium text-muted-foreground hover:bg-accent/50 rounded-lg transition-all",
                                    pathname === "/dashboard/settings" && "bg-accent text-foreground shadow-sm",
                                )}
                            >
                                <div
                                    className={cn("p-1.5 rounded-md", pathname === "/dashboard/settings" ? "bg-primary/10" : "bg-muted")}>
                                    <Settings className="h-5 w-5"/>
                                </div>
                                <span>Settings</span>
                                {pathname === "/dashboard/settings" && (
                                    <motion.div
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                                        layoutId="sidebar-indicator-secondary"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 0.2}}
                                    />
                                )}
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 px-4 py-3 h-auto text-base font-medium text-muted-foreground hover:bg-accent/50 rounded-lg transition-all"
                            onClick={() => signOut()}
                        >
                            <div className="p-1.5 rounded-md bg-muted">
                                <LogOut className="h-5 w-5"/>
                            </div>
                            <span>Log Out</span>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
