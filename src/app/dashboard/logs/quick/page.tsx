"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { useToast } from "@/src/hooks/use-toast"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function QuickLogPage() {
  const [logText, setLogText] = useState("")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!logText.trim()) {
      toast({
        title: "Enter log details",
        description: "Please enter what you're working on",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to a database
    toast({
      title: "Activity logged!",
      description: "Your activity has been recorded successfully",
    })

    // Reset form
    setLogText("")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-6 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-2" variants={itemVariants}>
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">Quick Log</h1>
      </motion.div>

      <motion.div
        className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        variants={itemVariants}
      >
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">What are you working on?</h2>
        <div className="mt-4 space-y-4">
          <Textarea
            placeholder="Describe what you're working on..."
            value={logText}
            onChange={(e) => setLogText(e.target.value)}
            className="min-h-[120px] resize-none rounded-lg border-zinc-200 bg-zinc-50 p-4 text-base focus:border-primary focus:ring-primary dark:border-zinc-800 dark:bg-zinc-900"
          />
          <div className="flex justify-end gap-2">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full px-4">
                Cancel
              </Button>
            </Link>
            <Button onClick={handleSubmit} className="rounded-full px-4 flex items-center gap-2">
              <span>Log Activity</span>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div className="text-sm text-zinc-500 dark:text-zinc-400 text-center" variants={itemVariants}>
        Quick logs help you track what you're working on throughout the day
      </motion.div>
    </motion.div>
  )
}
