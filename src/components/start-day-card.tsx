"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Plus, X } from "lucide-react"
import { cn } from "@/src/utils/utils"

export type Goal = {
  id: string
  text: string
  completed: boolean
}

interface StartDayCardProps {
  onStartDay: (goals: Goal[]) => void
  userName: string
}

export default function StartDayCard({ onStartDay, userName }: StartDayCardProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState("")
  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([
        ...goals,
        {
          id: Date.now().toString(),
          text: newGoal.trim(),
          completed: false,
        },
      ])
      setNewGoal("")
    }
  }

  const handleRemoveGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddGoal()
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="overflow-hidden border-none bg-gradient-to-br from-background via-background to-muted/50 shadow-xl">
        <CardContent className="p-6 md:p-8">
          <div className="mb-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
            >
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </motion.div>
            <motion.h1
              className="mb-2 text-2xl font-bold md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Good morning, {userName}!
            </motion.h1>
            <motion.p
              className="text-sm text-muted-foreground max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Let's plan your day for maximum productivity and achievement
            </motion.p>
          </div>

          <motion.div
            className="mb-6 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-lg font-medium flex items-center gap-2">
              <span className="inline-block w-1 h-5 bg-primary rounded-full mr-1"></span>
              What are your goals for today?
            </h2>
            
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-background p-3 hover:border-border transition-all duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="w-1 h-1 rounded-full bg-primary/70 mx-1"></div>
                    <span className="flex-1 text-sm">{goal.text}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveGoal(goal.id)}
                      className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span className="sr-only">Remove goal</span>
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className={cn(
              "flex gap-2 p-1 rounded-lg transition-all",
              isInputFocused && "bg-muted/50"
            )}>
              <Input
                placeholder="Add a new goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="flex-1 border-muted-foreground/20 text-sm h-9"
              />
              <Button 
                onClick={handleAddGoal} 
                disabled={!newGoal.trim()} 
                variant="default"
                className="transition-all duration-300 h-9 text-xs"
                size="sm"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              size="default"
              onClick={() => onStartDay(goals)}
              className="px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all"
              disabled={goals.length === 0}
            >
              Start My Day
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
