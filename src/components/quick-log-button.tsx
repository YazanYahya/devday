"use client"

import {ClipboardEdit} from "lucide-react"
import {useState} from "react"
import {motion} from "framer-motion"
import ActivityLogDialog from "@/src/components/activity-log-dialog"

export default function QuickLogButton() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{scale: 0, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                }}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-background"
                >
                    <ClipboardEdit className="h-6 w-6 text-primary-foreground"/>
                    <span className="sr-only">Quick Log</span>
                </button>
            </motion.div>

            {/* Use the shared ActivityLogDialog component */}
            <ActivityLogDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Quick Activity Log"
            />
        </>
    )
}
