"use client"

import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import UnoGame from "@/components/uno-game"

export function FunnyBonesUnoGame() {
  const router = useRouter()

  return (
    <div className="max-w-sm mx-auto bg-zinc-900 text-white min-h-screen flex flex-col">
      <div className="flex justify-end p-4 py-[7px] flex-shrink-0">
        <button
          onClick={() => router.push("/funny-bones/select")}
          className="bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 transition-colors px-[3px] py-[3px]"
          aria-label="Close"
        >
          <X className="text-white size-3" />
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <UnoGame />
      </div>
    </div>
  )
}
