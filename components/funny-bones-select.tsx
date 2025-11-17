"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Gamepad2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function FunnyBonesSelect() {
  const router = useRouter()

  return (
    <div className="max-w-sm mx-auto bg-zinc-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <button onClick={() => router.push("/")} className="text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-lg">Funny Bones</h1>
        <div className="w-5" />
      </div>

      {/* Character Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 pt-3">
        <div className="relative mb-8">
          <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-zinc-700 shadow-2xl">
            <img
              src="/images/design-mode/funnybones(1).avif"
              alt="Funny Bones"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-800 px-4 py-1.5 rounded-full border border-zinc-700">
            <p className="text-sm text-gray-400">@skelecomedy</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-center">Funny Bones</h2>

        {/* Selection Buttons */}
        <div className="w-full space-y-4">
          <Button
            onClick={() => router.push("/chat/goju")}
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-6 h-6" />
            Start Chatting
          </Button>

          <Button
            onClick={() => router.push("/funny-bones/uno")}
            className="w-full h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-lg font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
          >
            <Gamepad2 className="w-6 h-6" />
            Play a Game
          </Button>
        </div>

        <div className="mt-8 flex items-center gap-2 text-gray-500 text-sm">
          <MessageCircle className="w-4 h-4" />
          <span>292.4k chats</span>
        </div>
      </div>
    </div>
  )
}
