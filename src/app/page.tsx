"use client"

import {useEffect, useRef, useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {motion, useInView, useScroll, useTransform} from "framer-motion"
import {ArrowRight, BarChart2, Calendar, CheckCircle, Clock, Sparkles, Target} from "lucide-react"
import {Button} from "@/src/components/ui/button"
import {cn} from "@/src/utils/utils"
import FeatureCard from "@/src/components/feature-card"
import AnimatedGradient from "@/src/components/animated-gradient"

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false)
    const heroRef = useRef(null)
    const featuresRef = useRef(null)
    const ctaRef = useRef(null)

    const featuresInView = useInView(featuresRef, {once: true, amount: 0.2})
    const ctaInView = useInView(ctaRef, {once: true, amount: 0.5})

    const {scrollYProgress} = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })

    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent",
                )}
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <Target className="h-6 w-6 text-primary"/>
                        <span className="text-xl font-bold">DevDay</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <Link href="/login">
                                <Button variant="ghost">Log in</Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="bg-primary/90 hover:bg-primary transition-colors">Sign up</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="sm" className="bg-primary/90 hover:bg-primary transition-colors">Sign
                                up</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <AnimatedGradient/>

                <motion.div
                    className="container mx-auto px-4 relative z-10"
                    style={{opacity: heroOpacity, y: heroY, scale: heroScale}}
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <motion.div
                            className="lg:max-w-[50%] text-center lg:text-left"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                        >
                            <div
                                className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-medium text-sm">
                                Developer Productivity Platform
                            </div>
                            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/80">
                                Empower Your <span className="text-primary">Dev Day</span> with AI
                            </h1>
                            <p className="mx-auto lg:mx-0 mb-8 max-w-2xl text-xl text-muted-foreground leading-relaxed">
                                Set goals, track daily progress, and accelerate your growth as a software developer with
                                AI-powered insights.
                            </p>

                            <motion.div
                                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: 0.2}}
                            >
                                <Link href="/signup">
                                    <Button size="lg"
                                            className="gap-2 h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                                        Get Started <ArrowRight className="h-4 w-4"/>
                                    </Button>
                                </Link>
                                <Link href="#features">
                                    <Button size="lg" variant="outline"
                                            className="h-12 px-8 border-primary/20 hover:border-primary/40 transition-all">
                                        See Features
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="lg:max-w-[50%]"
                            initial={{opacity: 0, x: 40}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.8, delay: 0.4}}
                        >
                            <div
                                className="relative rounded-xl border border-primary/20 bg-card/50 shadow-xl backdrop-blur-sm overflow-hidden ai-glow">
                                <Image
                                    src="/hero.png"
                                    alt="DevDay Hero Image"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Features */}
            <section id="features" ref={featuresRef} className="py-24 bg-gradient-to-b from-muted/30 to-background">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{opacity: 0, y: 20}}
                        animate={featuresInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6}}
                    >
                        <div
                            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary font-medium text-sm">
                            Powerful Features
                        </div>
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Features Built
                            for Developers</h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Tools designed to help you track, measure, and accelerate your professional growth
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            icon={<Target className="h-10 w-10 text-primary"/>}
                            title="Goal Setting"
                            description="Set yearly, quarterly, and daily goals to keep your career on track."
                            delay={0.1}
                            inView={featuresInView}
                        />
                        <FeatureCard
                            icon={<Clock className="h-10 w-10 text-primary"/>}
                            title="Daily Logging"
                            description="Log your daily activities, learnings, and reflections in seconds."
                            delay={0.2}
                            inView={featuresInView}
                        />
                        <FeatureCard
                            icon={<BarChart2 className="h-10 w-10 text-primary"/>}
                            title="Progress Tracking"
                            description="Visualize your progress and identify areas for improvement."
                            delay={0.3}
                            inView={featuresInView}
                        />
                        <FeatureCard
                            icon={<Sparkles className="h-10 w-10 text-primary"/>}
                            title="AI-Powered Insights"
                            description="Get personalized recommendations and suggestions based on your goals and progress."
                            delay={0.4}
                            inView={featuresInView}
                        />
                        <FeatureCard
                            icon={<Calendar className="h-10 w-10 text-primary"/>}
                            title="Smart Planning"
                            description="Let AI help you plan your day and week for maximum productivity."
                            delay={0.5}
                            inView={featuresInView}
                        />
                        <FeatureCard
                            icon={<CheckCircle className="h-10 w-10 text-primary"/>}
                            title="Automated Tracking"
                            description="Automatically track progress and celebrate your achievements."
                            delay={0.6}
                            inView={featuresInView}
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="py-24">
                <motion.div
                    className="container mx-auto px-4 max-w-5xl"
                    initial={{opacity: 0, y: 30}}
                    animate={ctaInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.6}}
                >
                    <div className="relative rounded-2xl overflow-hidden ai-glow">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 z-0"></div>
                        <div className="relative z-10 p-8 md:p-12 text-center">
                            <div
                                className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-medium text-sm">
                                Start Today
                            </div>
                            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready to
                                Accelerate Your Growth?</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
                                Join other developers who are taking control of their career progression.
                            </p>
                            <div className="flex justify-center">
                                <Link href="/signup">
                                    <Button size="lg"
                                            className="gap-2 h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                                        Start Tracking Today <ArrowRight className="h-4 w-4"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="mt-auto border-t border-border py-12 bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center">
                        <div className="flex items-center gap-2">
                            <Target className="h-6 w-6 text-primary"/>
                            <span className="text-xl font-bold">DevDay</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">© 2025 DevDay. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
