import { Button } from "@/src/components/ui/button"
import Link from "next/link"

export default function LogShortcuts() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Link href="/dashboard/logs/new">
        <Button variant="outline" className="w-full justify-start">
          Log Activity
        </Button>
      </Link>
      <Link href="/dashboard/logs/quick">
        <Button variant="outline" className="w-full justify-start">
          Quick Log
        </Button>
      </Link>
    </div>
  )
}
