"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay: number
  inView: boolean
}

export default function FeatureCard({ icon, title, description, delay, inView }: FeatureCardProps) {
  return (
    <motion.div
      className="relative rounded-xl border border-border/60 bg-card p-8 shadow-sm transition-all group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon with circle background */}
      <div className="relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      
      {/* Border gradient effect on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/80 to-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  )
}
