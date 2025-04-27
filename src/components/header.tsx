"use client"

import {useAuth} from "@/src/contexts/auth-context"
import {Settings, User} from "lucide-react"
import {Button} from "@/src/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {motion} from "framer-motion"
import Link from "next/link"

export default function Header() {
    const {user, signOut} = useAuth()

    return (
        <motion.header
            className="flex h-16 items-center justify-between border-b border-border/40 px-4 md:px-6"
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.3}}
        >
            <div className="flex items-center gap-4 md:gap-6">
                {/* Logo or brand can go here */}
            </div>
            <div className="flex items-center gap-4">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                {user.user_metadata?.avatar_url ? (
                                    <img
                                        src={user.user_metadata.avatar_url || "/placeholder.svg"}
                                        alt="User avatar"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="h-6 w-6"/>
                                )}
                                <span className="sr-only">Open user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/profile" className="flex items-center w-full">
                                    <User className="mr-2 h-4 w-4"/>
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings" className="flex items-center w-full">
                                    <Settings className="mr-2 h-4 w-4"/>
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Log in</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign up</Link>
                        </Button>
                    </div>
                )}
            </div>
        </motion.header>
    )
}
