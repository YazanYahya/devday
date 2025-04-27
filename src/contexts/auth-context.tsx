"use client"

import type React from "react"
import {createContext, useContext, useEffect, useState} from "react"
import type {Session, User} from "@supabase/supabase-js"
import {createClient} from "@/src/lib/supabase/client"
import {useRouter} from "next/navigation"

type AuthContextType = {
    user: User | null
    session: Session | null
    isLoading: boolean
    signUp: (
        email: string,
        password: string,
    ) => Promise<{
        error: Error | null
        success: boolean
    }>
    signIn: (
        email: string,
        password: string,
    ) => Promise<{
        error: Error | null
        success: boolean
    }>
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setIsLoading(false)

            if (event === "SIGNED_IN") {
                router.refresh()
            }
            if (event === "SIGNED_OUT") {
                router.refresh()
                router.push("/login")
            }
        })

        // Get initial session
        const initializeAuth = async () => {
            const {data} = await supabase.auth.getSession()
            setSession(data.session)
            setUser(data.session?.user ?? null)
            setIsLoading(false)
        }

        initializeAuth()

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [router, supabase.auth])

    const signUp = async (email: string, password: string) => {
        try {
            const {error} = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                return {error, success: false}
            }

            return {error: null, success: true}
        } catch (error) {
            return {error: error as Error, success: false}
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const {error} = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                return {error, success: false}
            }

            router.push("/dashboard")
            return {error: null, success: true}
        } catch (error) {
            return {error: error as Error, success: false}
        }
    }

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    const signOut = async () => {
        await supabase.auth.signOut()
    }

    const value = {
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
