"use client"

import type React from "react"
import {useState} from "react"
import {Button} from "@/src/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Input} from "@/src/components/ui/input"
import {Label} from "@/src/components/ui/label"
import Link from "next/link"
import {Target} from "lucide-react"
import {useAuth} from "@/src/contexts/auth-context"
import {useToast} from "@/src/hooks/use-toast"
import {FcGoogle} from "react-icons/fc"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {signIn, signInWithGoogle} = useAuth()
    const {toast} = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const {error, success} = await signIn(email, password)

            if (!success) {
                toast({
                    title: "Login failed",
                    description: error?.message || "Please check your credentials and try again.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Login failed",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
        } catch (error) {
            toast({
                title: "Google sign-in failed",
                description: "An error occurred during Google sign-in. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
            <Link href="/" className="mb-8 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary"/>
                <span className="text-xl font-bold">DevDay</span>
            </Link>

            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Log in</CardTitle>
                    <CardDescription>Enter your email and password to access your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"/>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                            <FcGoogle className="mr-2 h-4 w-4"/>
                            Google
                        </Button>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Log in"}
                        </Button>
                        <div className="text-center text-sm">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
