"use client"

import { MobileChat } from "@/components/mobile-chat"
import { GlobalHeader } from "@/components/global-header"
import { useRouter } from "next/navigation"

export default function ForbiddenCharmChatPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-[375px] h-[750px] overflow-hidden flex flex-col">
        <GlobalHeader />
        <MobileChat
          onBackClick={handleBackClick}
          characterImage="https://storage.googleapis.com/simula-public/assets/mockups/3.png"
          characterName="Forbidden Charm"
          initialMessage="They say some things are forbidden for a reason... but I think rules are made to be broken. Especially with someone like you."
          promptSuggestions={[
            { emoji: "✨", text: "What would you risk for me?" },
            { emoji: "✨", text: "Show me your darker side" },
          ]}
        />
      </div>
    </div>
  )
}
