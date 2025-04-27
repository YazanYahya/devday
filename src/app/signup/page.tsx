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
import {useRouter} from "next/navigation"

export default function SignupPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {signUp, signInWithGoogle} = useAuth()
    const {toast} = useToast()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match",
                description: "Please make sure your passwords match.",
                variant: "destructive",
            })
            return
        }

        setIsLoading(true)

        try {
            const {error, success} = await signUp(email, password)

            if (success) {
                toast({
                    title: "Account created",
                    description: "Please check your email to confirm your account.",
                })

                // In a real app, you would update the user's profile with first and last name
                // This would be done after email verification

                router.push("/login")
            } else {
                toast({
                    title: "Sign up failed",
                    description: error?.message || "An error occurred during sign up.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Sign up failed",
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
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your information to create your DevDay account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                       required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                       required/>
                            </div>
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {isLoading ? "Creating account..." : "Sign up"}
                        </Button>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Log in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
