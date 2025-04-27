"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

export default function AddLogButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/dashboard/logs/new">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-background">
          <Plus className="h-5 w-5 text-primary-foreground" />
          <span className="sr-only">Add Log</span>
        </button>
      </Link>
    </div>
  )
}
